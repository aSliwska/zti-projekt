import { Inter, Jost } from "next/font/google";
import { createTheme, MantineProvider } from '@mantine/core';
import MainHeader from "@/components/header/MainHeader";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import "./globals.css";
import { Provider } from "jotai";

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

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'green',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jost.variable}`}>
        <MantineProvider theme={theme}>
          <Provider>
            <MainHeader/>
            {children}
          </Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
