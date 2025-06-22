// src/layout/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

const MainLayout = ({ isSidebar, setIsSidebar }) => {
    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Outlet /> {/* Hiển thị component con (Route con) */}
            </main>
        </div>
    );
};

export default MainLayout;
