import pool from "@/shared/pool";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const email = req.nextUrl.pathname.split('/').pop();

    try
    {
        const query = `SELECT * FROM users WHERE email = $1::text`;
        const res = await pool.query(query, [email]);

        return NextResponse.json(res.rows[0]);
    }
    catch
    {
        console.error('Database did not respond.')
    }
}