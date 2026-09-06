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
                <Link to="/clients">Clients</Link>
                <Link to="/clients/new">Add New Client</Link>
                <Link to="/products">Products</Link>
                <Link to="/products/new">Add New Product</Link>
                <Link to="/team-members">Team Members</Link>
                <Link to="/deployments">Deployments</Link>
                <Link to="/admin/departments">Departments</Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;