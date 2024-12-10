import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const email = req.nextUrl.pathname.split('/').pop();

    try
    {
        if (email)
        {
            const users = await db.select().from(usersTable).where(eq(usersTable.email, email))

            return NextResponse.json(users[0]);
        }
        else
            throw new Error('ERROR');
    }
    catch
    {
        return NextResponse.json({ success: false }, { status: 500 })
    }
}