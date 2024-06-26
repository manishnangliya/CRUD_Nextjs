'use client'
import { Button, Input } from '@material-tailwind/react'
import alertGradient from '@material-tailwind/react/theme/components/alert/alertGradient';
import React, { useState } from 'react'



const UpdateUser = () => {
    const [ID, setID] = useState();
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!ID) {
            alert("Please Enter ID");
            return;
        }
        let data = {};
        data['id'] = Number(ID);
        if (name) {
            data["name"] = name;
        }
        if (age) {
            data["age"] = age;
        }
        if (email) {
            data["email"] = email;
        }
        if (password) {
            data["password"] = password
        }

        try {
            const response = await fetch('/api/users', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                alert("User Updated")
                clearForm();
            } else {
                const res = await response.json();
                alert(res.message);
            }
        } catch (error) {
            // alert(error);
            console.log(error);
            return;
        }
    }
    const clearForm = () => {
        setID('')
        setName('')
        setAge('')
        setEmail('')
        setPassword('')
    }
    return (
        <div className='flex flex-col items-center gap-5' >
            <form onSubmit={handleUpdate} className='flex flex-col items-center  gap-2'>
                <Input className='w-72' label='ID (mandatory)' value={ID} type='number' placeholder='Enter ID' onChange={e => setID(e.target.value)} />
                <Input className='w-72' label='Name' type='text' value={name} placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                <Input className='w-72' label='Age' type='number' value={age} placeholder='Enter Age' onChange={e => setAge(e.target.value)} />
                <Input className='w-72' label='Email' type='email' value={email} placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                <Input className='w-72' label='Password' type='password' value={password} placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                <Button type='submit' >Update User</Button>
            </form>
            <div>
                {message && message}
            </div>
        </div>
    )
}

export default UpdateUser
