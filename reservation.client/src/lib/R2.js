import {
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
    GetObjectCommand,
    S3
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2BucketName
} from './R2Config.js'

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${cloudflareAccountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: cloudflareR2AccessKeyId,
        secretAccessKey: cloudflareR2SecretAccessKey,
    },
});

// console.log(
//     await S3.send(
//         new ListBucketsCommand('')
//     )
// );

console.log(

);


const upload = async (fileName, fileStream, type) => {
    const uploadParams = {
        Bucket: cloudflareR2BucketName,
        Key: fileName,
        Body: fileStream,
        ContentType: type,
    };

    const cmd = new PutObjectCommand(uploadParams);
    
    // const digest = md5(fileStream);

    cmd.middlewareStack.add((next) => async (args) => {
        args.request.headers["Access-Control-Allow-Origin"] = "*";
        return await next(args);
    }, {
        step: 'build',
        name: 'addETag'
    })

    const data = await s3Client.send(cmd);
    const url = await getSignedUrl(s3Client, cmd, { expiresIn : 3600 })
    console.log(url)
    return data
}

const get = async (user) => {
    const urls = s3Client.send(
                        new ListObjectsV2Command({ Bucket: cloudflareR2BucketName })
                    ).then(objects => {
                        console.log(objects)
                        return objects && objects.Contents.map(async content =>  await getSignedUrl(s3Client, new GetObjectCommand({Bucket: cloudflareR2BucketName, Key: content.Key}), { expiresIn: 3600 }))
                    })
    return urls
}



export const R2 = {
    upload: upload,
    get: get
}