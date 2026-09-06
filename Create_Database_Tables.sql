use phase2;

create table [User]
(
    Id int identity(1,1) primary key,
    Name nvarchar(255) not null,
    Email nvarchar(255) not null,
    Password nvarchar(255) not null,
    Role int not null,
    IsActive bit not null
);

create table Department
(
    Id int identity(1,1) primary key,
    Name nvarchar(255) not null
);

create table Product
(
    Id int identity(1,1) primary key,
    Name nvarchar(255) not null,
    Description nvarchar(max) null,
    BusinessPurpose nvarchar(max) null,
    LifecycleStatus nvarchar(255) not null,
    CurrentVersion nvarchar(255) not null,
    SupportedMarkets nvarchar(max) null,
    Criticality nvarchar(255) null,
    Technologies nvarchar(max) null,
    Notes nvarchar(max) null,
    CreatedAt datetime2 not null,
    UpdatedAt datetime2 not null
);

create table Client
(
    Id int identity(1,1) primary key,
    CompanyName nvarchar(255) not null,
    Country nvarchar(255) not null,
    Email nvarchar(255) null,
    PhoneNumber nvarchar(255) null,
    Status nvarchar(255) not null,
    Notes nvarchar(max) null
);

create table TeamMember
(
    Id int identity(1,1) primary key,
    DepartmentId int null,
    Name nvarchar(255) not null,
    JobTitle nvarchar(255) null,
    Email nvarchar(255) not null,
    Status nvarchar(255) not null,

    foreign key (DepartmentId) references Department(Id)
);

create table Module
(
    Id int identity(1,1) primary key,
    ProductId int not null,
    Name nvarchar(255) not null,
    Description nvarchar(max) null,
    Status nvarchar(255) not null,

    foreign key (ProductId) references Product(Id)
);

create table Repository
(
    Id int identity(1,1) primary key,
    ProductId int not null,
    Name nvarchar(255) not null,
    GitHubURL nvarchar(255) not null,
    MainBranch nvarchar(255) not null,
    Description nvarchar(max) null,

    foreign key (ProductId) references Product(Id)
);

create table Document
(
    Id int identity(1,1) primary key,
    ProductId int not null,
    Name nvarchar(255) not null,
    DocumentType nvarchar(255) null,
    Description nvarchar(max) null,
    UrlOrFileReference nvarchar(255) null,
    LastUpdatedDate datetime2 null,

    foreign key (ProductId) references Product(Id)
);

create table Deployment
(
    Id int identity(1,1) primary key,
    ClientId int not null,
    ProductId int not null,
    ProductVersion nvarchar(255) not null,
    GoLiveDate datetime2 null,
    DeploymentStatus nvarchar(255) not null,
    SupportTier nvarchar(255) not null,
    ClientSpecificNotes nvarchar(max) null,

    foreign key (ClientId) references Client(Id),
    foreign key (ProductId) references Product(Id)
);

create table ProductResponsibility
(
    Id int identity(1,1) primary key,
    ProductId int not null,
    TeamMemberId int not null,
    Responsibility nvarchar(255) not null,
    Description nvarchar(max) null,

    foreign key (ProductId) references Product(Id),
    foreign key (TeamMemberId) references TeamMember(Id)
);

create table DeploymentEnvironment
(
    Id int identity(1,1) primary key,
    DeploymentId int not null,
    Name nvarchar(255) not null,
    Type nvarchar(255) not null,
    Purpose nvarchar(max) null,
    ServerName nvarchar(255) null,
    OperatingSystem nvarchar(255) null,
    ApplicationUrl nvarchar(255) null,
    DatabaseInformation nvarchar(max) null,
    MonitoringLink nvarchar(255) null,
    AccessInstructions nvarchar(max) null,
    Notes nvarchar(max) null,

    foreign key (DeploymentId) references Deployment(Id)
);
