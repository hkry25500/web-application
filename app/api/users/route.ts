import pool from "@/shared/pool";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from 'uuid';


export async function GET(_req: NextRequest)
{
    try
    {
        const query = `SELECT * FROM users`;
        const [rows] = await pool.query<RowDataPacket[]>(query);

        return NextResponse.json(rows);
    }
    catch
    {
        return NextResponse.json({ success: false });
    }
}

export async function POST(req: NextRequest)
{
    const { email, username, password } = await req.json();

    try
    {
        const [users_email_result] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE email='${email}'`);

        users_email_result.map(row =>
        {
            if (row.email === email)
            {
                throw new Error('Email already saved in DB');
            }
        });

        await pool.query(`INSERT INTO users(email, name, password) VALUES('${email}', '${username}', '${password}')`);

        return NextResponse.json({ success: true });
    }
    catch(error)
    {
        return NextResponse.json({ success: false, reason: error });
    }
}

export async function PUT(req: NextRequest)
{
        
}