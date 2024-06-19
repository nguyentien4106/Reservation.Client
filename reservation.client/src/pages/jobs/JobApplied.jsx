import React, { useEffect, useState } from 'react'
import DataService from '../../lib/DataService'
import { defaultPaging } from '../../constant/options'
import { getUser } from '../../lib/helper'
import JobAppliedTable from '../../components/jobs/applies/JobAppliedTable'

export default function JobApplied() {
    const [data, setData] = useState([])
    useEffect(() => {
        const query = new URLSearchParams(defaultPaging)
        DataService.get("Jobs/UsersApplies/" + getUser().id + "?" + query.toString()).then(res => {
            setData(res.data.data.data)
        })
    }, [])
    return (
        <div>
            <h1>Job Applied</h1>
            <JobAppliedTable data={data}>

            </JobAppliedTable>
        </div>
    )
}
