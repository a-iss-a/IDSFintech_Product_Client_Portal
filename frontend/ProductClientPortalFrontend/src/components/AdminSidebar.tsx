import { Link } from "react-router-dom";
import "./Sidebar.css";


interface AdminSidebarProps {
    isOpen: boolean;
}

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <nav>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/clients">Clients</Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;