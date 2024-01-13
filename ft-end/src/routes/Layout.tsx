import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserContextProvider from "../context/UserContext";
export default function Layout() {
  return (
    <>
      <UserContextProvider>
        <Header />
        <Outlet />
      </UserContextProvider>
    </>
  );
}
