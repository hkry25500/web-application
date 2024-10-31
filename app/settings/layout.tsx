'use client'

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useMediaQuery } from 'react-responsive'
import { ProfileOutlined, ControlOutlined } from '@ant-design/icons'
import './index.css'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const { Sider } = Layout;


export default function SettingsLayout({ children, }: Readonly<{ children: React.ReactNode; }>)
{
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const pathname = usePathname();

    const [currentKey, setCurrentKey] = useState<string>('');

    useEffect(() => {
        const lastElement = pathname.split('/').filter(Boolean).pop() || '';
        if (lastElement === 'settings')
        {
            setCurrentKey('');
        }
        else
        {
            setCurrentKey(lastElement);
        }
    },
    [pathname]);

    return (
        <>
            <div id='profile-page'>

                <Layout className={`min-h-100-70`}>

                    <Sider className={`${ isMobile && 'hidden' }`} theme='light' width='16rem'>
                        <Menu
                            className='m-1'
                            mode="inline"
                            items={sidebarNavItems}
                            selectedKeys={[currentKey]}
                        />
                    </Sider>

                    <div className='w-full px-10 pt-2'>
                        { children }
                    </div>

                </Layout>
            </div>
        </>
    )
}

const sidebarNavItems =
[
    {
        key: 'preferences',
        icon: <ControlOutlined />,
        label: <Link href='/settings/preferences'>Preferences</Link>
    },
    {
        key: 'profile',
        icon: <ProfileOutlined />,
        label: <Link href='/settings/profile'>Profile</Link>
    }
]