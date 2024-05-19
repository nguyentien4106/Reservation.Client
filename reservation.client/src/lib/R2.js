import {
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
    GetObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    S3,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2BucketName,
} from "./R2Config.js";

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${cloudflareAccountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: cloudflareR2AccessKeyId,
        secretAccessKey: cloudflareR2SecretAccessKey,
    },
});

const SevenDays = 60 * 60 * 24 * 7;

const getUrl = async (content) =>
    await getSignedUrl(
        s3Client,
        new GetObjectCommand({
            Bucket: cloudflareR2BucketName,
            Key: content.Key,
        }),
        { expiresIn: SevenDays }
    );

const upload = async (fileName, fileStream, type) => {
    const uploadParams = {
        Bucket: cloudflareR2BucketName,
        Key: fileName,
        Body: fileStream,
        ContentType: type,
    };

    const cmd = new PutObjectCommand(uploadParams);

    return await s3Client.send(cmd);
};

const get = async (username) => {
    const prefix = `${username}/albums`
    return []
    const objects = await s3Client.send(
                                        new ListObjectsV2Command({
                                            Bucket: cloudflareR2BucketName,
                                            Prefix: prefix
                                        })
                                    )
        

    const images = objects.Contents && objects.Contents.map(async (content) => ({
        url: await getUrl(content),
        content: content,
    }))

    return Promise.all(images ?? [])
};

const getAvatar = async (username) => {
    return []
    const prefix = `${username}/avatar`


    const objects = await s3Client.send(
        new ListObjectsV2Command({
            Bucket: cloudflareR2BucketName,
            Prefix: prefix,
            MaxKeys: 1
        })
    )

    const urls = objects.Contents && objects.Contents.map(async (content) => ({
        url: await getUrl(content),
        content: content,
    }))

    return urls && urls.length && urls[0];
};

const deleteObject = async (object) => {
    const command = new DeleteObjectCommand({
        Bucket: cloudflareR2BucketName,
        Key: object,
    });

    try {
        const response = await s3Client.send(command);
        return response
    } catch (err) {

        throw err.message
    }
};

export const R2 = {
    upload: upload,
    get: get,
    delete: deleteObject,
    getAvatar: getAvatar
};
