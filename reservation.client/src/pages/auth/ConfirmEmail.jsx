import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { hide, show } from '@/state/loading/loadingSlice'
import { Button, Result } from 'antd';
import DataService from '@/lib/DataService'
import { AUTH_PATH } from '../../constant/urls';

function ConfirmEmail() {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const dispatch = useDispatch()
    const [ succeed, setSucceed ] = useState(false)
    const navigate = useNavigate()
    const [ email, setEmail ] = useState("")

    useEffect(() => {
        const email = searchParams.get("email")
        const code = decodeURIComponent(searchParams.get("token"))
        dispatch(show())

        DataService.post(AUTH_PATH.confirmEmail, {
            code: code,
            email: email
        })
            .then(res => {
                setSucceed(res.data.isSucceed)
                setEmail(res.data.data)
            })
            .catch(err => {
                console.log(err)
            }).finally(() => {
                dispatch(hide())
            })
    }, [])

    return (
        <>
            <Result
                status={succeed ? "success" : "warning"}
                title={succeed ? "Successfully!" : "There are some problems with your operation."}
                subTitle={succeed ? `${email} đã được xác nhận thành công !` : ""}
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
