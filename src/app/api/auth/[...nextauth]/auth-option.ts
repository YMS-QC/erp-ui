import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

interface JwtWithBackendTokens extends JWT {
    backendTokens: any;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: '工号',
                    type: 'text',
                    placeholder: '010*****',
                },
                password: { label: '密码', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status === 401) {
                    console.log(res.statusText);

                    return null;
                }
                const user = await res.json();
                return user;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) return { ...token, ...user };

            if (new Date().getTime() < token?.backendTokens?.expiresIn) return token;

            return refreshToken(token);
        },

        async session({ token, session }: { token: any; session: any }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            session.expires = new Date(token?.backendTokens?.expiresIn);
            return session;
        },
    },

    pages: { signIn: '/auth/signin' },
};

async function refreshToken(token: JwtWithBackendTokens): Promise<JWT> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken ?? ``}`,
        },
    });
    console.log('refreshed');

    const response = await res.json();

    return {
        ...token,
        backendTokens: response,
    };
}
