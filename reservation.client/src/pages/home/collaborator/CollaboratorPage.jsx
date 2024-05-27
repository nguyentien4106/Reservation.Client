import React, { createContext } from 'react'
import { useParams } from 'react-router-dom'
import UseFetchCollaborator from '@/hooks/useFetchCollaborator'
import AvatarImage from '../../../components/home/collaborator/AvatarImage'
import './index.css'
import MainInfo from '../../../components/home/collaborator/mainInfo/MainInfo'
import BookingInfo from '../../../components/home/collaborator/booking/BookingInfo'

export const ContainerInfoProfile = createContext({ })

function CollaboratorPage() {
    const { id } = useParams()
    const collaborator = UseFetchCollaborator(id)
    return (
        <ContainerInfoProfile.Provider value={collaborator}>
            <div className='collaborator-infor__container'>
                <div className='avatar'>
                    <AvatarImage style={{ flex: 1, marginTop: "50px" }} />
                </div>
                <div style={{ flex: 3 }} className='personal-info'>
                    <MainInfo />
                </div>
                <div style={{ flex: 1 }} className='booking-info'>
                    <BookingInfo />
                </div>
            </div>
        </ContainerInfoProfile.Provider >

    )
}

export default CollaboratorPage
