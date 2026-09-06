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

import UserManagement from "./pages/UserManagement";

import Departments from "./pages/Departments";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<MainLayout />}>

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
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:id"
                        element={
                            <ProtectedRoute>
                                <ProductDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/new"
                        element={
                            <ProtectedRoute>
                                <ProductForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:id/edit"
                        element={
                            <ProtectedRoute>
                                <ProductForm />
                            </ProtectedRoute>
                        }
                    />

                   
                    <Route
                        path="/products/:productId/modules/new"
                        element={
                            <ProtectedRoute>
                                <ModuleForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:productId/modules/:id/edit"
                        element={
                            <ProtectedRoute>
                                <ModuleForm />
                            </ProtectedRoute>
                        }
                    />

                    
                    <Route
                        path="/products/:productId/repository/new"
                        element={
                            <ProtectedRoute>
                                <RepositoryForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:productId/repository/:id/edit"
                        element={
                            <ProtectedRoute>
                                <RepositoryForm />
                            </ProtectedRoute>
                        }
                    />

                   
                    <Route
                        path="/products/:productId/documents/new"
                        element={
                            <ProtectedRoute>
                                <DocumentForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products/:productId/documents/:id/edit"
                        element={
                            <ProtectedRoute>
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
        <ProtectedRoute>
            <TeamMembers />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/new"
    element={
        <ProtectedRoute>
            <TeamMemberForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id/edit"
    element={
        <ProtectedRoute>
            <TeamMemberForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id"
    element={
        <ProtectedRoute>
            <TeamMemberDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id/responsibilities/new"
    element={
        <ProtectedRoute>
            <ProductResponsibilityForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/team-members/:id/responsibilities/:responsibilityId/edit"
    element={
        <ProtectedRoute>
            <ProductResponsibilityForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/deployments"
    element={
        <ProtectedRoute>
            <Deployments />
        </ProtectedRoute>
    }
/>

<Route
    path="/deployments/new"
    element={
        <ProtectedRoute>
            <DeploymentForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/deployments/:id/edit"
    element={
        <ProtectedRoute>
            <DeploymentForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/deployments/:id"
    element={
        <ProtectedRoute>
            <DeploymentDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/deployments/:id/environments/new"
    element={
        <ProtectedRoute>
            <DeploymentEnvironmentForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/deployments/:id/environments/:environmentId/edit"
    element={
        <ProtectedRoute>
            <DeploymentEnvironmentForm />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/users"
    element={
        <ProtectedRoute role="Admin">
            <UserManagement />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/departments"
    element={
        <ProtectedRoute role="Admin">
            <Departments />
        </ProtectedRoute>
    }
/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

