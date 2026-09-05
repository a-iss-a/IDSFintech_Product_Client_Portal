import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const authUser = await login(email, password);

            if (authUser.role === "Admin")
                navigate("/admin/dashboard");
            else
                navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-logo-container">
                    <img
                        src={logo}
                        alt="IDS Fintech"
                        className="login-logo"
                    />
                </div>

                <h1 className="login-title">
                    IDS Fintech Portal
                </h1>

                <p className="login-subtitle">
                    Sign in to your account
                </p>

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >
                    <div className="login-field">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;