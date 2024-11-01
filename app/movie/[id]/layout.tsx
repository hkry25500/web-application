import axios from "axios";
import MoviePage from "./page";


const fetchMovie = async (id: string): Promise<any> =>
{
    try
    {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`);
        const movies: any[] = response.data;
        const movie = movies.find(movie => movie.id === id);
    
        if (movie) {
            return movie;
        } else {
            throw new Error('Movie not found');
        }
    }
    catch (error)
    {
        console.error('Movie did not exist.', error);
        throw error;
    }
}

export async function generateMetadata({ params }: any)
{
    const movie = await fetchMovie(params.id);

    return {
        title: `${movie.name} - Daily Movie`
    }
}

export default async function MovieLayout({ params }: Readonly<{ params: any }>)
{
    const movie = await fetchMovie(params.id);

    return (
        <>
            <MoviePage movie={movie} />
        </>
    )
}