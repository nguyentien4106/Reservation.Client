import React from 'react'
import LogoutLink from '../../LogoutLink'
import { getLocal } from '../../../lib/helper'

function UserComponent() {
    const user = getLocal("email")
    
    return (
        <div style={{ color: "white" }}>

        </div>
    )
}

export default UserComponent
