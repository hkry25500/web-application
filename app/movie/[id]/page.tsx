'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Switch } from '@nextui-org/switch';
import axios from 'axios';
import ChatBox from '@/components/chat-box';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export default function MoviePage()
{
    const params = useParams();
    const { id } = params;

    const [movie, setMovie] = useState<any>();

    useEffect(() =>
    {
        if (!movie)
        {
            axios.get('/api/movies')
            .then(res => res.data)
                .then((movies: any[]) => {
                    movies.map(movie => {
                        if (movie.id === id)
                        {
                            setMovie(movie);
                        }
                    });
                })
            .catch(err => console.error(err));
        }
    },
    [])

    return (
        <>

            <div className="flex flex-col min-h-screen">

                {/* Main */}
                <main className="flex-1 bg-grey-lightest z-0 py-5 px-5">
                    <div className="flex flex-wrap mx-auto">

                        {/* main col */}
                        <div className="w-full md:flex-1">
                            {/* player */}
                            <div className="bg-black relative mb-3" style={{ paddingTop: "55%" }}>
                                <ReactPlayer
                                    width='100%'
                                    height='100%'
                                    style={{ position: 'absolute', top:'0', left:'0', right:'0' }}
                                    url={`${movie?.sources.internal.url}`}
                                    controls
                                    config={{ file: { 
                                        attributes: {
                                            controlsList: 'nodownload'
                                        }
                                    }}}
                                />
                            </div>
                            {/* video info */}
                            <div className="flex flex-wrap items-end">
                                {/* title */}
                                <div className="pb-2">
                                    <h1 className="text-xl my-2">{ movie?.name }</h1>
                                    <span className="text-base text-grey-darken">115 min</span>
                                </div>
                                {/* buttons actions */}
                                <div className="ml-auto">
                                    {/* likes */}
                                    <div className="flex relative pb-2">
                                    {/* like */}
                                    <div className="flex items-center">
                                        <svg
                                        className="w-5 opacity-75"
                                        viewBox="0 0 24 24"
                                        preserveAspectRatio="xMidYMid meet"
                                        focusable="false"
                                        >
                                        <g>
                                            <path
                                            d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
                                            className="style-scope yt-icon"
                                            />
                                        </g>
                                        </svg>
                                        <span className="text-xs text-grey-darken ml-1">1 300</span>
                                    </div>
                                    {/* hate */}
                                    <div className="flex items-center ml-5">
                                        <svg
                                        className="w-5 opacity-75"
                                        viewBox="0 0 24 24"
                                        preserveAspectRatio="xMidYMid meet"
                                        >
                                        <g>
                                            <path
                                            d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
                                            className="style-scope yt-icon"
                                            />
                                        </g>
                                        </svg>
                                        <span className="text-xs text-grey-darken ml-1">300</span>
                                    </div>
                                    <div className="absolute w-full h-1 bg-grey pin-b t-5 rounded-full overflow-hidden">
                                        <div className="absolute pin-l pin-t w-3/4 h-full bg-grey-darkest" />
                                    </div>
                                    </div>
                                </div>
                                <hr className="w-full border-t m-0 mb-3 " />
                            </div>
                        </div>

                        {/*  aside */}
                        <aside className="w-full md:max-w-xs xl:max-w-full xl:w-1/4 md:pl-5 mt-5 md:mt-0">
                            {/* up next */}
                            <div className="w-full">

                                {/* <div className="flex w-full items-center justify-between mb-3">
                                    <span>Up Next</span>
                                    <div className="flex items-center">
                                        <span className="text-sm mr-2">AUTOLAY</span>
                                        <Switch size='sm' defaultSelected />
                                    </div>
                                </div>
                                <div className="flex flex-wrap w-full">
                                    <div className="w-1/2 bg-black" style={{ paddingTop: "30%" }} />
                                    <div className="w-1/2 pl-2">
                                    <h3 className="text-base mb-2">Video upcoming title</h3>
                                    <p className="text-sm text-grey-darken mb-1">Chanel</p>
                                    <p className="text-sm text-grey-darken mb-1">13K views</p>
                                    </div>
                                    <hr className="w-full my-4 border-t " />
                                </div> */}

                                <ChatBox />

                            </div>
                        </aside>

                    </div>
                </main>
            </div>

            {/* <div className="contain">
                <div id="video">
                    <div className="player">
                        {
                            <ReactPlayer
                                width='100%'
                                height='100%'
                                url={`http://192.168.3.12:8080/static/movie/${id}/stream.m3u8?from=internal`}
                                controls
                                config={{ file: { 
                                    attributes: {
                                        controlsList: 'nodownload'
                                    }
                                }}}
                            />
                        }
                    </div>
                    <div className="list-block media-list" style={{ background: "#fff" }}>
                    <ul>
                        <li>
                        <div className="item-content">
                            <div className="item-media">
                            <img
                                src="https://content.jwplatform.com/thumbs/LlOwUjAi.jpg"
                                width={80}
                            />
                            </div>
                            <div className="item-inner">
                            <div className="item-title-row">
                                <div className="item-title">The Right Gear: Part 1</div>
                                <div className="item-after">
                                Autoplay &nbsp;
                                <label className="label-switch">
                                    <input type="checkbox" />
                                    <div className="checkbox" />
                                </label>
                                </div>
                            </div>
                            <div className="item-subtitle">
                                The first technique is making sure you have the right gear for
                                landscape photography.
                            </div>
                            </div>
                        </div>
                        <div className="progressbar" data-progress={15}>
                            <span
                            style={{ transform: "translate3d(-85%, 0px, 0px)" }}
                            className=""
                            />
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                <div id="details">
                    <div className="content-block">
                    <div className="content-block-inner">
                        <span style={{ float: "right", fontSize: 28 }}>
                        <i className="fa fa-bookmark-o color-cyan" />
                        </span>
                        <h1>10 Essential Tips Every Landscape Photographer Should Know</h1>
                        <p>
                        Join Scott Kelby on the amazing Oregon coast and learn everything you
                        need to know to create the best landscape photos you’ve ever taken!
                        There are 10 essential tips that every landscape photographer needs to
                        know, from the right gear and how to use it, to knowing how to prepare
                        before you go and what to do when you are there. As a landscape
                        photographer you want to be able to show people not only what you saw,
                        but how it made you feel when you were there, and with these essential
                        tips, all demonstrated on location, you’ll be able to bring home the
                        kind of images you’ve always dreamed of making.
                        </p>
                        <a
                        style={{
                            clear: "both",
                            textTransform: "uppercase",
                            lineHeight: 24,
                            height: 36
                        }}
                        href=""
                        >
                        <i className="fa fa-cloud-download color-cyan" /> Course Downloads
                        </a>
                    </div>
                    </div>
                    <div className="content-block-title">Transcripts</div>
                    <div className="content-block">
                    <div className="content-block-inner">
                        <div className="row">
                        <p>
                            <span className="color-orange">
                            {" "}
                            Transcripts would show up here...
                            </span>{" "}
                            Follow the bouncing ball
                        </p>
                        <p />
                        <p />
                        </div>
                    </div>
                    </div>
                    <div className="content-block-title">Join the Discussion</div>
                    <div className="content-block">
                    <div className="content-block-inner">
                        <div className="row">
                        <div
                            id="discourse-comments"
                            className="col-100"
                            style={{ minHeight: 300 }}
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}