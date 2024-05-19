import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { hide, show } from '@/state/loading/loadingSlice'
import { Button, Result } from 'antd';
import DataService from '@/lib/DataService'

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

        DataService.get(`Auth/ConfirmEmail?email=${email}&code=${code}`)
            .then(res => {
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
