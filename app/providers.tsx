// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Header from './components/header';
import Main from './components/main';
import { AntdRegistry } from '@ant-design/nextjs-registry'


export function Providers({children}: { children: React.ReactNode }) {

    const router = useRouter();

    return (
        <SessionProvider>
            <NextUIProvider navigate={router.push}>
                <ConfigProvider theme={{ token: { colorPrimary: '#F16018' } }}>
                    <AntdRegistry>

                        <Header />

                        <Main>
                            { children }
                        </Main>

                    </AntdRegistry>
                </ConfigProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}