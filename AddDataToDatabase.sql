use phase2;

-- User
-- Test accounts were initially created through Swagger using simple test passwords.
-- The PasswordHasher<User> hashes generated from those passwords were then reused
-- to populate additional test accounts directly in the database.
-- Password values below are ASP.NET PasswordHasher<User> hashes.

insert into [User]
    (Name, Email, Password, Role, IsActive)
values
('test user', 'user@email.com', 'AQAAAAIAAYagAAAAEMbFoTjMwXxIvJQdu8UPbzy6LhMzdvqZaw3KUp8f/8DyIerLdvOExZcJBg8btWd5nQ==', 0, 1),
('7ayala', 'me@email.com', 'AQAAAAIAAYagAAAAEJKXiAAckaKtSWZkf+7F6PvO1Ch5vPXPw7wHGs4tNhRwIEy2OgzEJqDCFwZB7HwkRA==', 0, 0),
('admin', 'admin@email.com', 'AQAAAAIAAYagAAAAEC6BDIBaf8RNiud2U4/f0VMLlYIJFZCCnVEr0gCcFMlkYY//rDEHxRosFoy2cqjFgw==', 1, 1);

-- Department
insert into Department
    (Name)
values
('Beirut'),
('Nabatieh'),
('Tyre'),
('Sydon');

-- TeamMember
insert into TeamMember
    (DepartmentId, Name, JobTitle, Email, Status)
values
(1, 'Ahmad Hassan', 'Senior Software Engineer', 'ahmad.hassan@company.com', 'Active'),
(1, 'Maya Haddad', 'Software Engineer', 'maya.haddad@company.com', 'Active'),
(1, 'George Saliba', 'Backend Developer', 'george.saliba@company.com', 'Active'),
(2, 'Karim Nassar', 'DevOps Engineer', 'karim.nassar@company.com', 'Active'),
(2, 'Lina Saad', 'Cloud Engineer', 'lina.saad@company.com', 'Active'),
(2, 'Hiba Tannous', 'Systems Administrator', 'hiba.tannous@company.com', 'Active'),
(3, 'Omar Khalil', 'Cybersecurity Analyst', 'omar.khalil@company.com', 'Active'),
(3, 'Sara Mansour', 'Security Engineer', 'sara.mansour@company.com', 'Active'),
(3, 'Walid Azar', 'Security Analyst', 'walid.azar@company.com', 'On Leave'),
(5, 'Rami Daher', 'Product Manager', 'rami.daher@company.com', 'Active'),
(5, 'Nour Younes', 'Business Analyst', 'nour.younes@company.com', 'Active'),
(5, 'Fadi Khoury', 'QA Engineer', 'fadi.khoury@company.com', 'Active'),
(5, 'Lea Farah', 'QA Automation Engineer', 'lea.farah@company.com', 'Active'),
(5, 'Jad Ibrahim', 'Technical Support Engineer', 'jad.ibrahim@company.com', 'Active'),
(5, 'Tala Rizk', 'Support Specialist', 'tala.rizk@company.com', 'Inactive');

-- Product
insert into Product
    (Name, Description, BusinessPurpose, LifecycleStatus, CurrentVersion,
     SupportedMarkets, Criticality, Technologies, Notes, CreatedAt, UpdatedAt)
values
('Payment Gateway', 'Online payment processing platform.', 'Processes online payments for businesses.', 'Active', '2.4.1',
 'Global', 'Critical', '.NET, SQL Server, React', 'Core payment processing product.', '2025-01-10', '2026-02-01'),
('Digital Wallet', 'Digital wallet platform for customers.', 'Provides digital wallet and payment services.', 'Active', '3.1.2',
 'Middle East', 'High', '.NET, SQL Server, React Native', 'Supports multiple regional deployments.', '2025-01-15', '2026-02-05'),
('Fraud Detection System', 'System for detecting fraudulent transactions.', 'Identifies suspicious transactions and activities.', 'Active', '1.8.0',
 'Global', 'Critical', 'Python, .NET, SQL Server', 'Security-sensitive product.', '2025-02-01', '2026-02-10'),
('Merchant Portal', 'Portal for merchants to manage transactions.', 'Provides merchants with transaction management tools.', 'Active', '4.2.0',
 'Global', 'High', 'React, .NET, SQL Server', 'Client-facing merchant portal.', '2025-02-10', '2026-02-15'),
('Transaction Monitoring', 'Platform for monitoring financial transactions.', 'Monitors transactions and generates alerts.', 'Active', '2.0.5',
 'Global', 'Critical', '.NET, SQL Server, React', 'Used for transaction monitoring.', '2025-02-15', '2026-02-20'),
('Banking API Platform', 'API platform for banking integrations.', 'Provides APIs for banking applications.', 'Active', '1.5.3',
 'Global', 'Critical', '.NET, SQL Server', 'Supports banking integrations.', '2025-03-01', '2026-02-25'),
('Customer Management System', 'System for managing customer information.', 'Centralizes customer information and workflows.', 'Active', '1.2.4',
 'Global', 'High', '.NET, SQL Server, React', 'Used by customer management teams.', '2025-03-05', '2026-03-01'),
('Reporting Platform', 'Platform for generating business reports.', 'Provides reporting and analytics capabilities.', 'Active', '3.0.8',
 'Global', 'Medium', '.NET, SQL Server, React', 'Supports automated business reporting.', '2025-03-10', '2026-03-05'),
('Identity Verification', 'Identity verification platform.', 'Verifies customer identities.', 'Active', '2.1.0',
 'Global', 'Critical', '.NET, SQL Server, Python', 'Security-sensitive identity platform.', '2025-03-15', '2026-03-10'),
('Notification Service', 'Application notification service.', 'Sends notifications and alerts to users.', 'Active', '1.6.2',
 'Global', 'High', '.NET, SQL Server', 'Supports email and system notifications.', '2025-03-20', '2026-03-15'),
('Risk Management Platform', 'Platform for financial risk management.', 'Analyzes and manages financial risks.', 'Active', '2.3.0',
 'Global', 'Critical', '.NET, SQL Server, React', 'Supports risk assessment workflows.', '2025-03-25', '2026-03-20'),
('Mobile Banking Application', 'Mobile banking application.', 'Provides banking services through mobile devices.', 'Active', '5.1.0',
 'Global', 'Critical', '.NET, SQL Server, React Native', 'Mobile banking platform.', '2025-04-01', '2026-03-25'),
('Legacy Payment System', 'Legacy payment processing system.', 'Maintains existing payment processing operations.', 'Maintenance', '1.9.5',
 'Global', 'Critical', '.NET, SQL Server', 'Legacy system maintained for existing clients.', '2024-01-10', '2026-01-20'),
('Analytics Dashboard', 'Interactive analytics dashboard.', 'Provides business analytics and visualization.', 'Active', '2.5.0',
 'Global', 'Medium', 'React, .NET, SQL Server', 'Provides interactive dashboards.', '2025-04-10', '2026-03-30'),
('Cybersecurity Monitoring', 'Cybersecurity monitoring platform.', 'Monitors systems for security threats.', 'Active', '1.4.0',
 'Global', 'Critical', '.NET, Python, SQL Server, React', 'Security monitoring product.', '2025-04-15', '2026-04-01');

-- Client
insert into Client
    (CompanyName, Country, Email, PhoneNumber, Status, Notes)
values
('ABC Technologies', 'Lebanon', 'contact@abctech.com', '+961 1 555 201', 'Active', 'Long-term client using multiple products.'),
('Nexa Solutions', 'United Arab Emirates', 'info@nexasolutions.ae', '+971 4 555 1020', 'Active', 'Enterprise client with multiple deployments.'),
('GlobalPay Ltd', 'United Kingdom', 'contact@globalpay.co.uk', '+44 20 7946 0182', 'Active', 'Payment processing and financial services client.'),
('TechVision', 'France', 'contact@techvision.fr', '+33 1 44 55 66 77', 'Active', 'Uses analytics and reporting products.'),
('MENA Digital', 'Saudi Arabia', 'info@menadigital.sa', '+966 11 555 3344', 'Active', 'Regional client with several business units.'),
('NorthStar Finance', 'Canada', 'support@northstarfinance.ca', '+1 416 555 7812', 'Inactive', 'Previous client; deployment currently suspended.'),
('BlueWave Systems', 'Germany', 'contact@bluewavesystems.de', '+49 30 555 9012', 'Active', 'Technology-focused client.'),
('Cedar Bank', 'Lebanon', 'it@cedarbank.com', '+961 1 555 882', 'Active', 'Financial institution with strict security requirements.'),
('Atlas Consulting', 'Jordan', 'info@atlasconsulting.jo', '+962 6 555 4123', 'Active', 'Consulting company using internal management solutions.'),
('Pacific Enterprises', 'Singapore', 'contact@pacificent.sg', '+65 6555 7821', 'Pending', 'New client currently completing onboarding.'),
('Orion Telecom', 'Qatar', 'support@oriontelecom.qa', '+974 4455 1290', 'Active', 'Telecommunications client with multiple environments.'),
('Vertex Industries', 'Italy', 'info@vertexindustries.it', '+39 06 555 7812', 'Active', 'Industrial client using monitoring solutions.');

-- Deployment
insert into Deployment
    (ClientId, ProductId, ProductVersion, GoLiveDate,
     DeploymentStatus, SupportTier, ClientSpecificNotes)
values
(1, 1, '2.4.1', '2025-03-15', 'Active', 'Premium', 'Production deployment with 24/7 monitoring.'),
(1, 3, '1.8.0', '2025-06-20', 'Active', 'Standard', 'Used by the finance department.'),
(2, 2, '3.1.2', '2025-01-10', 'Active', 'Premium', 'Multiple production environments across regional offices.'),
(2, 5, '2.0.5', '2025-08-05', 'Active', 'Standard', 'Integrated with existing internal systems.'),
(3, 1, '2.4.1', '2024-11-18', 'Active', 'Premium', 'Critical financial services deployment.'),
(3, 4, '4.2.0', '2025-04-12', 'Active', 'Premium', 'Requires enhanced security monitoring.'),
(4, 6, '1.5.3', '2025-02-28', 'Active', 'Standard', 'Analytics platform deployed for management reporting.'),
(5, 2, '3.0.8', '2025-07-14', 'Active', 'Premium', 'Large-scale deployment supporting multiple business units.'),
(6, 3, '1.7.2', '2024-09-30', 'Suspended', 'Standard', 'Deployment suspended following contract expiration.'),
(7, 5, '2.0.5', '2025-05-22', 'Active', 'Standard', 'Hosted in the clients private cloud environment.'),
(8, 1, '2.3.9', '2024-12-05', 'Active', 'Premium', 'Banking environment with strict access controls.'),
(8, 7, '1.2.4', '2025-03-08', 'Active', 'Premium', 'Security-sensitive deployment.'),
(9, 4, '4.1.6', '2025-06-11', 'Active', 'Standard', 'Used internally by consulting teams.'),
(10, 2, '3.1.0', '2026-01-15', 'Pending', 'Standard', 'Deployment awaiting final client approval.'),
(11, 6, '1.6.2', '2025-10-03', 'Active', 'Premium', 'Multiple environments for testing and production.'),
(12, 3, '1.8.0', '2026-02-20', 'Active', 'Standard', 'Recently upgraded to the latest supported version.');

-- CodeRepo
insert into CodeRepo
    (ProductId, Name, GitHubURL, MainBranch, Description)
values
(1, 'Product Management Portal', 'https://github.com/company/product-management-portal', 'main',
 'Centralized portal for managing products, clients, deployments, and environments.'),
(2, 'Client Operations System', 'https://github.com/company/client-operations-system', 'main',
 'System for managing client information, deployments, and support operations.'),
(3, 'Financial Analytics Platform', 'https://github.com/company/financial-analytics', 'develop',
 'Analytics platform providing financial reporting and business intelligence tools.'),
(4, 'Security Monitoring Service', 'https://github.com/company/security-monitoring', 'main',
 'Security monitoring service for detecting and tracking suspicious system activity.'),
(5, 'Enterprise Dashboard', 'https://github.com/company/enterprise-dashboard', 'main',
 'Interactive dashboard for monitoring enterprise applications and key performance indicators.'),
(6, 'Data Reporting Engine', 'https://github.com/company/data-reporting-engine', 'develop',
 'Backend service responsible for generating automated reports from business data.'),
(7, 'Authentication Service', 'https://github.com/company/authentication-service', 'main',
 'Centralized authentication and authorization service using JWT and role-based access control.'),
(8, 'Notification Service', 'https://github.com/company/notification-service', 'main',
 'Service responsible for sending application notifications and system alerts.'),
(9, 'Document Management System', 'https://github.com/company/document-management', 'main',
 'Platform for storing, organizing, and managing technical and business documents.'),
(10, 'Deployment Manager', 'https://github.com/company/deployment-manager', 'develop',
 'Tool for managing product deployments across development, staging, and production environments.'),
(11, 'Support Management Portal', 'https://github.com/company/support-management', 'main',
 'Portal for managing client support requests, incidents, and service activities.'),
(12, 'System Monitoring Dashboard', 'https://github.com/company/system-monitoring', 'main',
 'Dashboard for monitoring application health, infrastructure status, and system performance.');

-- Module
insert into Module
    (ProductId, Name, Description, Status)
values
(1, 'User Management', 'Manages users and user access.', 'Active'),
(1, 'Product Management', 'Manages product information and lifecycle.', 'Active'),
(1, 'Client Management', 'Manages client information.', 'Active'),
(1, 'Deployment Management', 'Manages client product deployments.', 'Active'),

(2, 'Client Portal', 'Provides clients with access to their information.', 'Active'),
(2, 'Support Management', 'Manages client support activities.', 'Active'),
(2, 'Reporting', 'Provides operational reports.', 'Active'),

(3, 'Financial Dashboard', 'Displays financial analytics.', 'Active'),
(3, 'Transaction Analytics', 'Analyzes financial transactions.', 'Active'),
(3, 'Report Generator', 'Generates financial reports.', 'Active'),

(4, 'Threat Detection', 'Detects suspicious activity.', 'Active'),
(4, 'Security Alerts', 'Manages security alerts.', 'Active'),
(4, 'Incident Management', 'Tracks and manages security incidents.', 'Active'),

(5, 'Dashboard', 'Provides enterprise overview dashboards.', 'Active'),
(5, 'Analytics', 'Provides enterprise analytics.', 'Active'),
(5, 'User Administration', 'Manages application users.', 'Active'),

(6, 'Data Processing', 'Processes reporting data.', 'Active'),
(6, 'Report Templates', 'Manages report templates.', 'Active'),
(6, 'Export Manager', 'Exports generated reports.', 'Active'),

(7, 'Authentication', 'Handles user authentication.', 'Active'),
(7, 'Authorization', 'Handles user authentication and permission management.', 'Active'),
(7, 'Session Management', 'Manages user sessions.', 'Active'),

(8, 'Notification Manager', 'Manages application notifications.', 'Active'),
(8, 'Email Notifications', 'Handles email notifications.', 'Active'),
(8, 'System Alerts', 'Handles system alerts.', 'Active'),

(9, 'Document Storage', 'Stores application documents.', 'Active'),
(9, 'Document Search', 'Searches stored documents.', 'Active'),
(9, 'Document Access', 'Controls document access.', 'Active'),

(10, 'Deployment Tracking', 'Tracks product deployments.', 'Active'),
(10, 'Environment Management', 'Manages deployment environments.', 'Active'),
(10, 'Release Management', 'Manages product releases.', 'Active'),

(11, 'Ticket Management', 'Manages client support tickets.', 'Active'),
(11, 'Incident Tracking', 'Tracks support incidents.', 'Active'),
(11, 'Support Reports', 'Generates support reports.', 'Active'),

(12, 'System Health', 'Monitors system health.', 'Active'),
(12, 'Performance Monitoring', 'Monitors application performance.', 'Active'),
(12, 'Monitoring Alerts', 'Manages monitoring alerts.', 'Active');

-- Document
insert into Document
    (ProductId, Name, DocumentType, Description, UrlOrFileReference, LastUpdatedDate)
values
(1, 'Product Management User Guide', 'User Guide', 'Guide for managing products through the portal.', 'https://docs.company.com/product-management/user-guide', '2026-01-15'),
(1, 'Product Management API', 'API Documentation', 'API documentation for product management.', 'https://docs.company.com/product-management/api', '2026-01-20'),
(2, 'Digital Wallet Technical Documentation', 'Technical Documentation', 'Technical documentation for the digital wallet.', 'https://docs.company.com/digital-wallet/technical', '2026-02-01'),
(2, 'Digital Wallet User Guide', 'User Guide', 'User guide for digital wallet users.', 'https://docs.company.com/digital-wallet/user-guide', '2026-01-28'),
(3, 'Fraud Detection Documentation', 'Technical Documentation', 'Technical documentation describing fraud detection functionality.', 'https://docs.company.com/fraud-detection/technical', '2026-02-05'),
(3, 'Fraud Detection Security Guide', 'Security Documentation', 'Security guidelines for the fraud detection system.', 'https://docs.company.com/fraud-detection/security', '2026-02-10'),
(4, 'Merchant Portal User Guide', 'User Guide', 'Guide for merchant portal users.', 'https://docs.company.com/merchant-portal/user-guide', '2026-01-18'),
(5, 'Transaction Monitoring Guide', 'Technical Documentation', 'Documentation for transaction monitoring.', 'https://docs.company.com/transaction-monitoring/technical', '2026-02-12'),
(5, 'Transaction Monitoring Procedure', 'Procedure', 'Operational procedures for transaction monitoring.', 'https://docs.company.com/transaction-monitoring/procedure', '2026-02-15'),
(6, 'Banking API Documentation', 'API Documentation', 'API reference for the banking platform.', 'https://docs.company.com/banking-api/reference', '2026-02-20'),
(7, 'Customer Management Guide', 'User Guide', 'User guide for customer management.', 'https://docs.company.com/customer-management/user-guide', '2026-01-22'),
(8, 'Reporting Platform Documentation', 'Technical Documentation', 'Technical documentation for the reporting platform.', 'https://docs.company.com/reporting/technical', '2026-02-18'),
(8, 'Reporting User Guide', 'User Guide', 'Guide for generating reports.', 'https://docs.company.com/reporting/user-guide', '2026-02-19'),
(9, 'Identity Verification Security Guide', 'Security Documentation', 'Security documentation for identity verification.', 'https://docs.company.com/identity/security', '2026-02-22'),
(10, 'Notification Service API', 'API Documentation', 'API documentation for notification services.', 'https://docs.company.com/notifications/api', '2026-02-25'),
(10, 'Notification Deployment Guide', 'Deployment Documentation', 'Deployment instructions for notification services.', 'https://docs.company.com/notifications/deployment', '2026-02-26'),
(11, 'Risk Management Documentation', 'Technical Documentation', 'Technical documentation for risk management.', 'https://docs.company.com/risk-management/technical', '2026-02-28'),
(12, 'Mobile Banking Documentation', 'Technical Documentation', 'Technical documentation for the mobile banking application.', 'https://docs.company.com/mobile-banking/technical', '2026-03-01'),
(12, 'Mobile Banking Deployment Guide', 'Deployment Documentation', 'Deployment instructions for the mobile banking application.', 'https://docs.company.com/mobile-banking/deployment', '2026-03-02');

-- ProductResponsibility
insert into ProductResponsibility
    (ProductId, TeamMemberId, Responsibility, Description)
values
(1, 8, 'Technical Lead',
 'Responsible for the overall technical direction and architecture of the payment gateway.'),
(1, 9, 'Backend Development',
 'Develops and maintains payment processing services and APIs.'),
(1, 19, 'Quality Assurance',
 'Tests payment processing workflows and ensures product quality.'),

(2, 11, 'DevOps',
 'Manages deployment pipelines, environments, and infrastructure.'),
(2, 10, 'Frontend Development',
 'Develops and maintains the digital wallet user interface.'),
(2, 21, 'Technical Support',
 'Provides technical support and investigates client issues.'),

(3, 14, 'Security Lead',
 'Responsible for security architecture and fraud detection requirements.'),
(3, 16, 'Security Analysis',
 'Monitors suspicious activity and analyzes potential fraud cases.'),
(3, 20, 'Quality Assurance',
 'Tests fraud detection rules and system functionality.'),

(4, 17, 'Product Management',
 'Coordinates product requirements, priorities, and feature planning.'),
(4, 10, 'Frontend Development',
 'Develops merchant portal interfaces and user experiences.'),
(4, 18, 'Business Analysis',
 'Defines merchant requirements and analyzes business processes.'),

(5, 14, 'Security Analysis',
 'Monitors transactions and investigates suspicious activities.'),
(5, 12, 'Backend Development',
 'Develops transaction monitoring services and processing logic.'),
(5, 19, 'Quality Assurance',
 'Tests transaction monitoring workflows and alert generation.'),

(6, 8, 'Technical Lead',
 'Oversees the architecture and technical direction of the banking API platform.'),
(6, 13, 'Backend Development',
 'Develops and maintains banking APIs and backend services.'),
(6, 21, 'Technical Support',
 'Provides technical assistance for API integrations and client issues.'),

(7, 18, 'Business Analysis',
 'Defines customer management requirements and business workflows.'),
(7, 9, 'Backend Development',
 'Maintains customer management services and APIs.'),
(7, 10, 'Frontend Development',
 'Develops customer management interfaces.'),

(8, 12, 'Backend Development',
 'Develops reporting services and data processing functionality.'),
(8, 19, 'Quality Assurance',
 'Tests report generation and data accuracy.'),
(8, 18, 'Business Analysis',
 'Defines reporting requirements and analyzes business needs.'),

(9, 15, 'Security Engineering',
 'Ensures identity verification processes follow security requirements.'),
(9, 14, 'Security Analysis',
 'Analyzes identity verification and authentication risks.'),
(9, 20, 'Quality Assurance',
 'Tests identity verification workflows and validation scenarios.'),

(10, 11, 'DevOps',
 'Manages deployment and infrastructure for the notification service.'),
(10, 13, 'Backend Development',
 'Develops notification processing and delivery services.'),
(10, 22, 'Technical Support',
 'Investigates notification issues and provides technical support.'),

(11, 16, 'Security Analysis',
 'Analyzes financial and operational risks within the platform.'),
(11, 17, 'Product Management',
 'Coordinates risk management product requirements and priorities.'),
(11, 19, 'Quality Assurance',
 'Tests risk assessment workflows and platform functionality.'),

(12, 10, 'Frontend Development',
 'Develops and maintains the mobile banking application interface.'),
(12, 13, 'Backend Development',
 'Maintains backend APIs supporting mobile banking functionality.'),
(12, 21, 'Technical Support',
 'Provides technical support for mobile banking issues.'),

(13, 8, 'Technical Lead',
 'Oversees maintenance and technical decisions for the legacy payment system.'),
(13, 12, 'Backend Development',
 'Maintains existing backend services and payment processing logic.'),
(13, 22, 'Technical Support',
 'Handles support requests and legacy system issues.'),

(14, 18, 'Business Analysis',
 'Defines analytics requirements and reporting metrics.'),
(14, 10, 'Frontend Development',
 'Develops dashboard interfaces and data visualizations.'),
(14, 20, 'Quality Assurance',
 'Tests analytics functionality and dashboard accuracy.'),

(15, 14, 'Security Lead',
 'Leads security monitoring strategy and technical security requirements.'),
(15, 16, 'Security Analysis',
 'Monitors security events and investigates potential threats.'),
(15, 15, 'Security Engineering',
 'Implements and maintains cybersecurity monitoring capabilities.');

-- DeploymentEnvironment
insert into DeploymentEnvironment
    (DeploymentId, Name, Type, Purpose, ServerName, OperatingSystem,
     ApplicationUrl, DatabaseInformation, MonitoringLink, AccessInstructions, Notes)
values
(1, 'Production', 'Production', 'Live production environment.', 'PROD-SRV-01', 'Windows Server 2022',
 'https://payment-gateway.company.com', 'SQL Server - PaymentGatewayDB',
 'https://monitoring.company.com/payment-gateway',
 'Access restricted to authorized production users.', '24/7 production environment.'),

(1, 'Staging', 'Staging', 'Pre-production testing environment.', 'STG-SRV-01', 'Windows Server 2022',
 'https://staging-payment.company.com', 'SQL Server - PaymentGatewayStagingDB',
 'https://monitoring.company.com/payment-gateway-staging',
 'Access through VPN.', 'Used for release validation.'),

(2, 'Production', 'Production', 'Live production environment.', 'PROD-SRV-02', 'Windows Server 2022',
 'https://fraud.company.com', 'SQL Server - FraudDetectionDB',
 'https://monitoring.company.com/fraud',
 'Security team access required.', 'Critical security environment.'),

(3, 'Production', 'Production', 'Live digital wallet environment.', 'PROD-SRV-03', 'Linux',
 'https://wallet.company.com', 'SQL Server - DigitalWalletDB',
 'https://monitoring.company.com/wallet',
 'VPN and production credentials required.', 'High availability environment.'),

(4, 'Staging', 'Staging', 'Environment for testing transaction monitoring releases.', 'STG-SRV-02', 'Windows Server 2022',
 'https://staging-monitoring.company.com', 'SQL Server - MonitoringStagingDB',
 'https://monitoring.company.com/transaction-staging',
 'Access through VPN.', 'Testing environment.'),

(5, 'Production', 'Production', 'Production payment gateway environment.', 'PROD-SRV-04', 'Windows Server 2022',
 'https://globalpay-gateway.company.com', 'SQL Server - GlobalPayDB',
 'https://monitoring.company.com/globalpay',
 'Restricted production access.', 'Critical client deployment.'),

(6, 'Production', 'Production', 'Merchant portal production environment.', 'PROD-SRV-05', 'Linux',
 'https://merchant.company.com', 'SQL Server - MerchantPortalDB',
 'https://monitoring.company.com/merchant',
 'Authorized support users only.', 'Client-facing environment.'),

(7, 'UAT', 'UAT', 'User acceptance testing environment.', 'UAT-SRV-01', 'Windows Server 2022',
 'https://uat-banking.company.com', 'SQL Server - BankingUATDB',
 'https://monitoring.company.com/banking-uat',
 'Access for testing team.', 'Used before production release.'),

(8, 'Production', 'Production', 'Production digital wallet environment.', 'PROD-SRV-06', 'Linux',
 'https://mena-wallet.company.com', 'SQL Server - MenaWalletDB',
 'https://monitoring.company.com/mena-wallet',
 'Restricted access.', 'Large-scale client environment.'),

(9, 'Production', 'Production', 'Production fraud detection environment.', 'PROD-SRV-07', 'Linux',
 'https://northstar-fraud.company.com', 'SQL Server - NorthStarFraudDB',
 'https://monitoring.company.com/northstar',
 'Security team access only.', 'Currently suspended.'),

(10, 'Production', 'Production', 'Production transaction monitoring environment.', 'PROD-SRV-08', 'Windows Server 2022',
 'https://bluewave-monitoring.company.com', 'SQL Server - BlueWaveMonitoringDB',
 'https://monitoring.company.com/bluewave',
 'Authorized personnel only.', 'Private cloud deployment.'),

(11, 'Production', 'Production', 'Banking payment gateway production environment.', 'PROD-SRV-09', 'Windows Server 2022',
 'https://cedar-payment.company.com', 'SQL Server - CedarPaymentDB',
 'https://monitoring.company.com/cedar-payment',
 'Strict access controls enforced.', 'Security-sensitive banking environment.'),

(12, 'Production', 'Production', 'Customer management production environment.', 'PROD-SRV-10', 'Linux',
 'https://cedar-customers.company.com', 'SQL Server - CedarCustomerDB',
 'https://monitoring.company.com/cedar-customers',
 'Restricted banking access.', 'Production customer system.'),

(13, 'Staging', 'Staging', 'Testing environment for merchant portal.', 'STG-SRV-03', 'Windows Server 2022',
 'https://atlas-merchant-staging.company.com', 'SQL Server - AtlasMerchantStagingDB',
 'https://monitoring.company.com/atlas-staging',
 'Access through VPN.', 'Internal testing environment.'),

(14, 'Production', 'Production', 'Production digital wallet environment.', 'PROD-SRV-11', 'Linux',
 'https://pacific-wallet.company.com', 'SQL Server - PacificWalletDB',
 'https://monitoring.company.com/pacific-wallet',
 'Restricted production access.', 'Pending final client approval.'),

(15, 'Production', 'Production', 'Production banking API environment.', 'PROD-SRV-12', 'Linux',
 'https://orion-banking-api.company.com', 'SQL Server - OrionBankingDB',
 'https://monitoring.company.com/orion',
 'Authorized API administrators only.', 'Multiple client environments.'),

(16, 'Production', 'Production', 'Production fraud detection environment.', 'PROD-SRV-13', 'Linux',
 'https://vertex-fraud.company.com', 'SQL Server - VertexFraudDB',
 'https://monitoring.company.com/vertex',
 'Security team access required.', 'Recently upgraded environment.');