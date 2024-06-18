import dayjs from "dayjs";
import React, { useState } from "react";
import { PAYMENT_TYPES } from "../../constant/settings";
import { getUser, getUserName, showMoney } from "../../lib/helper";
import { Button, Divider, Typography, Modal, Space } from "antd";
import ModalJob from "./ModalJob";

const isMobile = window.innerWidth < 768;
const InfoItem = ({ img, text }) => (
    <Space direction={isMobile ? "vertical" : "horizontal"}>
        {img}
        {text}
    </Space>
);

export default function Job({
    job,
    applied,
    setAppliedJobs,
    renderApplyButton = true,
}) {
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const handleApply = () => {
        setOpen(true);
    };

    return (
        <>
            <section className="job">
                <div className="job-header">
                    <div className="job-header-title">
                        <small>
                            <span>Posted at </span>
                            <span>
                                {dayjs(job.createdDate).format(
                                    "HH:mm DD-MM-YYYY"
                                )}
                            </span>
                        </small>
                        <small>
                            <span> by </span>

                            <span>
                                <b>{getUserName(job.userName)} </b>
                            </span>
                        </small>
                        <div>
                            <h2 className="title-name">{job.title}</h2>
                        </div>
                    </div>
                    {renderApplyButton && (
                        <div className="job-action">
                            <Button onClick={handleApply} disabled={applied}>
                                <Space>
                                    <img
                                        width="24"
                                        height="24"
                                        src="https://img.icons8.com/windows/32/reviewer-male--v1.png"
                                        alt="reviewer-male--v1"
                                    />
                                    <span>{applied ? "Đã " : ""}Ứng tuyển</span>
                                </Space>
                            </Button>
                        </div>
                    )}
                </div>

                <div className="job-content">
                    <ul className="payment_info">
                        <li className="info-item">
                            <Space direction="horizontal">
                                <img
                                    width="16"
                                    height="16"
                                    src="https://img.icons8.com/ios-glyphs/30/money--v1.png"
                                    alt="money--v1"
                                />
                                <strong>
                                    {PAYMENT_TYPES[job.paymentType] +
                                        " " +
                                        showMoney(job.cast, true)}
                                </strong>
                            </Space>
                        </li>

                        <li className="info-item">
                            <Space direction="horizontal">
                                <img
                                    width="16"
                                    height="16"
                                    src="https://img.icons8.com/ios/50/marker--v1.png"
                                    alt="marker--v1"
                                />
                                <strong>{job.location}</strong>
                            </Space>
                        </li>
                        <li className="info-item">
                            <Space direction="horizontal">
                                <img
                                    width="16"
                                    height="16"
                                    src="https://img.icons8.com/ios/50/calendar--v1.png"
                                    alt="calendar--v1"
                                />
                                <strong>
                                    {dayjs(job.dateTime).format("DD-MM-YYYY")}
                                </strong>
                            </Space>
                        </li>
                    </ul>
                    <div>
                        <strong className="info-item job-description-header">
                            Mô tả công việc:
                        </strong>
                        <div className="job-description">
                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 2,
                                    expandable: "collapsible",
                                    expanded,
                                    onExpand: (_, info) =>
                                        setExpanded(info.expanded),
                                }}
                            >
                                {job.description}
                            </Typography.Paragraph>
                        </div>
                        <br />
                        <strong className="info-item job-description-header">
                            Yêu cầu:
                        </strong>
                        <div className="job-description">
                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 2,
                                    expandable: "collapsible",
                                    expanded,
                                    onExpand: (_, info) =>
                                        setExpanded(info.expanded),
                                }}
                            >
                                {job.required}
                            </Typography.Paragraph>
                        </div>
                    </div>

                    <div className="services-container">
                        {job.jobServices.length ? (
                            job.jobServices.map((item) => (
                                <span
                                    key={item.serviceName}
                                    className="service-item"
                                >
                                    {item.serviceName}
                                </span>
                            ))
                        ) : (
                            <span className="service-item">
                                Không có dịch vụ cụ thể
                            </span>
                        )}
                    </div>
                </div>
            </section>
            <Divider />
            {open && (
                <ModalJob
                    job={job}
                    setOpen={setOpen}
                    close={() => setOpen(false)}
                    setAppliedJobs={setAppliedJobs}
                />
            )}
        </>
    );
}
