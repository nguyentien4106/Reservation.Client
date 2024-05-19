import React, { createContext, lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UseFetchCollaborator from '../../hooks/useFetchCollaborator'
import AvatarImage from './infor/AvatarImage'
import MainInfo from './infor/MainInfo'
import './infor/index.css'

export const CollaboratorInforProfile = createContext({ })

function CollaboratorInfor() {
    const { id } = useParams()
    const collaborator = UseFetchCollaborator(id)

    return (
        <CollaboratorInforProfile.Provider value={collaborator}>
            <div className='collaborator-infor__container'>
                <AvatarImage style={{ flex: 1 }} />
                <div style={{ flex: 3 }}>
                    <MainInfo />
                </div>
                <div  style={{ flex: 1 }}>
                    <h1>Right Panel</h1>
                </div>
            </div>
        </CollaboratorInforProfile.Provider >

    )
}

export default CollaboratorInfor
