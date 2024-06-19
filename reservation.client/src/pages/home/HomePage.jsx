import React from "react";
import "./homepage.css";
import { Divider, Flex, Space } from "antd";
import { Link } from "react-router-dom";
import {
    ACCOUNT_ROUTE_PATH,
    COLLABORATORS_ROUTE_PATH,
    JOBS_ROUTE_PATH,
} from "../../constant/paths";
import image_1 from "@/assets/image_1.jpg";
import trusted from "@/assets/trusted.jpg";
import privacy from "@/assets/privacy.png";
import hire from "@/assets/hire.png";
import talent from "@/assets/talent.jpg";
import job from "@/assets/job.jpg";

export default function HomePage() {
    return (
        <div className="container">
            <Flex className="banner">
                <div className="col-xl-7">
                    <div className="dichvu_banner_text_left dichvu_banner_text">
                        <h3 className="banner-text-h3 logo">ThueNguoiYeu.me</h3>
                        <h4 className="banner-text-h4">
                            Một nền tảng được tạo ra để tạo thêm sự kết nối cho
                            mọi người cô đơn.
                        </h4>
                        <p className="short-desc">
                            Giúp bạn tìm được một nửa kia một cách nhanh nhất,
                            một người bạn tâm giao...
                        </p>
                        <Space
                            className="banner-direction"
                            direction="vertical"
                            align="center"
                            style={{
                                width: "100%",
                                marginTop: 20,
                            }}
                        >
                            <Link to={COLLABORATORS_ROUTE_PATH.collaborators}>
                                <p
                                    className="button-primary"
                                    title="Tới trang danh sách người cho thuê"
                                >
                                    Tìm "Talents"
                                </p>
                            </Link>
                            <Link to={JOBS_ROUTE_PATH.jobs}>
                                <p
                                    className="button-primary"
                                    title="Tới trang danh sách người cho thuê"
                                >
                                    Tìm "Jobs"
                                </p>
                            </Link>
                        </Space>
                    </div>
                </div>
                <div className="image-banner">
                    <img
                        src={image_1}
                        width={"100%"}
                        style={{ borderRadius: 20 }}
                    />
                </div>
            </Flex>

            <Divider></Divider>
            <h2 className="why">Cách sử dụng?</h2>

            <Flex vertical>
                <div>
                    <Divider></Divider>
                    <Flex className="why-card">
                        <div className="why-card-text">
                            <h3 className="banner-text-h3 logo">Bạn là người có nhu cầu cho thuê ?</h3>
                            <p className="short-desc">
                                Chúng tôi quy ước mỗi một hồ sơ là một Talent. Talent sẽ được đăng hồ sơ của mình và chờ người khác thuê. <br />
                                Bạn có thể tạo hồ sơ Talent <u><i><b><Link to={ACCOUNT_ROUTE_PATH.collaboratorSetting}>
                                    tại đây
                                </Link></b></i></u>
                                <br></br>
                                <b><i>Chúng tôi sẽ không public thông tin của bạn cho tới khi bạn đồng ý "yêu cầu cho thuê" của một ai đó.</i></b>
                            </p>
                        </div>
                        <img
                            src={talent}
                            className="card-image"
                            style={{ borderRadius: 20 }}
                        />
                    </Flex>
                </div>
                <div>
                    <Divider></Divider>
                    <Flex className="why-card">
                        <div className="why-card-text">
                            <h3 className="banner-text-h3 logo">Bạn đang cần tìm một người phù hợp với yêu cầu của bạn?</h3>
                            <p className="short-desc">
                                Chúng tôi gọi nó là Job. Bạn có thể post bất cứ job nào để mọi người có thể thấy job của bạn và apply vào chúng<br />
                                Bạn có thể tạo một Job <u><i><b><Link to={JOBS_ROUTE_PATH.post}>
                                    tại đây
                                </Link></b></i></u>
                            </p>
                        </div>
                        <img
                            src={job}
                            className="card-image"
                            style={{ borderRadius: 20 }}
                        />
                    </Flex>
                </div>
            </Flex>

            <Divider></Divider>
            <h2 className="why">Tại sao ThueNguoiYeu.me?</h2>

            <Flex className="why-cards">
                <div>
                    <Divider></Divider>
                    <Flex className="why-card">
                        <div className="why-card-text">
                            <h3 className="banner-text-h3 logo">Đa dạng</h3>
                            <p className="short-desc">
                                Bạn có thể tạo hồ sơ và hiển thị lên trang chủ
                                để người khác tìm thấy bạn. <br />
                                Bạn cũng có thể đăng 1 bài viết cần tuyển người
                                để cho người khác ứng tuyển vào việc bạn đang
                                tìm.
                            </p>
                        </div>
                        <img
                            src={hire}
                            className="card-image"
                            style={{ borderRadius: 20 }}
                        />
                    </Flex>
                </div>
                <div>
                    <Divider></Divider>
                    <Flex className="why-card why-card-2">
                        <img
                            src={privacy}
                            className="card-image"
                            style={{ borderRadius: 20 }}
                        />
                        <div className="why-card-text">
                            <h3 className="banner-text-h3 logo">
                                Bảo mật & Riêng tư
                            </h3>
                            <p className="short-desc">
                                Người cho thuê sẽ không bị public bất kỳ thông
                                tin nào cho tới khi nhận được lời mời cho thuê.
                                Người cho thuê có thể chấp nhận hoặc từ chối một
                                lời đề nghị thuê. Không ai có thể biết danh tính
                                cho tới khi 2 người đồng ý lời đề nghị thuê
                            </p>
                        </div>
                    </Flex>
                </div>
                <div>
                    <Divider></Divider>
                    <Flex className="why-card">
                        <div className="why-card-text">
                            <h3 className="banner-text-h3 logo">
                                Minh bạch & Độ tin cậy cao
                            </h3>
                            <p className="short-desc">
                                Bạn có thể review hoặc xem review từ người khác
                                của một người cho thuê. Việc review hoàn toàn
                                công tâm và hệ thống sẽ chỉ đề xuất cho bạn
                                những người có số lượng review tốt nhất trước.
                            </p>
                        </div>
                        <img
                            src={trusted}
                            className="card-image"
                            style={{ borderRadius: 20 }}
                        />
                    </Flex>
                </div>
            </Flex>
        </div>
    );
}
