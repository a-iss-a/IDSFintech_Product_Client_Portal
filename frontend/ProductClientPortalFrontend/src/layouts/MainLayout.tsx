import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import AdminSidebar from "../components/AdminSidebar";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./MainLayout.css";

const MainLayout =()=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-layout">
            <Header onMenuClick={toggleSidebar} />

            <div className="layout-body">
                {user?.role === "Admin" ? (
                  <AdminSidebar isOpen={isSidebarOpen} />
                 ) : (
                 <UserSidebar isOpen={isSidebarOpen} />
                 )}

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;