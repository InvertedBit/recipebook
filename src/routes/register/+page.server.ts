import { createUser } from '$lib/server/auth.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    register: async ({cookies, request}) => {
        const formData = Object.fromEntries(await request.formData());
        const {username, email, password, password2} = formData;

        if (!username) {
            return fail(400, {username, email, error: 'Please enter a username', usernameMissing: true});
        }
        if (!email) {
            return fail(400, {username, email, error: 'Please enter a valid E-Mail address', emailMissing: true});
        }
        if (!password) {
            return fail(400, {username, email, error: 'Please enter a password', passwordMissing: true, passwordError: true});
        }
        if (password != password2) {
            return fail(400, {username, email, error: 'The passwords must match', passwordMismatch: true, passwordError: true, password2Error: true});
        }

        const result = await createUser(username, email, password);

        if (result?.error) {
            return fail(400, {username, email, error: error});
        }

        return {username, email, success: true}
    }
}