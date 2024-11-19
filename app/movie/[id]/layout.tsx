import axios from "axios";
import MoviePage from "./page";


const fetchMovie = async (id: string): Promise<any> =>
{
    try
    {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`);
        return response.data;
    }
    catch
    {
        console.error('Movie did not exist.');
        return null;
    }
}

export async function generateMetadata({ params }: any)
{
    const movie = await fetchMovie(params.id);

    return {
        title: movie ? movie.title : "Movie not found"
    }
}

export default async function MovieLayout({ params }: any)
{
    const movie = await fetchMovie(params.id);

    if (movie) {
        return (
            <>
                <MoviePage movie={movie} />
            </>
        )
    }
    else
        return <></>
}