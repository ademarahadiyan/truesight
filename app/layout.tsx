// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "SmartInov - Landing Page",
  description: "SmartInov Deepfake & OSINT Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 min-h-screen text-slate-900">
        {children}
      </body>
    </html>
  );
}
