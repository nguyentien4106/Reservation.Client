import React from 'react'
import PersonalInfo from './PersonalInfo'
import IntroductionInfo from './IntroductionInfo'
import { Divider } from 'antd'

function MainInfo() {
    return (
        <>
            <PersonalInfo />
            <Divider />
            <IntroductionInfo />
        </>
    )
}

export default MainInfo
