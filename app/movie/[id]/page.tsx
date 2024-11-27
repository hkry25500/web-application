import ChatBox from './chat';
import Player from './player';
import { CommentSkeleton } from './comment';
import dynamic from 'next/dynamic';
const CommentDetail = dynamic(() => import('./comment'), {
    ssr: false,
    loading: CommentSkeleton
});


export default async function MoviePage({ movie }: any)
{
    if (!movie) {
        return <></>
    }

    return (
        <>
            <div id='movie-page' className="flex flex-col w-full min-h-screen">
                {/* Main */}
                <main className="flex-1 justify-center z-0 py-5 px-5">

                    <div className="flex flex-wrap max-w-screen-2xl mx-auto 2xl:mt-10 2xl:gap-10">
                        {/* main col */}
                        <div className="w-full md:flex-1">
                            {/* player */}
                            <div className="bg-black relative mb-3" style={{ paddingTop: "55%" }}>
                                <Player movie={movie} />
                            </div>
                            {/* video info */}
                            <div className="flex flex-wrap items-end pt-2">
                                {/* title */}
                                <div className="mb-4">
                                    <h1 className="text-xl text-[var(--text-color-primary)] font-bold tracking-tighter shrink-0 my-2">{ movie.title }</h1>
                                    <span className='text-sm text-[var(--text-color-secondary)]'>{ movie.description }</span>
                                </div>
                                {
                                    movie.interests.map((interest: string) => {
                                        return (
                                            <div style={{ paddingTop: "0.2em", paddingBottom: "0.2rem" }}
                                                 className="text-xs mr-2 px-3 bg-gray-200 text-gray-800 rounded-full"
                                                 key={interest}>
                                                { interest }
                                            </div>
                                        )
                                    })
                                }
                                <hr className="w-full h-px bg-[var(--border-color-secondary)] border-0 m-0 my-3 " />
                            </div>
                        </div>

                        {/* aside */}
                        <aside className="w-full max-md:hidden md:max-w-xs xl:max-w-full xl:w-1/4 md:pl-5 mt-5 md:mt-0">
                            <ChatBox room={movie.id} />
                        </aside>
                    </div>

                    <div className='flex flex-wrap max-w-screen-2xl mx-auto 2xl:mt-4 2xl:gap-10'>
                        <CommentDetail movie={movie} />
                        <div className='w-full max-md:hidden md:max-w-xs xl:max-w-full xl:w-1/4 md:pl-5 mt-5 md:mt-0'>
                            {/* Holding this place for future impl (probably ads or recommendation list...) */}
                            <div className='placeholder w-full h-full border-1'></div>
                        </div>
                    </div>

                </main>
            </div>
        </>
    )
}