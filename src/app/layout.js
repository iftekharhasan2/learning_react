import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Iftekhar Hasan",
  description: "Generated by Ifty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} `}
      >
        
        <Header />
        {children}
        <footer className="text-center p-4 bg-gray-800 text-white ">
          <p>&copy; {new Date().getFullYear()} adnan Rahman. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
