import pool from "@/shared/pool";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from 'uuid';


export async function GET(req: NextRequest)
{
    try
    {
        const query = `SELECT * FROM users`;
        const res = await pool.query(query);
        return NextResponse.json(res.rows);
    }
    catch
    {

    }

    return NextResponse.json({});
}

export async function POST(req: NextRequest)
{
    const { email, username, password } = await req.json();

    try
    {
        const users_email_result = await pool.query(`SELECT * FROM users WHERE email=$1::text`, [email]);
        users_email_result.rows.map(row =>
        {
            if (row.email === email)
            {
                throw new Error('Email already saved in DB');
            }
        });

        const uuid = v4();
        console.log(uuid)
        await pool.query(`INSERT INTO users(uid, name, email, password) VALUES($1::text, $2::text, $3::text, $4::text)`, [uuid, username, email, password]);
    }
    catch(error)
    {
        console.error(error);
        return NextResponse.json({});
    }

    return NextResponse.json({})
}