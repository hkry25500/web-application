// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Header from './components/header';
import Main from './components/main';

export function Providers({children}: { children: React.ReactNode }) {

    const router = useRouter();

    return (
        <SessionProvider>
            <NextUIProvider navigate={router.push}>
                <ConfigProvider theme={{ token: { colorPrimary: '#F16018' } }}>

                    <Header />

                    <Main>
                        { children }
                    </Main>

                </ConfigProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}