import type { Metadata } from "next";
import { Providers } from "./providers";
import { WEBAPP_COMPANY, WEBAPP_TITLE } from '@/shared/constants';
import "./globals.css";


export const metadata: Metadata = {
    title: {
        template: `%s - ${WEBAPP_TITLE}`,
        default: WEBAPP_TITLE
    },
    description: `Powered by ${WEBAPP_COMPANY}`,
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>)
{

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className={`antialiased`}>
                <div className="app">
                    <Providers>
                        { children }
                    </Providers>
                </div>
            </body>
        </html>
    );
}
