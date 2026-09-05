import { Link } from "react-router-dom";
import "./Sidebar.css";


interface UserSidebarProps {
    isOpen: boolean;
}

const UserSidebar = ({ isOpen }: UserSidebarProps) => {
    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/clients">Clients</Link>
                <Link to="/clients/new">Add New Client</Link>
                <Link to="/products">Products</Link>
                <Link to="/products/new">Add New Product</Link>
                <Link to="/team-members">Team Members</Link>
                <Link to="/deployments">Deployments</Link>
            </nav>
        </aside>
    );
};

export default UserSidebar;