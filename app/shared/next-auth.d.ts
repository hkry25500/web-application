import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            [x: string]: string | undefined
            uid: number | string
            email: string
            name: string
            password: string
            avatar?: string
        }
    }
}