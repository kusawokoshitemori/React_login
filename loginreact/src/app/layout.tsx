import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="w-full">
        <div className="min-w-[320px] w-full flex justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
