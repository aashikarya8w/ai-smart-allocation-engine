import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SIH25033 – AI-Based Smart Allocation Engine API",
      version: "1.0.0",
      description: `
## PM Internship Scheme — Backend API

This API powers the AI-Based Smart Allocation Engine for the PM Internship Scheme (SIH25033).

### Authentication
All protected routes require a Bearer token in the Authorization header:
\`Authorization: Bearer <accessToken>\`

### Roles
- **student** — Can apply for internships, view recommendations, and manage their profile
- **company** — Can create internships, view applications, and evaluate students
- **admin** — Full platform management access

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sih25033.com | Admin@123 |
| Company | company@sih25033.com | Company@123 |
| Student | student@sih25033.com | Student@123 |
      `,
      contact: { name: "SIH25033 Team" },
    },
    servers: [
      { url: "http://localhost:5001/api", description: "Development" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Success: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Success" },
            data:    { type: "object" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            error: {
              type: "object",
              properties: {
                code:    { type: "string" },
                details: { type: "array", items: { type: "object" } },
              },
            },
          },
        },
        Paginated: {
          type: "object",
          properties: {
            success:    { type: "boolean" },
            data:       { type: "array", items: {} },
            pagination: {
              type: "object",
              properties: {
                page:       { type: "integer" },
                limit:      { type: "integer" },
                total:      { type: "integer" },
                totalPages: { type: "integer" },
              },
            },
          },
        },
        RegisterInput: {
          type: "object",
          required: ["name","email","password","role"],
          properties: {
            name:     { type: "string", example: "Aarav Sharma" },
            email:    { type: "string", example: "aarav@student.com" },
            password: { type: "string", example: "Test@12345" },
            role:     { type: "string", enum: ["student","company","admin"] },
            phone:    { type: "string", example: "9876543210" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email","password","role"],
          properties: {
            email:    { type: "string", example: "student@sih25033.com" },
            password: { type: "string", example: "Student@123" },
            role:     { type: "string", enum: ["student","company","admin"] },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: "Auth",          description: "Authentication & authorization" },
      { name: "Students",      description: "Student profile & dashboard" },
      { name: "Companies",     description: "Company profile & dashboard" },
      { name: "Internships",   description: "Internship listing & management" },
      { name: "Applications",  description: "Internship applications" },
      { name: "Assessments",   description: "Skill assessment system" },
      { name: "Matching",      description: "AI matching engine & recommendations" },
      { name: "Allocation",    description: "Smart seat-constrained allocation" },
      { name: "Intelligence",  description: "Skill gap, readiness, simulator, roadmap" },
      { name: "Verification",  description: "Identity & QR verification" },
      { name: "Check-In",      description: "Smart check-in system" },
      { name: "Feedback",      description: "Student feedback & company evaluation" },
      { name: "Outcomes",      description: "Internship outcomes & insights" },
      { name: "Notifications", description: "In-app notification system" },
      { name: "Admin",         description: "Admin dashboard, analytics & management" },
      { name: "Rules",         description: "Configurable allocation rules" },
      { name: "Skills",        description: "Skills, sectors & locations" },
      { name: "Reports",       description: "Platform reports" },
      { name: "Audit Logs",    description: "Admin audit trail" },
      { name: "Swaps",         description: "Allocation swap engine" },
      { name: "Resumes",       description: "Resume upload & management" },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
