import { Button, Card, Input, List, ListItem } from '@material-tailwind/react'
import React, { useState } from 'react'

const SpecificUser = () => {
    const [userId, setUserId] = useState();
    const [userData, setUserData] = useState();
    const fetchUserData = async () => {
        const response = await fetch(`/api/users/${userId}`);
        console.log(response.ok);
        if (response.ok) {
            const res = await response.json();
            setUserData(res.userData)
        } else {
            console.log("Error in fetching user data")
            setUserData(null);
        }
    }
    return (
        <div className=''>
            <div className='flex mx-4 justify-center gap-4'>
                <div className='w-72'>
                    <Input label='Enter UserId' placeholder='Enter UserId' onChange={(e) => setUserId(e.target.value)} />
                </div>
                <Button onClick={fetchUserData} >Fetch User</Button>
            </div>


            {userData ?
                userData.map((user) => (
                    <Card key={user.id} className="mb-4">
                        <List>
                            <ListItem>ID: {user.id}</ListItem>
                            <ListItem>Name: {user.name}</ListItem>
                            <ListItem>Age: {user.age}</ListItem>
                            <ListItem>Email: {user.email}</ListItem>
                        </List>
                    </Card>
                )) : <div className='  text-center my-2'>
                    Enter a Valid user ID to search.
                </div>
            }
        </div>


    )
}

export default SpecificUser
