import type { PageServerLoad } from "./$types";

export const load = (({ params, locals }) => {
    const user = locals.user;
    if (params.slug == 'test') {
        return {
            user: user,
            title: 'Test recipe'
        }
    } else if (params.slug == 'hello') {
        return {
            user: user,
            title: 'Hello World!'
        }
    }
}) satisfies PageServerLoad;