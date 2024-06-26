'use client'
import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react'

const DeleteUser = () => {
    const [ID, setID] = useState();
    const [message,setMessage]= useState("");
    const deleteUser = async(e) => {
        if(!ID){
            alert("Please enter an ID");
            return;
        }
        e.preventDefault();
        try {
            const response = await fetch(`api/users/${ID}`,{
                method:"DELETE",
            });
            if(response.ok){
                alert("User Deleted");
            }
            else{

                const res = await response.json();
                setMessage(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    
    }
    return (
        <div className='flex flex-col items-center gap-5' >
            <form onSubmit={deleteUser} className='flex flex-col items-center  gap-2'>
                <Input className='w-72' label='ID (mandatory)' value={ID} type='number' placeholder='Enter ID' onChange={e => setID(e.target.value)} />
                <Button type='submit'>Delete User</Button>
            </form>
            <div>
                {message && message}
            </div>
        </div>
    )
}

export default DeleteUser
