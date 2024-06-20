import { Button, Card, Flex, Grid, Input, Modal, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import DataService from "../../lib/DataService";
import { JOBS_PATH } from "../../constant/urls";
import Job from "../../components/jobs/Job";
import { useDispatch } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { Pagination } from 'antd';
import { defaultPaging } from "../../constant/options";
import PostJob from "./PostJob"
import { getUser } from "../../lib/helper";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [seach, setSearch] = useState("")
    const [paging, setPaging] = useState(defaultPaging)
    const [total, setTotal] = useState(0)
    const [appliedJobs, setAppliedJobs] = useState([])
    const [open, setOpen] = useState(false)

    const user = getUser()

    const dispatch = useDispatch()

    useEffect(() => {
        const searchParams = new URLSearchParams(paging);
        const getDataAsync = async () => {
            dispatch(show())
            const getJobs = DataService.get(JOBS_PATH.getAll + `?${searchParams.toString()}`).then(res => res.data.data)
            const getAppliedJobs = DataService.get(JOBS_PATH.userApplies + user.id + "?" + searchParams.toString()).then(res => res.data.data)
            return await Promise.all([getJobs, getAppliedJobs])
        }

        getDataAsync().then(res => {
            setJobs(res[0].data)
            setTotal(res[0].total)
            setAppliedJobs(res[1].data.map(item => item.jobId))

        }).finally(() => {
            dispatch(hide())
        })
    }, [paging]);

    const quickPostJob = () => {
        setOpen(true)
    }

    const submitRef = useRef()

    return (
        <>
            <Flex
                style={{
                    paddingLeft: "10%",
                    paddingRight: "10%",
                }}
                vertical
            >
                <Flex
                    style={{
                        marginBottom: "50px",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                    justify="space-between"
                >
                    <Input.Search
                        style={{
                            width: "50%"
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                        onSearch={() => console.log(seach)}
                        placeholder="Tìm kiếm từ khoá"
                    />
                    <Space align="center" onClick={quickPostJob}>
                        <strong>Tạo Job</strong>
                        <img width="40" height="40" src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1" />
                    </Space>
                </Flex>
                {
                    jobs.length ? (
                        jobs.map((item) => <Job 
                                                key={item.id} 
                                                job={item} 
                                                applied={appliedJobs.includes(item.id)} 
                                                setAppliedJobs={setAppliedJobs}
                                                >{item.title}</Job>
                                            )
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
            {
                open && <Modal
                    width={"70%"}
                    open={true}
                    onCancel={() => setOpen(false)}
                    okText={"Đăng job"}
                    onOk={() => {
                        submitRef.current.click()
                        setOpen(false)
                    }}
                >
                    <PostJob inModal={true} submitRef={submitRef} />
                </Modal>
            }
        </>
    );
}
