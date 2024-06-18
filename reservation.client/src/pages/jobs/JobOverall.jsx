import React, { useEffect, useState } from "react";
import DataService from "../../lib/DataService";
import { defaultPaging } from "../../constant/options";
import { getUser } from "../../lib/helper";
import { useSearchParams } from "react-router-dom";
import Job from "../../components/jobs/Job";
import { Table } from "antd";
import JobTable from "../../components/jobs/overall/JobTable";

export default function JobOverall() {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const paging = defaultPaging
        const query = new URLSearchParams(paging)
        console.log(getUser().id)
        DataService.get(`Jobs/Users/${getUser().id}?`+ query.toString()).then(res => {
            console.log(res.data.data)
            const { data } = res.data
            setJobs(data.data)
        })
    }, []);

    return (
        <>
            <JobTable data={jobs}>
            </JobTable>
        </>
    );
}
