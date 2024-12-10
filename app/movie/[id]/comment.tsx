'use client'

import axios from "axios";
import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react";


export default function CommentDetail({ movie }: any)
{
    const { data, status } = useSession();

    const [comment, setComment] = useState<string>('');
    const handleCommentSend = () => {
        const obj = {
            movieId: movie.id,
            userId: data?.user.uid,
            content: comment
        }
        setComments(prev => [{ ...obj, ...data?.user }, ...(prev as any[])]);
        axios.post('/api/comments', obj);
    }

    const [comments, setComments] = useState<any[]>();
    useEffect(() => {
        if (!comments) {
            axios.get('/api/comments/'+movie.id)
            .then(res => res.data)
            .then((comments: any[]) => {
                setComments(comments);
            });
        }
    },[]);


    return (
        <div className="flex flex-1 flex-col w-full gap-6">

            <div className='comment-bar w-full flex flex-col gap-6 mx-auto max-w-screen-xl'>
                <div className='comment-header w-full flex items-center gap-4'>
                    <h2 className='text-2xl text-[var(--text-color-primary)]'>Comment</h2>
                    <span className='text-base text-[var(--text-color-secondary)]'>{ comments?.length || 0 }</span>
                </div>
                <div className='comment-area w-full flex max-md:flex-col max-md:items-start items-center gap-6 xl:pl-4'>
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                        {
                            status==='authenticated' ?
                            <img
                                src={`data:image/png;base64,${data?.user.avatar}`}
                                className="h-full w-full object-cover"
                            />
                            :
                            <img
                                src='/images/user.svg'
                                className="h-full w-full object-cover"
                            />
                        }
                    </div>
                    {/* Textarea */}
                    <div className="relative w-full">
                        <input
                            id="hs-textarea-ex-2"
                            className="p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Leave your comment here..."
                            draggable={false}
                            value={comment}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                            disabled={(status==='loading'||status==='unauthenticated')}
                            defaultValue=''
                        />
                        {/* Toolbar */}
                        <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-gray-100">
                            <div className="flex justify-between items-center">
                                {/* Button Group */}
                                <div className="flex items-center">
                                    {/* Mic Button */}
                                    <button
                                        type="button"
                                        className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100"
                                    >
                                        <svg
                                            className="shrink-0 size-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect width={18} height={18} x={3} y={3} rx={2} />
                                            <line x1={9} x2={15} y1={15} y2={9} />
                                        </svg>
                                    </button>
                                    {/* Attach Button */}
                                    <button
                                        type="button"
                                        className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100"
                                    >
                                        <svg
                                        className="shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        >
                                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                        </svg>
                                    </button>
                                </div>
                                {/* End Button Group */}
                                {/* Button Group */}
                                <div className="flex items-center gap-x-1">
                                {/* Mic Button */}
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100"
                                >
                                    <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1={12} x2={12} y1={19} y2={22} />
                                    </svg>
                                </button>
                                {/* End Mic Button */}
                                {/* Send Button */}
                                <button
                                    type="button"
                                    className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500"
                                    onClick={handleCommentSend}
                                >
                                    <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    >
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                    </svg>
                                </button>
                                {/* End Send Button */}
                                </div>
                                {/* End Button Group */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full mx-auto px-8 max-w-screen-xl min-h-[400px]">
                {
                    comments?.map(comment => {
                        return (
                            <div className="flex mt-10 animate-appearance-in">
                                <div className="flex flex-col mr-4">
                                    <div className="relative mb-3">
                                        <div className="h-12 w-12 bg-gray-100 rounded-full overflow-hidden">
                                            <img
                                                src={`data:image/png;base64,${comment.avatar}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-sm font-semibold">{ comment.name }</div>
                                                <div className="text-sm text-gray-500">
                                                    Commented on Oct 23, 2020 at 3:19pm
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-[var(--text-color-primary)]'>
                                            { comment.content }
                                        </p>
                                        <div className="flex gap-2 mt-4">
                                            <button className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2 transition-all">
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                                </svg>
                                                <span>0</span>
                                            </button>
                                            <button className="py-1.5 px-3 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2 transition-all">
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                                </svg>
                                                <span>0</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export function CommentSkeleton() {
    return (
        <div
            role="status"
            className="w-3/4 max-md:w-full animate-pulse mt-1"
            >
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            <div className="flex items-center mt-4">
                <svg
                className="w-12 h-12 me-3 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="w-full">
                    <div className="w-full h-20 bg-gray-200 rounded-lg dark:bg-gray-700" />
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}