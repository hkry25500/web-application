'use client'

import { Carousel } from "antd";
import { PlayCircleFilled } from '@ant-design/icons'


export default function Hero({ trending }: {
    trending: any[],
})
{
    return (
        <>
            <Carousel className="w-full h-100-70">
                {
                    trending.map(item => {
                        return (
                            <CarouselItem key={item.id} item={item} />
                        )
                    })
                }
            </Carousel>
        </>
    )
}

const CarouselItem = ({ item }: {
    item: any;
}) =>
{
    return (
        <div className="hero-wrapper flex justify-start items-center w-full h-100-70" style={backgroundImageStyle(item.poster.url)}>
            <div className="hero-info-wrapper mt-auto mb-auto ml-40 mr-0 max-md:mx-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center text-white uppercase z-10">
                <h1 className="text-5xl font-bold tracking-tight mb-6">{ item.title }</h1>
                <ul className="flex justify-start items-center list-none mb-6 p-0">
                    {
                        item.interests.map((interest: string) => <li key={interest} className="pl-1 pr-3 text-sm">{interest}</li>)
                    }
                </ul>
                <button className="flex justify-between items-center text-black gap-3 cursor-pointer border-none rounded-3xl text-sm font-semibold bg-[var(--accent-color-secondary)] py-3 px-5">
                    Watch Trailer <PlayCircleFilled />
                </button>
            </div>
        </div>
    )
}

const backgroundImageStyle = (imageUrl: string) =>
{
    return {
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 20%), url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
}