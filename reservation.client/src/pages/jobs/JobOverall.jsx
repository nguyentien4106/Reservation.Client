import React, { useEffect, useState } from "react";
import DataService from "../../lib/DataService";
import { defaultPaging } from "../../constant/options";
import { getUser } from "../../lib/helper";
import JobTable from "../../components/jobs/overall/JobTable";

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
            <JobTable data={jobs}>
            </JobTable>
        </>
    );
}
