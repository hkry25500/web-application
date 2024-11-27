import { db } from "@/lib/db";
import { commentsTable } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest)
{
    const { movieId, userId, content } = await req.json();

    await db.insert(commentsTable).values({
        movieId,
        userId,
        content
    })

    return NextResponse.json({ success: true });
}