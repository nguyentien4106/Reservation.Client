import { Image, Spin, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { R2 } from "../../../lib/R2";
import { getUserName } from "../../../lib/helper";
import { ContainerInfoProfile } from "@/pages/home/collaborator/CollaboratorPage";
import dayjs from "dayjs";

function AvatarImage() {
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const collaborator = useContext(ContainerInfoProfile);

    useEffect(() => {
        if (!collaborator) {
            return;
        }

        const userName = getUserName(collaborator.email);
        R2.getAvatar(userName)
            .then((res) => {
                setAvatarUrl(res.url);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [collaborator]);
    const image = (
        <Image
            height={250}
            width={250}
            preview={false}
            src={avatarUrl}
            style={{
                borderRadius: "50%",
                marginTop: "20px",
            }}
        />
    );
    return (
        <>
            {loading ? (
                <Spin height={250} />
            ) : (
                <>
                    <div className="avatar-container">
                        <Avatar size={200} src={avatarUrl} />
                    </div>
                    <br/>
                    <strong>Ngày tham gia: </strong>
                    <strong>
                        {dayjs(collaborator?.joinedDate).format("DD-MM-YYYY")}
                    </strong>
                </>
            )}
        </>
    );
}

export default AvatarImage;
