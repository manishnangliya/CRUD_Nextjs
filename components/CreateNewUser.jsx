"use client"
import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react'

const CreateNewUser = () => {
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");

    const handleCreateFunction = async (e) => {
        e.preventDefault();
        if (!name || !age || !email || !password) {
            alert("Please enter all the details");
            return;
        }
        try {
            const response = await fetch('/api/users/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    age,
                    email,
                    password
                })
            })
            if (response.ok) {
                const res = await response.json();
                setMessage(res.message);
            }
            else {
                const res = await response.json();
                setMessage(res.message);
            }
        } catch (error) {
            alert(error);
            return;
        }

    }
    return (
        <div className='flex flex-col items-center gap-5' >
            <form onSubmit={handleCreateFunction} className='flex flex-col items-center  gap-2'>
                <Input className='w-72' label='Name' type='text' placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                <Input className='w-72' label='Age' type='number' placeholder='Enter Age' onChange={e => setAge(e.target.value)} />
                <Input className='w-72' label='Email' type='email' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                <Input className='w-72' label='Password' type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                <Button type='submit' >Create User</Button>
            </form>
            <div>
                {message && message}
            </div>
        </div>
    )
}

export default CreateNewUser
