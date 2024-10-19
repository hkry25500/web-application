'use client'

import { Layout } from "antd";
import { Providers } from "../../providers";

const { Content } = Layout;


export default function Main({ children, }: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <>
            <Content>
                <Providers>
                    { children }
                </Providers>
            </Content>
        </>
    )
}