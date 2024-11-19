import axios from 'axios';
import './styles.scss'
import { Rate } from 'antd';
import Hero from './hero';


async function fetchTrendingMovies()
{
    try
    {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL+'/api/movies/trending/5');

        return await response.data;
    }
    catch
    {
        console.error('Error fetching movies.')
        return [];
    }
}

export default async function Homepage()
{
    const movies: any[] = await fetchTrendingMovies();

    return (
        <div className='w-full min-h-100-70 bg-black'>

            <Hero trending={movies} />

            <div className='w-full min-h-60 mt-32'>
                <div className='pl-10 my-4'>
                    <h2 className='section-text text-white text-2xl font-semibold pl-4'>Top picks</h2>
                </div>
                <div className="wrapper">
                    {
                        movies?.map(movie => {
                            return (
                                <div className="card" key={movie.id}>
                                    <div className="poster">
                                    <img
                                        src={`${movie.poster.url}`}
                                        alt="Poster"
                                    />
                                    </div>
                                    <div className="details">
                                    <h1>{ (movie.title.length>19)?`${movie.title.substring(0,16)}...`:movie.title }</h1>
                                    <h2>2021 • R • 1hr 41min</h2>
                                    <div className="rating">
                                        <Rate defaultValue={movie.rating/2} disabled />
                                        <span>{movie.rating/2}/5</span>
                                    </div>
                                    <div className="tags">
                                        {
                                            movie.interests.map((interest: string) => <span className='tag' key={interest}>{interest}</span>)
                                        }
                                    </div>
                                    <p className="desc">
                                        { (movie.description.length>64)?`${movie.description.substring(0,61)}...`:movie.description }
                                    </p>
                                    <div className="cast">
                                        <h3>Cast</h3>
                                        <ul>
                                            <li>
                                                <img
                                                src="https://i.postimg.cc/xd3twv4B/cast-31.jpg"
                                                alt="Jessica Enduro"
                                                title="Jessica Enduro"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}