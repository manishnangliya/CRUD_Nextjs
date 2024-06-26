import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'

//2.get specific user
export async function GET(_, { params }) {
    const id = params.id;
    const userData = users.filter((u) => u.id == id);
    if (userData.length == 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 }, { ok: false })
    }

    return NextResponse.json({ userData,ok:true }, { status: 200 }, { ok: true })
}

// 5. delete User

export async function DELETE(req,res) {
    const {id} =await res.params;
    const userIndex = users.findIndex((u) => u.id === Number(id));
    if (userIndex === -1) {
        return NextResponse.json({
            message: "Please give valid id"
        }, { status: 404 })
    }
    users.splice(userIndex,1);
    const updatedUserArray = users;
    const updatedArray = JSON.stringify(updatedUserArray,null,2);
    fs.writeFileSync('./app/util/db.js',
        `export const users = ${updatedArray};`,
        'utf-8'
    )
    return NextResponse.json({
        message:"User deleted"
    })
}