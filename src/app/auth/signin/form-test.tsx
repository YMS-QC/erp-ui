'use client';

import { getProviders, getCsrfToken, useSession } from 'next-auth/react';

import { InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CtxOrReq } from 'next-auth/client/_utils';

const SignIn = ({
    providers,
    csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: session } = useSession();
    const router = useRouter();
    console.log(providers);

    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session]);
    return (
        <>
            <h1>SignIn to Continue</h1>

            <div>
                <form method="post" action="/api/auth/signin/email">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <input type="email" id="email" name="email" placeholder="Email" />
                    <button type="submit">Sign in with Email</button>
                </form>
            </div>
        </>
    );
};

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken(context);
    return {
        props: { providers, csrfToken },
    };
};

export default SignIn;
