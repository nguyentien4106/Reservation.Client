import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataService from '../lib/DataService'
import { SERVICE_PATH } from '../constant/urls'

export default function useFetchServices() {
    const [services, setServices] = useState([])
    
    useEffect(() => {
        const fetchServices = async () => {
            const response = await DataService.get(SERVICE_PATH.getAll)
            const { data } = response.data
            setServices(data.map(item => ({
                label: item.name,
                value: item.id
            })))
        }

        fetchServices()
    }, [])

    return services;
}
