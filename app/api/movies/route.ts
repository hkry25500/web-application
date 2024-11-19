// app/api/movies/route.ts

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(_request: NextRequest)
{
    try
    {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_CONTENT_URL}/movies`);

        return NextResponse.json(response.data, { status: 200 });
    }
    catch
    {
        return NextResponse.json({  }, { status: 500 });
    }
}