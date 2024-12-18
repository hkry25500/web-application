import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Homepage"
};

export default function HomeLayout({ children, }: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <>
            { children }
        </>
    )
}