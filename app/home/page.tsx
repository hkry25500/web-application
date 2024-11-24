import axios from 'axios';
import './styles.scss';
import Hero from './hero';
import ToppicksDetail from './toppicks';


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

            <ToppicksDetail movies={movies} />

        </div>
    )
}