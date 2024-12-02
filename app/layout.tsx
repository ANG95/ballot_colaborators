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
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    const rol_id = parseInt(window.localStorage.getItem("rol_id") || "0");

    if (token) {
      setIsAuthenticated(true);
      if (rol_id === 1) {
        router.push("/pages/administrator");
      } else if (rol_id === 2) {
        router.push("/pages/profile");
      } else {
        router.push("/");
      } 
    }
  }, [router]);

  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
        <body>
        <ToastContainer />
          <Provider store={store}>
            <FontLoader />
            {isAuthenticated ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Header />
                  <div className="flex-1 p-3 bg-gray-100">{children}</div>
                </div>
              </div>
            ) : (
              <Login />
            )}
          </Provider>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
