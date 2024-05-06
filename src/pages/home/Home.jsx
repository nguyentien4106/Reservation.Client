import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'
import { Col, Divider, Row } from 'antd';
const style = {
  background: '#0092ff',
  padding: '8px 0',
};

export default function Home() {

    const [ users, setUsers ] = useState([])

    useEffect(() => {
        setUsers([
            {
                title: 'UserCard 1',
            },
            {
                title: 'UserCard 2',
            },
            {
                title: 'UserCard 3',
            },
            {
                title: 'UserCard 4',
            },
            {
                title: 'UserCard 4',
            },
            {
                title: 'UserCard 4',
            },
            {
                title: 'UserCard 4',
            }
        ])
    }, [])
    

    return (
        <div>
            <Divider orientation="left">Responsive</Divider>
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
                justify="space-around"
            >
                {
                    users ? users.map((user, index) => <UserCard user={user} key={index} />) : <div>Loading</div>
                }
            </Row>
        </div>
    )
}
