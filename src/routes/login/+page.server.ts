import { goto } from '$app/navigation';
import { getJwt } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({cookies, request}) => {
        const formData = Object.fromEntries(await request.formData());
        const {username, password} = formData;

        if (!username) {
            return fail(400, {username, error: 'Please enter a username', usernameMissing: true});
        }
        
        if (!password) {
            return fail(400, {username, error: 'Please enter a password', passwordMissing: true, passwordError: true});
        }
        
        const result = await getJwt(username.toString(), password.toString());

        if (result?.error) {
            return fail(400, {username, error: result?.error});
        }

        cookies.set('AuthorizationToken', `Bearer ${result?.token}`, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        throw redirect(302, '/dashboard');
        return {username, success: true}
    },
    logout: async ({cookies}) => {
        cookies.delete('AuthorizationToken', {path: '/'});
        throw redirect(302, '/login');
    }
}