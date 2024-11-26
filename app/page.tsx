"use client";
import { store } from "@/redux/store";
import { Provider, useSelector } from "react-redux";
import Login from "./pages/login/page";
import { selectIsAuthenticated } from "@/redux/selectors/auth";
import Header from "@/components/layout/Header"; 
import Sidebar from "@/components/layout/Sidebar";

export default function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Auth>{children}</Auth>
    </Provider>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-6 bg-gray-100">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
