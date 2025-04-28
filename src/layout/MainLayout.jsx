import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import "./MainLayout.scss";

function MainLayout() {
  const [showNavbar, setShowNavbar ] = useState(false)
  return (
    <div className="main-layout">
      <Sidebar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;