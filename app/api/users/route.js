import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'

//1. get All Users Data
export async function GET() {
    const data = users
    return NextResponse.json({ data }, { status: 200 })
}


// 3. Login
export async function POST(req, res) {
    try {
        let { email, password } = await req.json();
        const { name: uname, email: uEmail, password: uPassword } = users.find((u) => u.email === email);
        if (uEmail === email && password === uPassword) {
            return NextResponse.json({ result: `Hi ${uname}` })
        }
        else if (!email || !password) {
            return NextResponse.json({ result: "Please provide email and password both" });
        }
        else {
            return NextResponse.json({ result: "Invalid Credentials" });
        }
    } catch (e) {
        console.log(e);
    }
}

//5. update
export async function PUT(req, res) {
    try {
        let { id, name, age, email, password } = await req.json();
        console.log(id);
        if (!id) {
            return NextResponse.json({
                message: "Please provide ID"
            }, { status: 404 })
        }
        const userIndex = users.findIndex((u) => u.id === id);
        console.log(userIndex);
        if (userIndex === -1) {
            return NextResponse.json({
                message: "Please provide valid ID"
            }, { status: 404 })
        }
        if(name){
            users[userIndex].name=name;
        }
        if(age){
            users[userIndex].age = age;
        }
        if(email){
            users[userIndex].email = email;
        }
        if(password){
            users[userIndex].password = password;
        }
        const updatedUserArray = users;
        const updatedArray = JSON.stringify(updatedUserArray,null,2);
        fs.writeFileSync('./app/util/db.js',
            `export const users = ${updatedArray};`,
            'utf-8'
        )
        return NextResponse.json({
            message:"User updated"
        })
    } catch (e) {
        console.log(e);
    }
}
