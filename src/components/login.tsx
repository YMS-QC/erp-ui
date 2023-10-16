'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import React, { useEffect, useState } from 'react';

import { signIn } from 'next-auth/react';

import { useRouter, useSearchParams } from 'next/navigation';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const FormSchema = z.object({
    // csrfToken: z.string().default(csrfToken),
    username: z.coerce.string({ required_error: '请填写用户名' }).nonempty(),
    password: z.coerce.string({ required_error: '请填写密码' }).nonempty(),
});

export default function Login() {
    const [error, setError] = useState({ message: '' });

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    // const { data: session } = useSession();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {},
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { username, password } = data;

        try {
            const res = await signIn<'credentials'>('credentials', {
                redirect: Boolean(false),
                username,
                password,
                callbackUrl: callbackUrl || '/',
            });

            if (!res?.ok && res?.error === 'CredentialsSignin')
                setError({ message: 'Bad email or password !' });

            if (res?.ok && res?.url) router.push(res?.url);
        } catch (siginError: any) {
            setError({ message: siginError.message });
        }
    }

    useEffect(() => {
        if (!form.formState.isValid) {
            form.reset({ username: '', password: '' });
        }
    }, []);

    // return (
    //     <form method="post" action="/api/auth/callback/credentials">
    //         <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //         <label>
    //             Username
    //             <input name="username" type="text" />
    //         </label>
    //         <label>
    //             Password
    //             <input name="password" type="password" />
    //         </label>
    //         <button type="submit">Sign in</button>
    //     </form>
    // );

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 content-center h-[800px]  w-full">
                <div className="flex flex-col items-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <Label className="text-lg font-bold">填写登录信息</Label>
                            <Separator />

                            {error?.message && (
                                <Alert variant="destructive">
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    <AlertTitle>校验失败</AlertTitle>
                                    <AlertDescription>工号或者密码错误</AlertDescription>
                                </Alert>
                            )}

                            <div className="flex flex-col space-y-1 text-start">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>工号</FormLabel>
                                            <FormControl>
                                                <Input placeholder="010*****" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>密码</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col w-full space-x-1">
                                <Button
                                    type="submit"
                                    loading={
                                        form.formState.isLoading || form.formState.isSubmitting
                                    }
                                    disabled={
                                        !form.formState.isDirty ||
                                        !form.formState.isValid ||
                                        form.formState.isSubmitting
                                    }
                                >
                                    登录
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
