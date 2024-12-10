import { db } from "@/lib/db";
import { commentsTable, usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_req: NextRequest, { params }: any)
{
    const id = params.id;

    const rows = await db.select()
                        .from(commentsTable)
                        .leftJoin(usersTable, eq(usersTable.uid, commentsTable.userId))
                        .where(eq(commentsTable.movieId, id));

    const comments = rows.map(row => {
        return { ...row.users, ...row.comments }
    })

    return NextResponse.json(comments);
}