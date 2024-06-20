import React, { useEffect, useState } from "react";
import DataService from "../../../lib/DataService";
import { defaultPaging } from "../../../constant/options";
import { getUser } from "../../../lib/helper";
import JobTable from "../../../components/jobs/overall/JobTable";
import "./index.css"
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { JOBS_ROUTE_PATH } from "../../../constant/paths";

export default function JobOverall() {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const paging = defaultPaging
        const query = new URLSearchParams(paging)
        DataService.get(`Jobs/Users/${getUser().id}?`+ query.toString()).then(res => {
            const { data } = res.data
            setJobs(data.data)
        })
    }, []);

    return (
        <>
            <Flex justify='space-between'>
                <h2>Job đã đăng</h2>
                
                <Link to={JOBS_ROUTE_PATH.post}><h2>Tạo Job</h2></Link>
            </Flex>
            <JobTable data={jobs}>
            </JobTable>
        </>
    );
}
