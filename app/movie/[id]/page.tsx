import ChatBox from '@/app/components/chat';
import Player from './player';
import CommentDetail from './comment';


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

                    <div className="flex flex-wrap 2xl:gap-10 mx-auto 2xl:mt-10 max-w-screen-2xl">
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
                                    <h1 className="text-xl text-[var(--text-color-primary)] font-semibold shrink-0 my-2">{ movie.title }</h1>
                                    <span className='text-sm text-[var(--text-color-secondary)]'>{ movie.description }</span>
                                </div>
                                {
                                    movie.interests.map((interest: string) => {
                                        return (
                                            <span key={interest} className="text-sm text-[var(--text-color-primary)] mr-4">{ interest }</span>
                                        )
                                    })
                                }
                                <hr className="w-full h-px bg-[var(--border-color-secondary)] border-0 m-0 my-3 " />
                            </div>
                        </div>

                        {/* aside */}
                        <aside className="w-full md:max-w-xs xl:max-w-full xl:w-1/4 md:pl-5 mt-5 md:mt-0">
                            <ChatBox />
                        </aside>
                    </div>

                    <CommentDetail />

                </main>
            </div>
        </>
    )
}