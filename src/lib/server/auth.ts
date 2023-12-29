import { JWT_ACCESS_SECRET } from "$env/static/private";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export async function createUser(username: string, email: string, password: string) {
    try{
        const user = await prisma.user.create({
            data: {
            username: username,
            email: email,
            password_hash: await bcrypt.hash(password, 12),
            created_at: new Date(),
        }});
        console.log(user);
        return {user: user};
    } catch(error) {
        console.log(error);
        return {error: error};
    }       
}

export async function getJwt(username: string, password: string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username,
        }
    });
    if (!user) {
        return {
            error: 'User not found'
        }
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        return {
            error: 'Username and password don\'t match'
        };
    }
    return {
        token: jwt.sign({
            id: user.uid,
            username: user.username,
            email: user.email,
        },
        JWT_ACCESS_SECRET,
        {
            expiresIn: '1d'
        }
        )
    }
}