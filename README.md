# IDS Fintech Products & Clients Portal

## Project Overview

The IDS Fintech Products & Clients Portal is an internal web application developed to centralize information about IDS Fintech products, clients, deployments, environments, and team members.

The main purpose of the project is to provide employees with one place where they can quickly find important information instead of depending on scattered files or personal knowledge.

The system allows authorized employees to manage products, clients, deployments, team members, repositories, documents, and other related information.

## Main Objectives

The project was developed to:

* Centralize product and client information
* Keep track of products used by each client
* Track product versions and deployments
* Manage deployment environments
* Manage team members and their responsibilities
* Store repository and documentation links
* Provide search and filtering
* Provide a simple dashboard with an overview of the system
* Use authentication and role-based access control

## Technologies Used

### Backend

* C#
* .NET 10 Web API
* Dapper
* SQL Server
* JWT Authentication

### Frontend

* React
* TypeScript
* CSS

### Development Tools

* Visual Studio
* Visual Studio Code
* SQL Server
* Postman
* Git and GitHub

## System Architecture

The project uses a simple architecture:

```text
React + TypeScript
       |
       | REST API
       |
.NET 10 Web API
       |
       | Dapper
       |
   SQL Server
```

The frontend communicates with the backend through REST API endpoints.

The backend contains the business logic and communicates with SQL Server using Dapper.

## Authentication and Authorization

The application uses JWT authentication.

There are two roles.

### User

A normal authorized IDS Fintech employee can:

* Login and logout
* View the dashboard
* Manage products
* Manage clients
* Manage deployments
* Manage environments
* Manage team members
* Manage product responsibilities
* Manage repositories
* Manage documents
* Search and filter information

### Admin

An Admin is also an authorized IDS Fintech employee but has additional permissions.

Admins can do everything a normal User can do, plus:

* Manage users
* Create and update users
* Assign user roles
* Activate or deactivate users
* Delete users
* Manage departments

There is no public registration page. User accounts are managed by an Admin.

## Main Features

### Dashboard

The dashboard provides a simple overview of the system, including:

* Total products
* Total active products
* Total clients
* Total deployments
* Total team members
* Recently added or updated products

It also provides quick access to the main parts of the application.

### Admin Dashboard

The Admin Dashboard provides administrative information and quick access to:

* User Management
* Department Management
* Other main system sections

### Product Management

Users can:

* Add products
* View products
* Edit products
* Delete products
* Search and filter products

Products contain information such as:

* Name
* Description
* Business Purpose
* Lifecycle Status
* Current Version
* Supported Markets
* Criticality
* Technologies
* Notes

Product statuses include:

* Active
* Maintenance
* Planned
* Deprecated

### Product Modules

Each product can have multiple modules.

Users can:

* Add modules
* Edit modules
* Delete modules
* View modules belonging to a product

### Client Management

Users can manage client companies.

Client information includes:

* Company Name
* Country
* Contact Information
* Status
* Notes

A client can use one or more products.

### Deployments

Deployments connect products with clients.

A deployment contains information such as:

* Client
* Product
* Product Version
* Enabled Modules
* Go-Live Date
* Deployment Status
* Support Tier
* Client-Specific Notes

A client can have multiple deployments.

### Environments

Each deployment can have multiple environments, such as:

* Development
* Testing
* UAT
* Production

Environment information includes:

* Environment Name
* Environment Type
* Purpose
* Server Name
* Operating System
* Application URL
* Database Information
* Monitoring Link
* Access Instructions or Reference
* Notes

The application does not store passwords, private keys, API tokens, or other sensitive credentials.

### Team Members

The system allows users to manage team members.

Team member information includes:

* Full Name
* Job Title
* Department
* Email
* Status

### Product Responsibilities

Products can have multiple responsible team members.

Responsibilities include:

* Product
* Team Member
* Responsibility or Role
* Description

### Repositories

Repositories can be associated with products.

Repository information includes:

* Name
* GitHub URL
* Main Branch
* Description

The application only stores repository information and links. It does not automatically synchronize with GitHub.

### Documents

Documents can be associated with products.

Document information includes:

* Document Name
* Document Type
* Product
* Description
* URL or File Reference
* Last Updated Date

Examples of document types include:

* Technical Documentation
* Functional Documentation
* Deployment Guide
* Architecture Diagram
* Postman Collection
* API Documentation
* Release Notes
* User Guide

### User Management

User Management is available only to Admins.

Admins can:

* Create users
* Edit users
* Change roles
* Activate or deactivate users
* Delete users
* Search users

Passwords are handled using password hashing in the backend.

### Department Management

Departments are supporting data used for team members.

Only Admins can manage departments.

## Search and Filtering

The application provides simple search and filtering.

### Products

Users can search or filter by:

* Name
* Technology
* Status

### Clients

Users can search or filter by:

* Company Name
* Country
* Product

### Deployments

Users can filter by:

* Product
* Client
* Version
* Environment
* Status

## Project Structure

### Backend

The backend is organized into different layers.

```text
backend
    Controllers
    Models
    Repositories
    Services
    Data
    wwwroot
```

* Controllers handle API requests
* Services contain business logic
* Repositories handle database operations
* Models represent the application's data
* Data contains database connection related code
* wwwroot contains files used by the application

### Frontend

The frontend is organized into pages, components, services, and types.

```text
frontend
    ProductClientPortalFrontend
        src
            components
            pages
            services
            types
            App.tsx
```

* Pages contain the main application screens
* Components contain reusable UI elements
* Services communicate with the backend API
* Types contain TypeScript models and types
* App.tsx contains the application's routes

## Main Pages

The application contains the following main pages:

* Login
* Dashboard
* Admin Dashboard
* Products
* Product Details
* Product Create and Edit
* Clients
* Client Details
* Client Create and Edit
* Deployments
* Deployment Details
* Deployment Create and Edit
* Team Members
* User Management
* Departments

Supporting information such as modules, repositories, documents, responsibilities, and environments is managed through the related pages.

## Database

The application uses SQL Server as its database.

The main entities include:

* Users
* Products
* Modules
* Clients
* Deployments
* Environments
* Team Members
* Departments
* Product Responsibilities
* Repositories
* Documents

The main relationships are:

```text
Product
    |
    +-- Modules
    +-- Deployments
    +-- Product Responsibilities
    +-- Repositories
    +-- Documents

Client
    |
    +-- Deployments
            |
            +-- Environments

Team Member
    |
    +-- Department
    +-- Product Responsibilities
```

## Running the Project

### Backend

Open the backend project and make sure the SQL Server connection string is configured correctly.

Then run the API using Visual Studio or the .NET CLI.

```bash
cd backend/backend
dotnet run
```

The API will start on the configured local URL.

### Frontend

Open a terminal in the frontend directory.

```bash
cd frontend/ProductClientPortalFrontend
```

Install the required packages.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open the local URL shown by Vite in the browser.

## Using the Application

1. Start the backend.
2. Start the frontend.
3. Open the application in the browser.
4. Login using an existing account.
5. Use the dashboard to access the different sections.
6. Admin users can access the Admin Dashboard, User Management, and Departments.

There is no public signup system. Accounts are created and managed internally.

## Testing

The application was tested during development.

Testing included:

* Login testing
* Role and authorization testing
* CRUD operations
* Product management
* Client management
* Deployment management
* Environment management
* Team member management
* Module management
* Repository management
* Document management
* Product responsibility management
* User management
* Department management
* Search and filtering
* Delete confirmations
* Form validation
* Loading and error states
* Navigation between pages

Several bugs were found during testing and fixed before the final version, including issues related to module editing and department deletion.

## Project Scope

The project focuses on providing a simple and complete internal portal.

The following were intentionally kept outside the project scope:

* AI-powered search
* AI-generated documentation
* Financial dashboards
* Advanced analytics
* Approval workflows
* Advanced notifications
* Automatic GitHub synchronization
* Storage of passwords, API tokens, private keys, or other secrets

The priority was to create a stable and usable application rather than adding unnecessary advanced features.

## Project Objective

This project was developed as part of an internship to practice and apply the following concepts:

* Database design
* SQL Server
* REST APIs
* C# and .NET
* Dapper
* Repository pattern
* Service layer
* JWT authentication
* Role-based authorization
* React
* TypeScript
* API integration
* CRUD operations
* Search and filtering
* Git and GitHub
* Testing and debugging

The final goal was to build a small but complete full-stack application that can be used as a central source of information for IDS Fintech products and clients.
