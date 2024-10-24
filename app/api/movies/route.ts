// app/api/movies/route.ts

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import hosts from '@/shared/hosts.json'


export async function GET(_request: NextRequest)
{
    try
    {
        const response = await axios.get(`${hosts.protocal}://${hosts.address}:${hosts.port}/static/movies`);
        return NextResponse.json(response.data, { status: 200 });
    }
    catch
    {
        return NextResponse.json({  }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { title, year } = await request.json();
    return NextResponse.json({ message: `Movie ${title} created.` });
}