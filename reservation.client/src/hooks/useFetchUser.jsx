import React, { useEffect, useState } from 'react'
import { Cookie } from '../lib/cookies'
import { jwtDecode } from 'jwt-decode'

export default function useFetchUser() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const accessToken = Cookie.getAccessToken()

        if(accessToken){
            setUser(jwtDecode(accessToken))
        }
        
    }, [])

    
    return user
}
