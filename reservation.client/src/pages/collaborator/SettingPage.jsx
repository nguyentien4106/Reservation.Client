import React, { useEffect, useState } from "react";
import AuthorizeView from "../../components/auth/AuthorizeView";
import { generateMessages, getUser } from "../../lib/helper";
import DataService from "../../lib/DataService";
import { COLLABORATOR_PATH } from "../../constant/urls";
import { App } from "antd";
import { ROLES } from "../../constant/settings";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../context/useProfileContext";
import LeaseAlbumComponent from "../../components/collaborator/setting/LeaseAlbumComponent";
import LeaseInfoComponent from "../../components/collaborator/setting/LeaseInfoComponent";

const SettingPage = () => {
    const { id } = useParams();
    const user = getUser();
    const [collaborator, setCollaborator] = useState({ id: "" });
    const [hasAvatar, setHasAvatar] = useState(false)
    const { message } = App.useApp();
    const [initialValues, setInitialValues] = useState({});
    const collaboratorId = id ? id : user?.collaboratorId

    useEffect(() => {
        if (collaboratorId) {
            DataService.get(COLLABORATOR_PATH.getProfile + collaboratorId).then(
                (res) => {
                    const { data } = res.data;
                    setCollaborator(data);
                    setInitialValues(data ?? {email: user.userName});
                }
            );
        }
    }, [collaboratorId])

    return (
        <AuthorizeView role={ROLES.USER}>
            <ProfileContext.Provider value={{ collaborator, allowUpdate: !id }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: 20,
                    }}
                    className="collaborator-setting"
                >
                    <div
                        style={{
                            flex: 3,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 30,
                        }}
                    >
                        <h2
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Hồ sơ
                        </h2>
                        <LeaseInfoComponent
                            // onFinish={onFinish}
                            user={user}
                            collaboratorId={collaboratorId}
                            initialValues={initialValues}
                        />
                    </div>
                    <div
                        style={{
                            flex: 2,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 30,
                        }}
                    >
                        <h2
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Albums
                        </h2>
                        <div
                            style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                            }}
                        >
                            <LeaseAlbumComponent
                                max={1000}
                                buttonTitle={"Cập nhật Albums"}
                            />
                        </div>
                    </div>
                </div>
            </ProfileContext.Provider>
        </AuthorizeView>
    );
};

export default SettingPage;
