import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";

import Clients from "./pages/Clients";
import ClientDetails from "./pages/ClientDetails";
import ClientForm from "./pages/ClientForm";

import ModuleForm from "./pages/ModuleForm";
import RepositoryForm from "./pages/RepositoryForm";
import DocumentForm from "./pages/DocumentForm";

import TeamMembers from "./pages/TeamMembers";
import TeamMemberForm from "./pages/TeamMemberForm";
import TeamMemberDetails from "./pages/TeamMemberDetails";
import ProductResponsibilityForm from "./pages/ProductResponsibilityForm";

import Deployments from "./pages/Deployments";
import DeploymentForm from "./pages/DeploymentForm";
import DeploymentDetails from "./pages/DeploymentDetails";
import DeploymentEnvironmentForm from "./pages/DeploymentEnvironmentForm";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<MainLayout />}>

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute role="User">
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute role="Admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                  
                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute role="User">
                                <Products />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:id"
                        element={
                            <ProtectedRoute role="User">
                                <ProductDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/new"
                        element={
                            <ProtectedRoute role="User">
                                <ProductForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:id/edit"
                        element={
                            <ProtectedRoute role="User">
                                <ProductForm />
                            </ProtectedRoute>
                        }
                    />

                   
                    <Route
                        path="/products/:productId/modules/new"
                        element={
                            <ProtectedRoute role="User">
                                <ModuleForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:productId/modules/:id/edit"
                        element={
                            <ProtectedRoute role="User">
                                <ModuleForm />
                            </ProtectedRoute>
                        }
                    />

                    
                    <Route
                        path="/products/:productId/repository/new"
                        element={
                            <ProtectedRoute role="User">
                                <RepositoryForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:productId/repository/:id/edit"
                        element={
                            <ProtectedRoute role="User">
                                <RepositoryForm />
                            </ProtectedRoute>
                        }
                    />

                   
                    <Route
                        path="/products/:productId/documents/new"
                        element={
                            <ProtectedRoute role="User">
                                <DocumentForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:productId/documents/:id/edit"
                        element={
                            <ProtectedRoute role="User">
                                <DocumentForm />
                            </ProtectedRoute>
                        }
                    />

                  
                    <Route
                        path="/clients"
                        element={
                            <ProtectedRoute>
                                <Clients />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/clients/:id"
                        element={
                            <ProtectedRoute>
                                <ClientDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/clients/new"
                        element={
                            <ProtectedRoute>
                                <ClientForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/clients/:id/edit"
                        element={
                            <ProtectedRoute>
                                <ClientForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
    path="/team-members"
    element={
        <ProtectedRoute role="User">
            <TeamMembers />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/new"
    element={
        <ProtectedRoute role="User">
            <TeamMemberForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id/edit"
    element={
        <ProtectedRoute role="User">
            <TeamMemberForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id"
    element={
        <ProtectedRoute role="User">
            <TeamMemberDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id/responsibilities/new"
    element={
        <ProtectedRoute role="User">
            <ProductResponsibilityForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id/responsibilities/:responsibilityId/edit"
    element={
        <ProtectedRoute role="User">
            <ProductResponsibilityForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/deployments"
    element={<Deployments />}
/>

<Route
    path="/deployments/new"
    element={<DeploymentForm />}
/>

<Route
    path="/deployments/:id/edit"
    element={<DeploymentForm />}
/>

<Route
    path="/deployments/:id"
    element={<DeploymentDetails />}
/>

<Route
    path="/deployments/:id/environments/new"
    element={<DeploymentEnvironmentForm />}
/>

<Route
    path="/deployments/:id/environments/:environmentId/edit"
    element={<DeploymentEnvironmentForm />}
/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

