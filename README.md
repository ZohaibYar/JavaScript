Case Flow Management Information System (CFMIS) - Detailed Report
1. Introduction
The Case Flow Management Information System (CFMIS) is designed to streamline the management of legal cases by providing role-based access to different users: Admin, Clerk, Registrar, and Judge. The system enables the registration, processing, and tracking of cases through various stages while ensuring secure user authentication and authorization.
2. System Overview
The system follows a layered architecture consisting of:
1.	Frontend Layer: Simple HTML and JavaScript-based UI making API calls.
2.	Backend Layer: Node.js and Express.js handling business logic and API endpoints.
3.	Database Layer: SQL Server storing users, cases, and related information.
3. User Roles and Responsibilities
Role	Responsibilities
Admin	Manages user accounts and assigns roles.
Clerk	Registers new cases in the system.
Registrar	Assigns hearing dates to cases.
Judge	Updates case proceedings and changes case stages.
4. System Functioning
4.1 Authentication & Authorization
•	User Authentication: Users must log in with credentials.
•	JWT-Based Authorization: A JSON Web Token (JWT) is issued upon login and used for API requests.
•	Role-Based Access Control (RBAC): Each user role has specific permissions to access different endpoints.
4.2 Case Management Flow
1.	Clerk registers a case → Case is stored in the database with Filing as the initial stage.
2.	Registrar assigns a hearing date → Updates the case record with the next hearing date.
3.	Judge updates case proceedings → Adds case proceedings and moves it to the next stage.
4.	Case is resolved → Final decision stage is recorded.
5. System Architecture and Interaction
