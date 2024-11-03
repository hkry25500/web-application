import { db } from '@/lib/db';
import { usersTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server";


export async function GET(_req: NextRequest)
{
    try
    {
        const users = await db.select().from(usersTable);

        return NextResponse.json(users);
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
        const users_email_result = await db.select().from(usersTable).where(eq(usersTable.email, email));

        users_email_result.map(row =>
        {
            if (row.email === email)
            {
                throw new Error('Email already saved in DB');
            }
        });

        await db.insert(usersTable).values({
            email: email,
            name: username,
            password: password,
        })

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