"use client";

import "../styles/globals.css";
import FontLoader from "@/components/layout/FontLoader";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Login from "@/login/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      console.log("token ", token);
      
      if (token && token !== "") {
        setIsAuthenticated(true);
        router.push("/pages/administrator");
      } else {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <FontLoader />
          {
            isAuthenticated ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Header />
                  <div className="flex-1 p-6 bg-gray-100">{children}</div>
                </div>
              </div>
            ) : (
              <Login />
            )
          }
        </Provider>
      </body>
    </html>
  );
}
