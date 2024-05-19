import React, { useEffect, useState } from 'react'
import DataService from '../lib/DataService'
import { COLLABORATOR_PATH } from '../constant/urls'

function UseFetchCollaborator(collaboratorId) {
    const [collaborator, setCollaborator] = useState(null)

    useEffect(() => {
        DataService.get(COLLABORATOR_PATH.getProfile + collaboratorId)
        .then(res => {
            const { data } = res.data

            setCollaborator(data)
        })
    }, [])
    
    return collaborator;
}

export default UseFetchCollaborator
