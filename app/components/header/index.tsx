'use client'

import { Drawer, Menu } from "antd";
import { HomeTwoTone, LogoutOutlined, UserAddOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ItemType, MenuItemType } from "antd/es/menu/interface";


const sidebarItems = (status: "authenticated" | "loading" | "unauthenticated"): ItemType<MenuItemType>[]|any =>
[
    {
        type: 'group',
        key: 'nav',
        label: 'Navigation',
        children: [
            {
                key: 'home',
                icon: <HomeTwoTone twoToneColor={'#f16018'} />,
                label: <Link href='/home'>Home</Link>
            }
        ]
    },
    {
        type: 'group',
        key: 'account',
        label: 'Account',
        children: [
            status==='unauthenticated' &&
            {
                key: 'signin',
                label: <Link href='/auth/signin'>Sign in</Link>,
                icon: <UserAddOutlined />
            },
            status==='authenticated' &&
            {
                key: 'signout',
                label: <a role='button' onClick={() => signOut()}>Sign out</a>,
                icon: <LogoutOutlined />
            }
        ].filter(Boolean)
    }
]

export default function Header()
{
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [currentKey, setCurrentKey] = useState<string>('');
    const pathname = usePathname();

    useEffect(() => {
        const routeSegments = pathname.split('/').filter(Boolean);
        if (routeSegments.length === 1)
        {
            setCurrentKey(routeSegments[0]);
        }
        else
        {
            setCurrentKey('');
        }
    },[pathname]);

    const { status } = useSession();

    return (
        <>
            <header>
                <div>
                    <h1>
                        Daily<strong>MOVIE</strong>
                    </h1>
                </div>
                <nav onClick={() => setIsDrawerOpen(true)} />
                <div className="search">
                    <svg>
                        <use xlinkHref="#ico-search" />
                    </svg>
                </div>
            </header>

            <Drawer title={<SidebarTitleLogo />}
                    open={isDrawerOpen}
                    size="default"
                    onClose={() => setIsDrawerOpen(false)}
                    placement="left"
                    styles={{ body: {padding:'0px'} }}
                    autoFocus={false}>
                <Menu
                    style={{
                        width: '100%',
                    }}
                    mode="vertical"
                    items={sidebarItems(status)}
                    selectedKeys={[currentKey]}
                >
                </Menu>
            </Drawer>
        </>
    )
}

const SidebarTitleLogo = (): React.ReactNode =>
{
    return (
        <div className="text-logo-container ml-3">
            <h1>
                Daily<strong>MOVIE</strong>
            </h1>
        </div>
    )
}