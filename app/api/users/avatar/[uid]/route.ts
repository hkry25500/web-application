import pool from "@/shared/pool";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) =>
{
    const uid = req.nextUrl.pathname.split('/').pop();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;

    if (file)
    {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64String = buffer.toString('base64');

        try
        {
            await pool.query(`UPDATE users SET avatar = '${base64String}' WHERE uid=${uid}`);
        }
        catch
        {
            return NextResponse.json({
                success: false,
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