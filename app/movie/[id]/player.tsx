'use client'

import React, { useEffect, useState } from 'react';
import { MediaType, Options, SourceInfo } from 'plyr';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const Plyr = dynamic(() => import('plyr-react'), { ssr: false });
import 'plyr-react/plyr.css';
import { PlyrOptions, PlyrSource } from 'plyr-react';


type PlyrConfigurationProps = {
    source: PlyrSource | null;
    options?: PlyrOptions | null;
};

export default function MoviePlayer({ movie }: {
    movie: any;
})
{
    const [isMobile, setIsMobile] = useState<boolean|undefined>(undefined);

    useEffect(() =>
    {
        if (isMobile === undefined) {
            fetch('/api/browser')
                .then(res => res.json())
                .then(data => {
                    if ((data.device as DeviceType) === 'mobile') {
                        setIsMobile(true);
                    }
                    else {
                        setIsMobile(false);
                    }
                })
                    .catch(_ => setIsMobile(false));
        }
    },
    [isMobile]);

    const plyrProps = {
        source: {
            type: 'video' as MediaType,
            title: movie.title,
            sources: [
                {
                    src: `${movie.stream.url}/720p.mp4`,
                    type: 'video/mp4',
                    size: 720,
                },
                {
                    src: `${movie.stream.url}/1080p.mp4`,
                    type: 'video/mp4',
                    size: 1080,
                }
            ],
            poster: movie.poster.url,
            tracks: movie.tracks,
        } as SourceInfo,
        options: {
        } as Options,
        crossOrigin: "anonymus",

    } as PlyrConfigurationProps;


    if (isMobile === undefined) {
        return <></>
    }

    return (
        <div className='absolute w-full h-full top-0, left-0, right-0, bottom-0'>
        {
            isMobile ?
            <ReactPlayer
                url={movie.source.url}
                config={{
                    file: {
                        attributes: {
                            crossOrigin: 'true',
                            controlsList: 'nodownload'
                        },
                        tracks: movie.tracks,
                    }
                }}
                width='100%'
                height='100%'
                controls
            />
            :
            <Plyr {...plyrProps} />
        }
        </div>
    )
}