import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { hide, show } from '../state/loading/loadingSlice'
import axios from 'axios'
import { App } from 'antd'
import { Button, Result } from 'antd';

const BASE_URL = "https://localhost:7080/"

function ConfirmEmail() {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const dispatch = useDispatch()
    const [ succeed, setSucceed ] = useState(false)
    const navigate = useNavigate()
    const [ email, setEmail ] = useState("")

    useEffect(() => {

        const email = searchParams.get("email")
        const code = searchParams.get("code")


        dispatch(show())

        axios.get(`${BASE_URL}Auth/ConfirmEmail?email=${email}&code=${code}`)
            .then(res => {
                console.log(res.data)
                setSucceed(res.data.isSucceed)
                setEmail(res.data.data)
            }).finally(() => {
                dispatch(hide())
            })
    }, [])

    return (
        <>
            <Result
                status={succeed ? "success" : "warning"}
                title={succeed ? "Successfully!" : "There are some problems with your operation."}
                subTitle={succeed ? email : ""}
                extra={[
                    <Button type="primary" key="login" onClick={() => navigate("/login")}>
                        Login
                    </Button>,
                    <Button key="register" onClick={() => navigate("/register")}>
                        Register
                    </Button>,
                ]}
            />

        </>
    )
}

export default ConfirmEmail
