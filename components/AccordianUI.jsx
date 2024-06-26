'use client'
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import React, { useState } from 'react'
import AllUsers from './AllUsers';
import SpecificUser from './SpecificUser';
import CreateNewUser from './CreateNewUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

const AccordianUI = () => {
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => {
        setOpen(value === open ? 0 : value);
    }
    return (
        <section className='w-[40rem]'>
            <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                    All Users
                </AccordionHeader>
                <AccordionBody>
                    <AllUsers />
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                    Search for the Specific User
                </AccordionHeader>
                <AccordionBody>
                    <SpecificUser />
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                    Create New User
                </AccordionHeader>
                <AccordionBody>
                    <CreateNewUser/>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 4}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                    Update User Info
                </AccordionHeader>
                <AccordionBody>
                    <UpdateUser/>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 5}>
                <AccordionHeader onClick={() => handleOpen(5)}>
                    Delete User 
                </AccordionHeader>
                <AccordionBody>
                    <DeleteUser/>
                </AccordionBody>
            </Accordion>
        </section>
    )
}

export default AccordianUI
