import './styles.scss'
import { Rate } from 'antd';


async function fetchMovies()
{
    try
    {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/movies');
        const movies = await response.json();

        return movies;
    }
    catch
    {
        console.error('Error fetching movies.')
    }
}

export default async function Homepage()
{
    const movies: any[] = await fetchMovies();

    return (
        <div className='w-full min-h-100-70'>

            <h2 className='subheader'>Most Popular Movies</h2>

            <div className="wrapper">
                {
                    movies?.map(movie => {
                        return (
                            <div className="card">
                                <div className="poster">
                                <img
                                    src={`${movie.poster.url}`}
                                    alt="Location Unknown"
                                />
                                </div>
                                <div className="details">
                                <h1>{ (movie.name.length>19)?`${movie.name.substring(0,16)}...`:movie.name }</h1>
                                <h2>2021 • R • 1hr 41min</h2>
                                <div className="rating">
                                    <Rate defaultValue={5} disabled />
                                    <span>4.7/5</span>
                                </div>
                                <div className="tags">
                                    <span className="tag yellow">Teen</span>
                                    <span className="tag">Comedy</span>
                                    <span className="tag blue">Drama</span>
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
    )
}