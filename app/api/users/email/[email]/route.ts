import pool from "@/shared/pool";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const email = req.nextUrl.pathname.split('/').pop();

    try
    {
        const query = `SELECT * FROM users WHERE email = '${email}'`;
        const [rows] = await pool.query<RowDataPacket[]>(query);
    
        return NextResponse.json(rows[0]);
    }
    catch
    {
        return NextResponse.json({ success: false })
    }
}