import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const userAgent = req.headers.get('user-agent') || '';
    return NextResponse.json({
        device: getDeviceType(userAgent),
        userAgent,
    })
}

function getDeviceType(userAgent: string): DeviceType
{
    if (/(Android|X11|Linux)/i.test(userAgent)) {
        return 'mobile';
    } else if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
        return 'mobile';
    } else if (/(Windows)/i.test(userAgent)) {
        return 'destop';
    } else {
        return 'unknown';
    }
}