import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

function Layout({ children }) {
  return (
    <div className="min-w-full min-h-screen h-screen overflow-hidden">
      <TopBar />
      <SideBar />
      <main className="pl-64 pt-16">{children}</main>
    </div>
  );
}

export default Layout;
