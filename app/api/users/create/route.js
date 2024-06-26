import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'

// 4. Create User
export async function POST(req, res) {
    try {
        let { name, age, email, password } = await req.json();
        if (!name || !age || !email || !password) {
            return NextResponse.json({ message: "Provide all field" }, { status: 400 })
        }
        const isFound = users.find((u) => u.email === email);
        if (isFound) {
            return NextResponse.json({
                message: "User already exists"
            }, { status: 301 })
        }
        let len = users.length;
        users.push({ id: len + 1, name: name, age: age, email: email, password: password });
        const updatedUserArray = users;
        const updatedArray = JSON.stringify(updatedUserArray, null, 2);
        fs.writeFileSync('./app/util/db.js',
            `export const users = ${updatedArray};`,
            'utf-8'
        )
        return NextResponse.json({
            message: "User created"
        }, { status: 201 })
    } catch (error) {
        console.log(error);
    }
}