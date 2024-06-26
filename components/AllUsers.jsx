'use client'
import { Card, List, ListItem } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch('/api/users');
            const userInfo = await response.json();
            setUsers(userInfo.data);
        }
        fetchAllUsers();
    }, [])
    // console.log(users)
    return (
        <div>
            {users &&
                users.map((user) => (
                    <Card key={user.id} className="mb-4">
                        <List>
                            <ListItem>ID: {user.id}</ListItem>
                            <ListItem>Age: {user.age}</ListItem>
                            <ListItem>Name: {user.name}</ListItem>
                            <ListItem>Email: {user.email}</ListItem>
                        </List>
                    </Card>
                ))}
        </div>
    )
}

export default AllUsers
