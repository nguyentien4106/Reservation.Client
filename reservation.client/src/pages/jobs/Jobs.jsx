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
                        width: "100%"
                    }}
                >
                   <Input.Search onChange={(e) => setSearch(e.target.value)} onSearch={() => console.log(seach)}></Input.Search>
                </div>
                {jobs.length ? (
                    jobs.map((item) => <h1>{item.title}</h1>)
                ) : (
                    <>
                    <h2>Không có post</h2>
                        <Job/>
                    </>
                    
                )}
            </Flex>
        </>
    );
}
