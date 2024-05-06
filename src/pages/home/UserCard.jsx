import React, { useState, useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Image, Skeleton } from 'antd';
import image from '../../assets/image.jpg';

const { Meta, Grid } = Card;

const UserCard = ({ user }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setTimeout(() => {
            setLoading(!loading);
        }, 1000)
    }, [])

    return (
        <>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                hoverable
                bordered={false}
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                        title={user.title}
                        description={user.description}
                    />
                </Skeleton>
                <Skeleton loading={loading} avatar active>
                    {/* <Image src={image}></Image> */}
                    <Image.PreviewGroup
                        items={[ {src: image}, {src: image}, {src: image}]}
                    >
                        {
                            [image, image, image].map(item => <Image src={item} />)
                        }
                    </Image.PreviewGroup>
                </Skeleton>
            </Card>
        </>
    );
};
export default UserCard;