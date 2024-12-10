import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(_request: NextRequest, { params }: {
    params: any
})
{
    const trending_range = parseInt(params.range) || 10;

    try
    {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_CONTENT_URL}/movies`);
        const movies: any[] = response.data;
        movies.sort((a, b) => b - a);
        movies.slice(0, trending_range);

        return NextResponse.json(movies, { status: 200 });
    }
    catch
    {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}