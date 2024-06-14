import { Button, Card, Flex, Grid, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import DataService from "../../lib/DataService";
import { JOBS_PATH } from "../../constant/urls";
import Job from "../../components/jobs/Job";
import { useDispatch } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { Pagination } from 'antd';
import { defaultPaging } from "../../constant/options";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [seach, setSearch] = useState("")
    const [paging, setPaging] = useState(defaultPaging)
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(show())
        const searchParams = new URLSearchParams(paging);

        DataService.get(JOBS_PATH.getAll + `?${searchParams.toString()}`).then((res) => {
            const { data } = res.data
            console.log(data)
            setJobs(data.jobs);
            setTotal(data.total)
        })
        .catch(err => {
            alert(err)
        })
        .finally(() => {
            dispatch(hide())
        });
    }, [paging]);

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
                    jobs.map((item) => <Job key={item.id} job={item}>{item.title}</Job>)
                ) : (
                    <h2>Hiện tại chưa có jobs nào đang mở. Xin quay lại sau</h2>
                )}
                <Pagination 
                    defaultCurrent={1} 
                    total={total} 
                    responsive 
                    onChange={(index, pageSize) => setPaging({ pageIndex: index - 1, pageSize })}
                    defaultPageSize={20}
                    pageSize={paging.pageSize}
                />

            </Flex>
        </>
    );
}
