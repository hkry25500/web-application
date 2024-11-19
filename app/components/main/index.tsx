'use client'

export default function Main({ children, }: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <div className="w-screen">
            { children }
        </div>
    )
}