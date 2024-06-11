import dayjs from "dayjs";
import React from "react";

export default function Job() {
    return (
        <section className="job">
            <div className="job-header">
                <div className="job-header-title">
                    <small>
                        <span>Posted </span>
                        <span>{dayjs().format("HH:mm A DD-MM-YYYY")}</span>
                    </small>
                    <div>
                        <a>
                            <h2>KNX Programming Tutor</h2>
                        </a>
                    </div>
                </div>
            </div>
            <div className="job-content"></div>
        </section>
    );
}
