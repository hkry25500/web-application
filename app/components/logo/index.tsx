'use client'

import './styles.css'


export default function Logo({ className }: any)
{
    return (
        <div className={`text-logo-container ${className}`}>
            <h1 className='text-gray-950 dark:text-gray-50'>
                Epic<strong>flix</strong>
            </h1>
        </div>
    )
}