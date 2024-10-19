'use client'

import { Drawer } from "antd";
import { useState } from "react";


export default function Header()
{
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    return (
        <>
            <header>
                <h1>
                    Daily<strong>MOVIE</strong>
                </h1>
                <nav onClick={() => setIsDrawerOpen(true)} />
                <div className="search">
                    <svg>
                        <use xlinkHref="#ico-search" />
                    </svg>
                </div>
            </header>

            <Drawer title="DAILY MOVIE"
                    open={isDrawerOpen}
                    size="default"
                    onClose={() => setIsDrawerOpen(false)}
                    placement="left"
                    styles={{ body: {padding:'0px'} }}
                    autoFocus={false}>

            </Drawer>
        </>
    )
}