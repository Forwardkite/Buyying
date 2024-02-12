"use client";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.scss";
// import useAuth from "@/utils/authUser";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Buyyinn",
  description: "Buy n Win exciting prizes.",
};

export default function RootLayout({ children }) {
  // useEffect(() => {
  //   useAuth(); // Apply the authentication logic
  // }, []); // Run only once when the component mounts

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
