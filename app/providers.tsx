// app/providers.tsx
'use client'

import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import Header from './components/header';
import Main from './components/main';
import usePreferencesStore from '@/lib/zustand/usePreferencesStore';
import { useEffect, useState } from 'react';


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <SessionProvider>
                <ConfigProvider theme={{ token: { colorPrimary: '#F16018' } }}>

                        <Header />

                        <Main>
                            { children }
                        </Main>

                </ConfigProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}

function ThemeProvider({ children }: {
    children: React.ReactNode
}) {
    const theme = usePreferencesStore((state: any) => state.theme);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            setIsDone(true);
        }
        else if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDone(true);
        }
    }, [theme]);

    if (isDone) {
        return (
            <>
                { children }
            </>
        )
    }
    else {
        return <></>
    }
}