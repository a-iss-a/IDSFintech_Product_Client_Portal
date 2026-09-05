import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <Navbar className="header">
            <Container fluid className="header-container">

                <div className="header-left">

                    <Button
                        className="menu-button"
                        onClick={onMenuClick}
                    >
                        ☰
                    </Button>

                    <img
                        src={logo}
                        alt="IDS Fintech"
                        className="header-logo"
                    />

                    <Navbar.Brand className="header-brand">
                        IDS Fintech Portal
                    </Navbar.Brand>

                </div>

                <div className="header-user">

                    <span className="header-username">
                        {user?.email ?? "User"}
                    </span>

                    <Button
                        className="logout-button"
                        onClick={logoutUser}
                    >
                        Logout
                    </Button>

                </div>

            </Container>
        </Navbar>
    );
};

export default Header;