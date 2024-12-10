'use client'

import { Layout } from "antd";
import Link from "next/link";
import { useMediaQuery } from 'react-responsive'
import { ProfileOutlined, ControlOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WEBAPP_TITLE } from "@/shared/constants";
import { useSession } from "next-auth/react";


const { Sider } = Layout;

export default function SettingsLayout({ children, }: Readonly<{ children: React.ReactNode; }>)
{
    const { data, status } = useSession();
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const pathname = usePathname();
    const [currentKey, setCurrentKey] = useState<string>('');


    useEffect(() => {
        const lastElement = pathname.split('/').filter(Boolean).pop() || '';
        if (lastElement === 'settings')
        {
            document.title = `Settings - ${WEBAPP_TITLE}`
            setCurrentKey('');
        }
        else
        {
            const currentLocation = lastElement.charAt(0).toUpperCase() + lastElement.slice(1);
            document.title = `${currentLocation} - ${WEBAPP_TITLE}`;
            setCurrentKey(lastElement);
        }
    },
    [pathname]);


    if (status !== 'authenticated') {
        return
            <></>
    }

    return (
        <>
            <div id='profile-page' className='w-full'>

                <div className="flex flex-wrap bg-gray-100 w-full min-h-100-70">
                    <div className="w-2/12 bg-white rounded p-3 shadow-lg max-md:hidden">
                        <div className="flex items-center space-x-4 p-2 mb-5">
                            <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={`data:image/png;base64,${data.user.avatar}`}
                                alt={data.user.name}
                            />
                            <div>
                                <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
                                    {data.user.name}
                                </h4>
                                <span className="text-sm tracking-wide flex items-center space-x-1">
                                    <svg
                                        className="h-4 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                    <span className="text-gray-600">Verified</span>
                                </span>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                href="dashboard"
                                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium focus:bg-gray-100 focus:shadow-outline ${currentKey==='dashboard' ? 'bg-gray-200 hover:bg-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    <span className="text-gray-600">
                                        <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                        </svg>
                                    </span>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                href="notifications"
                                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-100 focus:bg-gray-100 focus:shadow-outline ${currentKey==='notifications' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
                                >
                                    <span className="text-gray-600">
                                        <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                        </svg>
                                    </span>
                                    <span>Notifications</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                href="profile"
                                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-100 focus:bg-gray-100 focus:shadow-outline ${currentKey==='profile' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
                                >
                                    <span className="text-gray-600">
                                        <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </span>
                                    <span>My profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                href="preferences"
                                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-100 focus:bg-gray-100 focus:shadow-outline ${currentKey==='preferences' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
                                >
                                    <span className="text-gray-600">
                                        <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                            />
                                        </svg>
                                    </span>
                                    <span>Preferences</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                href="#"
                                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-100 focus:bg-gray-100 focus:shadow-outline`}
                                >
                                    <span className="text-gray-600">
                                        <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Change password</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                href="#"
                                className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-100 focus:bg-gray-100 focus:shadow-outline`}
                                >
                                    <span className="text-gray-600">
                                        <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                    </span>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-10/12">
                        <div className="py-6 px-10">
                            { children }
                        </div>
                    </div>
                </div>

                {/* <div className="max-w-screen-xl mx-auto mb-6">
                    <div className="flex justify-between">

                        <div className="profile-bar-left flex gap-4">
                            <div className="flex">
                                <div className="w-12 h-12 rounded-full overflow-hidden" style={{ boxShadow: '0 0 0 1px var(--shadow-color-secondary)' }}>
                                    <img
                                        src={`data:image/png;base64,${data.user.avatar}`}
                                        className="h-full w-full object-cover"
                                        alt="user"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="text-xl text-[var(--text-color-primary)]">{ data.user.name }</h3>
                                <p className="text-sm text-[var(--text-color-secondary)]">Your personal account</p>
                            </div>
                        </div>

                        <div className="profile-bar-right">
                            <button className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center gap-1 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 transition-all">
                                Go to your personal profile
                            </button>
                        </div>

                    </div>
                </div>

                <Layout className='max-w-screen-xl min-h-100-70 mx-auto' style={{ background: 'var(--background-color-primary)' }}>
                    <Sider className='max-md:hidden' theme='light' width='16rem'>
                        <Menu
                            className='m-1'
                            style={{ border: 'none' }}
                            mode="inline"
                            items={sidebarNavItems}
                            selectedKeys={[currentKey]}
                        />
                    </Sider>
                    <div className='w-full px-6'>
                        { children }
                    </div>
                </Layout> */}

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