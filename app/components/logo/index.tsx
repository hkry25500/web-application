'use client'

import './styles.css'


export default function Logo({ className }: any)
{
    return (
        <div className={`text-logo-container ${className}`}>
            <h1>
                Epic<strong>flix</strong>
            </h1>
        </div>
    )
}