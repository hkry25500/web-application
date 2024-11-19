import axios from "axios";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';


const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@domain.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, _req)
            {
                if (credentials?.email && credentials.password)
                {
                    try
                    {
                        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/email/${credentials.email}`);
                        const user = response.data;

                        if (user.password === credentials.password)
                        {
                            return { id: user.uid, email: user.email } as User;
                        }
                        else
                        {
                            throw new Error('Password incorrect!');
                        }
                    }
                    catch(error)
                    {
                        console.error(error);
                        return null;
                    }
                }
                else
                    return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token })
        {
            return token;
        },
        async session({ session, token }): Promise<any>
        {
            if (token && session.user)
            {
                try
                {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/uid/${token.sub}`);
                    session.user = response.data;

                    return session;
                }
                catch (error)
                {
                    console.error('Error fetching user data:', error);
                }
            }
            else
                return session;
        },
    },
})

export { handler as GET, handler as POST }