import React, { useContext, useEffect, useState } from "react";
import AuthorizeView from "../../components/auth/AuthorizeView";
import DataService from "../../lib/DataService";
import { COLLABORATOR_PATH } from "../../constant/urls";
import { App } from "antd";
import { ROLES } from "../../constant/settings";
// import { ProfileContext } from "../../context/useProfileContext";
import LeaseAlbumComponent from "../../components/collaborator/setting/LeaseAlbumComponent";
import LeaseInfoComponent from "../../components/collaborator/setting/LeaseInfoComponent";
import { UserContext } from "../../context/useUserContext";

const SettingPage = () => {
    const { user } = useContext(UserContext);
    const [collaborator, setCollaborator] = useState({ id: "" });
    const { message } = App.useApp();
    const [initialValues, setInitialValues] = useState({});
    // const [collaboratorId, setCollaboratorId] = (user?.userName)
    const email = user?.userName

    useEffect(() => {
        if (email) {
            DataService.get(COLLABORATOR_PATH.getProfileByEmail + email).then(
                (res) => {
                    const { data } = res.data;
                    setCollaborator(data);
                    setInitialValues(data ?? { email: user.userName });
                }
            ).catch((err) => {
                console.log(err)
                if(err.response.status == 400){
                    message.error("Không tìm thấy hồ sơ theo đường dẫn này. Hãy thử lại !")
                }
            })
        }
    }, [email])

    return (
        <AuthorizeView role={ROLES.USER}>
            {/* <ProfileContext.Provider value={{ collaborator, allowUpdate: true }}> */}
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
                            user={user}
                            collaborator={collaborator}
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
            {/* </ProfileContext.Provider> */}
        </AuthorizeView>
    );
};

export default SettingPage;
