import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Job from '../Job';
import DataService from '../../../lib/DataService';
import { JOBS_ROUTE_PATH } from '../../../constant/paths';

export default function JobDetails() {
    let { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState({})
    const location = useLocation()
    const { applied } = location.state || false
    useEffect(() => {
        DataService.get("Jobs/" + jobId).then(res => {
            setJob(res.data.data)
        })
    }, [])

    return (
        <div>
            <div onClick={ () => navigate(JOBS_ROUTE_PATH.jobs)} className="pointer">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/circled-left-2.png" alt="circled-left-2"/>
            </div>
            <div style={{ paddingLeft: "10%", paddingRight: "10%"}}>
                <Job job={job} applied={applied}/>
            </div> 
        </div>
    )
}
