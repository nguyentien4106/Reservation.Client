import { Button, Card, Flex, Grid, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import DataService from "../../lib/DataService";
import { JOBS_PATH } from "../../constant/urls";
import Job from "../../components/jobs/Job";
export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [seach, setSearch] = useState("")

    useEffect(() => {
        DataService.get(JOBS_PATH.getAll).then((res) => {
            console.log(res.data)
            setJobs(res.data.data);
        });
    }, []);

    return (
        <>
            <Flex
                style={{
                    paddingLeft: "10%",
                    paddingRight: "10%",
                }}
                vertical
            >
                <div
                    style={{
                        width: "60%",
                        marginBottom: "50px",
                        alignItems: "center",
                    }}
                >
                   <Input.Search 
                        onChange={(e) => setSearch(e.target.value)} 
                        onSearch={() => console.log(seach)}
                        placeholder="Tìm kiếm từ khoá"
                    >
                        
                   </Input.Search>
                </div>
                {jobs.length ? (
                    jobs.map((item) => <Job key={item.createdDate} job={item}>{item.title}</Job>)
                ) : (
                    <h2>Không có post</h2>
                )}
            </Flex>
        </>
    );
}
