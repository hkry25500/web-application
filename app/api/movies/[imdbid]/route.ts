import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const imdbid = req.nextUrl.pathname.split('/').pop();

    try
    {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_CONTENT_URL}/movie/${imdbid}`);

        return NextResponse.json(response.data, { status: 200 });
    }
    catch (error)
    {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}