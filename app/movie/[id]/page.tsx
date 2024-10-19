'use client'

import dynamic from 'next/dynamic';
import './styles.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export default function MoviePage()
{
    const params = useParams();
    const { id } = params;

    useEffect(() =>
    {
        document.addEventListener('contextmenu', event => event.preventDefault());
    },
    []);

    // const [isVideoReady, setVideoReady] = useState<boolean>(false);
    // const [videoUrl, setVideoUrl] = useState<string>();

    // useEffect(() =>
    // {
    //     if (id)
    //     {
    //         const fetchVideo = async () => {
    //             const url = `http://192.168.3.12:8080/static/movie/${id}/stream?from=internal`;
    //             try
    //             {
    //                 const response = await axios.get(url, {
    //                     responseType: 'blob'
    //                 });
    //                 setVideoUrl(URL.createObjectURL(response.data));
    //             }
    //             catch (error)
    //             {
    //                 console.log('Error fetching video:', error);
    //             }
    //         };
    
    //         fetchVideo();
    //     }
    // }, [id]);

    // useEffect(() => {
    //     if (videoUrl)
    //     {
    //         setVideoReady(true);
    //     }
    // }, [videoUrl]);

    return (
        <>
            <div className="contain">
                <div id="video">
                    <div className="player">
                        {
                            <ReactPlayer
                                width='100%'
                                height='100%'
                                url={`http://192.168.3.12:8080/static/movie/${id}/stream?from=internal`}
                                controls
                                config={{ file: { 
                                    attributes: {
                                        controlsList: 'nodownload'
                                    }
                                }}}
                            />
                        }
                        {/* <div className="content" id="player">

                        </div> */}
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
                            {/* <div class="item-text">Additional description text</div> */}
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
                        {/*                 <span class="button" style="float: right;">Join Study Group</span> */}
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
            </div>
        </>
    )
}