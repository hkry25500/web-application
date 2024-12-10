import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const uid = req.nextUrl.pathname.split('/').pop();

    try
    {
        if (uid)
        {
            const users = await db.select().from(usersTable).where(eq(usersTable.uid, parseInt(uid)));

            return NextResponse.json(users[0]);
        }
        else
            throw new Error('ERROR');
    }
    catch (error)
    {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}