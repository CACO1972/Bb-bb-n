import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Clínica Miró - Odontología con Inteligencia Artificial",
  description: "Primera clínica dental en Chile con asesor IA. Evaluación, agendamiento y atención 24/7.",
  keywords: ["clínica dental", "implantes dentales", "odontología", "inteligencia artificial", "Chile", "Santiago"],
  authors: [{ name: "Clínica Miró" }],
  openGraph: {
    title: "Clínica Miró - Odontología con Inteligencia Artificial",
    description: "Primera clínica dental en Chile con asesor IA. Evaluación, agendamiento y atención 24/7.",
    url: "https://clinicamiro.cl",
    siteName: "Clínica Miró",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Clínica Miró - Odontología con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Miró - Odontología con Inteligencia Artificial",
    description: "Primera clínica dental en Chile con asesor IA. Evaluación, agendamiento y atención 24/7.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
