import { headers } from "next/headers"
import React from "react"
import { withUpperCase } from '@/lib/util/string'


export async function generateMetadata()
{
    const header = headers()
    const pathname = header.get("x-current-path");
    const title = pathname?.split('/').pop();
    if (title)
    {
        return {
            title: withUpperCase(title)
        }
    }
}

export default function AuthLayout({ children }: {
    children: React.ReactNode
})
{
    return (
        <div id="auth-layout">
            { children }
        </div>
    )
}