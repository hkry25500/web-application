'use client'

import { Drawer, Menu } from "antd";
import { HomeTwoTone } from '@ant-design/icons'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


const sidebarItems = [
    {
        key: 'home',
        icon: <HomeTwoTone twoToneColor={'#f16018'} />,
        label: <a href="/home">Home</a>
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
    },[])

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
                    items={sidebarItems}
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