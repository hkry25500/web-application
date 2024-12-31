'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function SettingsPage()
{
    const { data, status } = useSession();
    const router = useRouter();


    useEffect(() =>
    {
        fetch('/api/browser')
        .then(res => res.json())
        .then(data => {
            if ((data.device as DeviceType) === 'mobile') {
                return;
            }
            else {
                router.push('/settings/dashboard');
            }
        });
    },
    []);


    if (status !== 'authenticated') {
        return <></>
    }

    return (
        <>
            <div className="flex md:hidden items-center space-x-4 p-2 mb-5">
                <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={`data:image/png;base64,${data.user.avatar}`}
                    alt={data.user.name}
                />
                <div>
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 capitalize font-poppins tracking-wide">
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
                        <span className="text-gray-600 dark:text-gray-50">Verified</span>
                    </span>
                </div>
            </div>
            <ul className="md:hidden space-y-3 text-sm">
                <li>
                    <Link
                    href="/settings/dashboard"
                    className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                    >
                        <span className="text-gray-600 dark:text-gray-50">
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
                    href="/settings/notifications"
                    className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                    >
                        <span className="text-gray-600 dark:text-gray-50">
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
                    href="/settings/profile"
                    className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                    >
                        <span className="text-gray-600 dark:text-gray-50">
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
                    href="/settings/preferences"
                    className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                    >
                        <span className="text-gray-600 dark:text-gray-50">
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
                    className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                    >
                        <span className="text-gray-600 dark:text-gray-50">
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
                    className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                    >
                        <span className="text-gray-600 dark:text-gray-50">
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
        </>
    )
}