'use client'

import { Avatar, Drawer, Menu } from "antd";
import { HomeTwoTone, LogoutOutlined, ProfileOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import './styles.scss'
import Logo from "../logo";


const sidebarItems = (status: "authenticated" | "loading" | "unauthenticated"): ItemType<MenuItemType>[]|any =>
[
    {
        type: 'group',
        key: 'nav',
        label: 'Navigation',
        children: [
            {
                key: 'home',
                icon: <HomeTwoTone twoToneColor={'#F16018'} />,
                label: <a href='/home'>Home</a>
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
                label: <a href='/auth/signin'>Sign in</a>,
                icon: <UserAddOutlined />
            },
            status==='authenticated' &&
            {
                key: 'profile',
                label: <a href="/settings/profile">Profile</a>,
                icon: <ProfileOutlined />
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
    const { status, data } = useSession();

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

    return (
        <>
            <header>
                <nav onClick={() => setIsDrawerOpen(true)} />

                <Logo />

                <div className="search flex items-center gap-4">
                    {
                        status==='unauthenticated' && <p className="text-sm text-[var(--text-color-primary)]">Sign in</p>
                    }
                    {
                        status==='authenticated' ?
                            <Avatar
                                size='large'
                                src={`data:image/png;base64,${data?.user.avatar}`}
                                onClick={() => location.href = '/settings/profile'}
                                />
                            :
                            <Avatar
                                size='large'
                                src='/images/user.svg'
                                onClick={() => location.href = '/auth/signin'}
                                />
                    }
                </div>
            </header>

            <Drawer title={<Logo className='flex justify-start items-center ml-4' />}
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