import { Inter, Jost } from "next/font/google";
import MainHeader from "@/components/header/MainHeader";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import "./globals.css";
import Providers from "./Providers";

const inter = Inter({ 
  variable: "--font-inter",
  subsets: ["latin"],
});

const jost = Jost({ 
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300"]
});

export const metadata = {
  title: "ZTI projekt",
  description: "Projekt na ZTI - Aleksandra Sliwska",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jost.variable}`}>
        <Providers>
          <MainHeader/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
