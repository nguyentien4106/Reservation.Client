import React, { createContext } from 'react'
import { useParams } from 'react-router-dom'
import UseFetchCollaborator from '@/hooks/useFetchCollaborator'
import AvatarImage from '../../../components/home/collaborator/AvatarImage'
import './index.css'
import MainInfo from '../../../components/home/collaborator/mainInfo/MainInfo'
import BookingInfo from '../../../components/home/collaborator/BookingInfo'

export const ContainerInfoProfile = createContext({ })

function CollaboratorPage() {
    const { id } = useParams()
    const collaborator = UseFetchCollaborator(id)

    return (
        <ContainerInfoProfile.Provider value={collaborator}>
            <div className='collaborator-infor__container'>
                <AvatarImage style={{ flex: 1, marginTop: "20px" }} />
                <div style={{ flex: 3 }}>
                    <MainInfo />
                </div>
                <div style={{ flex: 1 }}>
                    <BookingInfo />
                </div>
            </div>
        </ContainerInfoProfile.Provider >

    )
}

export default CollaboratorPage
