import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Job from '../Job';
import DataService from '../../../lib/DataService';

export default function JobDetails({ job }) {
    let { jobId } = useParams();

    useEffect(() => {
        DataService.get("Jobs/" + jobId).then(res => {
            console.log(res.data)
        })
    }, [])

    return (
        <div>
            {/* <Job job={job} /> */}
        </div>
    )
}
