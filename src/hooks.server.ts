
import { JWT_ACCESS_SECRET } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


export const handle = async ({event, resolve}) => {
    const authCookie = event.cookies.get('AuthorizationToken');

    if (authCookie) {
        const token = authCookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
            const prisma = new PrismaClient();
            const user = await prisma.user.findUnique({
                where: {
                    uid: jwtUser.id
                },
                select: {
                    uid: true,
                    username: true,
                    email: true,
                    groups: true,
                }
            });
            if (user) {
                event.locals.user = user;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return await resolve(event);
}