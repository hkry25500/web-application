'use client'

import { Drawer, Menu } from "antd";
import { HomeTwoTone, LogoutOutlined, ProfileOutlined, UserAddOutlined } from '@ant-design/icons'
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
                label: <a href="/settings/dashboard">Settings</a>,
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
            <header className="bg-white dark:bg-neutral-800">
                <nav className="absolute w-7 h-7 top-[21px] left-[21px] cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
                    <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
                    </svg>
                </nav>

                <Logo />

                <div className="search flex items-center">
                    {
                        status==='authenticated' ?
                            data.user.avatar!=undefined ?
                                <img
                                    className="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
                                    src={`data:image/png;base64,${data?.user.avatar}`}
                                    onClick={() => location.href = '/settings/profile'}
                                    />
                                :
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                                </div>
                            :
                            <>
                                <div
                                    className="relative w-10 h-10 bg-gray-100 dark:bg-gray-600 overflow-hidden rounded-full cursor-pointer"
                                    onClick={() => location.href = '/auth/signin'}
                                    >
                                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                </div>
                            </>
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