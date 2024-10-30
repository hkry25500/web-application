import pool from "@/shared/pool";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const uid = req.nextUrl.pathname.split('/').pop();

    try
    {
        const query = `SELECT * FROM users WHERE uid = $1::text`;
        const res = await pool.query(query, [uid]);

        return NextResponse.json(res.rows[0]);
    }
    catch (error)
    {
        
    }

    return NextResponse.json({});
}