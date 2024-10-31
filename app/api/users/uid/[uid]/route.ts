import pool from "@/shared/pool";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const uid = req.nextUrl.pathname.split('/').pop();

    try
    {
        const query = `SELECT * FROM users WHERE uid = ${uid}`;
        const [rows] = await pool.query<RowDataPacket[]>(query, [uid]);

        return NextResponse.json(rows[0]);
    }
    catch (error)
    {
        return NextResponse.json({ success: false });
    }
}