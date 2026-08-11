import { createAuthClient } from "better-auth/react";
import { deviceAuthorizationClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
    baseURL:"https://arc-x0es.onrender.com/",
    plugins: [
        deviceAuthorizationClient(),
    ],
})