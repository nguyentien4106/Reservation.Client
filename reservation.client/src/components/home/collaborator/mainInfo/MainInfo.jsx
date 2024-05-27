import React from 'react'
import PersonalInfo from './PersonalInfo'
import IntroductionInfo from './IntroductionInfo'
import ReviewInfo from './ReviewsInfo'
import { Divider } from 'antd'

function MainInfo() {
    return (
        <>
            <PersonalInfo />
            <Divider />
            <IntroductionInfo />
            <Divider />
            <ReviewInfo />
        </>
    )
}

export default MainInfo
