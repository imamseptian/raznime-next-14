import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import Footer from "@/components/layout/footer";
import MotionLayoutGroup from '@/components/framer/motion-layout-group';
import { Toaster } from "@/components/ui/sonner";
import { buildMetadata } from '@/lib/services/metadata-service';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = buildMetadata({});

/**
 * Renders the root layout of the application.
 *
 * @param children - The children to be rendered.
 * @param modal - @modal paralel route, check @modal folder for more detail
 */
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ inter.className }>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="w-full min-h-screen">
            <MotionLayoutGroup>
              { children }
              { modal }
              <Toaster />
            </MotionLayoutGroup>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
