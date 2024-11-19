import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) =>
{
    const uid = req.nextUrl.pathname.split('/').pop();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;

    if (file && uid)
    {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64String = buffer.toString('base64');

        try
        {
            await db.update(usersTable).set({ avatar: base64String }).where(eq(usersTable.uid, parseInt(uid)))
        }
        catch(err)
        {
            return NextResponse.json({
                success: false,
                reason: err,
            });
        }

        return NextResponse.json({
            success: true,
        });
    }
    else
    {
        return NextResponse.json({
            success: false,
        });
    }
};