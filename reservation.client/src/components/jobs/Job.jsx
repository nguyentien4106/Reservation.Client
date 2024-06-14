import dayjs from "dayjs";
import React, { useState } from "react";
import { PAYMENT_TYPES } from "../../constant/settings";
import { getUser, showMoney } from "../../lib/helper";
import { Button, Divider, Typography, Modal  } from "antd";
import ModalJob from "./ModalJob";

export default function Job({ job }) {
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const handleApply = () => {
        setOpen(true)
    }


    return (

        <>
            <section className="job">
                <div className="job-header">
                    <div className="job-header-title">
                        <small>
                            <span>Posted </span>
                            <span>{dayjs(job.createdDate).format("HH:mm A DD-MM-YYYY")}</span>
                        </small>
                        <div>
                            <h2 className="title-name">{job.title}</h2>
                        </div>
                    </div>
                    <div className="job-action">
                        <Button
                            style={{
                                display: "flex",
                                width: "100%",
                                color: "#fff",
                                backgroundColor: "#108a00",
                                border: "2px solid transparent",
                                fontSize: 16,
                                fontWeight: 600,
                                padding: "10px 20px",
                                height: 50
                            }}
                            onClick={handleApply}
                        >Ứng tuyển ngay</Button>
                    </div>
                </div>

                <div className="job-content">
                    <ul className="payment_info">
                        <li className="info-item">
                            <strong>{PAYMENT_TYPES[job.paymentType] + ": " + showMoney(job.cast, true)}</strong>
                        </li>
                        <li className="info-item">
                            <strong>
                                {"Địa điểm: " + job.location}
                            </strong>
                        </li>
                        <li className="info-item">
                            <strong>
                                {"Ngày thực hiện: " + dayjs(job.dateTime).format("DD-MM-YYYY")}
                            </strong>
                        </li>
                    </ul>
                    <div>
                        <strong className="info-item job-description-header">Mô tả công việc: </strong>
                        <div className="job-description">
                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 2,
                                    expandable: 'collapsible',
                                    expanded,
                                    onExpand: (_, info) => setExpanded(info.expanded),
                                }}
                            >
                                {
                                    job.description
                                }
                            </Typography.Paragraph>
                        </div>
                        <br />
                        <strong className="info-item job-description-header">Yêu cầu: </strong>
                        <div className="job-description">
                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 2,
                                    expandable: 'collapsible',
                                    expanded,
                                    onExpand: (_, info) => setExpanded(info.expanded),
                                }}
                            >
                                {
                                    job.required
                                }
                            </Typography.Paragraph>
                        </div>
                    </div>

                    <div className="services-container">
                        {
                            job.jobServices.length ? 
                            job.jobServices.map(item => <span key={item.serviceName} className="service-item">{item.serviceName}</span>) 
                            : <span className="service-item">Không có dịch vụ cụ thể</span>
                        }
                    </div>
                </div>
            </section>
            <Divider />
            <ModalJob 
                job={job} 
                open={open}
                close={() => setOpen(false)}
            />
        </>
    );
}
