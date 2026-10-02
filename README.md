# 🚀 SIH25033 – AI-Based Smart Allocation Engine

An AI-powered internship matching, assessment, suitability analysis, fair allocation, verification, and post-internship evaluation platform designed for the PM Internship Scheme.

## 📌 Project Overview

SIH25033 – AI-Based Smart Allocation Engine is a complete digital platform designed to improve the internship allocation lifecycle.

The system goes beyond simple internship recommendations by covering the complete workflow:

**MATCH → ASSESS → ANALYZE → SIMULATE → ALLOCATE FAIRLY → EXPLAIN → VERIFY → CHECK-IN → EVALUATE → IMPROVE**

The platform helps students discover suitable internships, understand their compatibility, identify skill gaps, improve their profiles, simulate different opportunities, and receive transparent allocation decisions.

Companies can create internships, define requirements, evaluate candidates, and manage internship-related activities.

Administrators can monitor the complete platform, configure allocation rules, run smart allocation, review results, manage verification, perform analytics, and generate reports.

---

## 🎯 Objectives

The main objectives of the project are:

* AI-based internship matching
* Student suitability analysis
* Online skill assessment
* Skill gap identification
* Career and internship roadmap
* What-if opportunity simulation
* Smart seat-constrained allocation
* Objective tie-breaking
* Explainable allocation decisions
* Smart re-allocation
* Identity and internship verification
* Internship check-in
* Company evaluation
* Student feedback
* Performance insights
* Administrative analytics
* Reports and audit logs

---

## 🔄 Complete Project Workflow

```text
REGISTER
   ↓
CREATE PROFILE
   ↓
COMPANY CREATES INTERNSHIP
   ↓
AI MATCHING
   ↓
MATCH SCORE
   ↓
WHY THIS MATCH?
   ↓
SKILL ASSESSMENT
   ↓
SKILL GAP ANALYSIS
   ↓
JOB SUITABILITY SCORE
   ↓
APPLY FOR INTERNSHIP
   ↓
WHAT-IF SIMULATION
   ↓
CAREER ROADMAP
   ↓
SMART & FAIR ALLOCATION
   ↓
TIE-BREAKING
   ↓
ALLOCATED / WAITLISTED / NOT ALLOCATED
   ↓
EXPLAINABLE DECISION
   ↓
SMART RE-ALLOCATION
   ↓
IDENTITY VERIFICATION
   ↓
INTERNSHIP CHECK-IN
   ↓
COMPANY EVALUATION
   ↓
STUDENT FEEDBACK
   ↓
PERFORMANCE INSIGHTS
   ↓
ADMIN ANALYTICS & REPORTS
```

---

# 👨‍🎓 Student Module

Students can:

* Register and login
* Create and manage profile
* Add education and qualification
* Add CGPA
* Add skills
* Add interests
* Add location
* Set preferred locations
* Set work mode preferences
* Add projects and experience
* Upload/manage resume
* Browse internships
* View internship details
* Receive AI recommendations
* View Match Score
* View "Why This Match?"
* Take online skill assessments
* View skill gaps
* View Job Suitability Score
* Apply for internships
* Track applications
* Use What-If Simulator
* View career roadmap
* View allocation results
* View allocation explanations
* Receive notifications
* Manage settings

---

# 🏢 Company Module

Companies can:

* Register and login
* Create company profile
* Create internships
* Define internship requirements
* Add required skills
* Define qualification requirements
* Set minimum CGPA
* Define location
* Define work mode
* Set duration
* Set stipend
* Define available seats
* Configure assessment requirements
* Manage internships
* View applications
* View candidates
* Compare candidates
* View Match Score
* View Suitability Score
* View Assessment Score
* View allocation-related information
* Perform internship evaluations
* View company analytics

---

# 🛡️ Admin Module

Administrators can:

* Monitor students
* Manage companies
* Manage internships
* Manage applications
* Manage assessments
* Run AI matching
* Run smart allocation
* Configure matching rules
* Configure allocation rules
* Manage eligibility rules
* Review allocations
* Manage waitlisted candidates
* Manage re-allocation
* Monitor fairness-related metrics
* Manage verification
* Monitor internship check-ins
* View analytics
* Generate reports
* View audit logs
* Manage system settings

---

# 🤖 AI-Based Matching

The matching engine compares student profiles with internship requirements.

Matching factors include:

* Skills
* Education
* Qualification
* CGPA
* Projects
* Experience
* Interests
* Location
* Work mode
* Preferences

The system generates a Match Score for suitable internships.

Example:

```text
Software Developer Internship

Match Score: 87%
```

---

# 🔍 Why This Match?

The platform does not only display a score.

It also provides an explanation of the compatibility.

Example:

```text
Skills          90%
Education       95%
Projects        85%
Location        90%
Preferences     85%
```

This allows students to understand why a particular internship matches their profile.

---

# 📝 Skill Assessment

Companies can configure internships that require an online assessment.

The assessment can include:

* Questions
* Timer
* Progress tracking
* Submission
* Result
* Assessment score

The assessment score is treated as an additional parameter and is not the sole factor for final allocation.

---

# 📊 Skill Gap Analysis

The system compares current student skills with required internship skills.

Example:

```text
Current Skills:
Java
SQL
Git

Required Skills:
Java
SQL
Git
Spring Boot
Docker
```

The system identifies missing or weak skills and calculates internship readiness.

---

# 🎯 Job Suitability Score

A separate Job Suitability Score is calculated for each relevant internship.

Possible factors include:

* Skill Match
* Assessment Score
* Qualification
* CGPA
* Projects
* Experience
* Interests
* Preferences
* Location
* Work Mode

The purpose is to identify the overall suitability of a student for a particular internship.

---

# 🔬 What-If Opportunity Simulator

Students can simulate profile changes without modifying their actual profile.

They can temporarily change:

* Skills
* Location
* Assessment Score
* CGPA
* Projects
* Experience
* Work Mode
* Interests
* Preferences

Example:

```text
Current Match Score:       72%

After adding React:
Simulated Match Score:     84%
```

The simulation does not automatically modify the student's actual profile.

---

# 🗺️ Career & Internship Roadmap

The system uses identified skill gaps to provide a roadmap.

Example:

```text
Missing React Skill
        ↓
Learn React
        ↓
Build Project
        ↓
Take Assessment
        ↓
Improve Internship Readiness
```

---

# ⚖️ Smart & Fair Allocation

The allocation engine does not simply select candidates based only on Match Score.

It considers:

* Eligibility
* Job Suitability Score
* Assessment
* Required Skill Coverage
* Qualification
* Student Preferences
* Available Seats
* Predefined Rules
* Tie-breaking Criteria

Example:

```text
Available Seats: 10

Maximum Final Allocations: 10
```

---

# 🔀 Tie-Breaking

When multiple candidates have similar suitability, predefined objective tie-breaking rules can be applied.

Possible criteria include:

* Required skill coverage
* Assessment performance
* Qualification
* Relevant projects
* Relevant experience

The system applies defined criteria consistently.

---

# 📋 Allocation Results

Students can receive one of the following statuses:

```text
ALLOCATED
WAITLISTED
NOT ALLOCATED
```

The platform also provides an explanation for the allocation result.

---

# 💡 Explainable Allocation

The system provides simple explanations for allocation decisions.

Example:

```text
You were eligible and your suitability was 88%.

Your preferred location matched.

However, available seats were filled by candidates
meeting the defined priority rules.
```

---

# 🔄 Smart Re-Allocation

If an allocated student rejects an internship, a company cancels an internship, a seat becomes vacant, or requirements change, the system can identify eligible candidates again.

The system recalculates suitability and recommends a replacement candidate according to the defined rules.

The administrator performs the final approval.

---

# 🪪 Identity & Internship Verification

The project includes a frontend prototype for:

* QR Verification
* RFID Verification
* Optional Fingerprint Verification
* Optional Face Verification

These verification mechanisms are intended for identity and allocation verification.

They are not used to determine internship suitability.

---

# 🕒 Smart Internship Check-In

During internship joining, the student can be verified using the supported verification prototype.

The system checks whether the student is allocated to the correct company and internship.

A successful check-in can record:

```text
Date
Time
Verification Method
Status
```

---

# ⭐ Internship Evaluation

After completing the internship, the company can evaluate the student.

Evaluation areas may include:

* Technical Performance
* Project Performance
* Communication
* Discipline
* Overall Performance
* Comments

Students can also provide feedback regarding:

* Learning Experience
* Mentorship
* Work Environment
* Overall Internship Experience
* Suggestions

---

# 📈 Performance Insights

The system can combine:

* Assessment Performance
* Internship Evaluation
* Student Feedback
* Skill Growth
* Project Performance

to generate performance insights.

These insights can help improve future internship recommendations.

Subjective feedback should not directly become a high-stakes allocation factor.

---

# 📊 Admin Analytics

The admin dashboard can display:

* Total Students
* Total Companies
* Total Internships
* Total Applications
* Eligible Candidates
* Allocated Candidates
* Waitlisted Candidates
* Unallocated Candidates
* Available Seats
* Seat Utilization
* Match Score Distribution
* Suitability Score
* Assessment Performance
* Sector Analytics
* Skill Analytics
* Location Analytics
* Application Analytics
* Allocation Analytics

---

# 📝 Reports & Audit Logs

The platform maintains audit records for important activities.

Examples:

* Internship Creation
* Application
* Allocation
* Rule Changes
* Re-allocation
* Verification
* Administrative Actions



# 🧑‍💻 Technology Stack

## Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* React Hook Form
* Zod
* Recharts
* Framer Motion

## Current Development Phase

The initial development phase focuses on the frontend.

The platform uses:

* Mock Data
* Local Data
* React State
* Reusable Components
* Frontend Simulation

---

# 🚫 Currently Not Implemented

The initial frontend phase does not include:

* MongoDB
* Node.js Backend
* Express API
* Real Authentication
* Real AI Model
* Python FastAPI
* Redis
* BullMQ
* AWS
* Real Email Service
* Real File Storage
* Physical Verification Hardware

These components can be integrated later without changing the overall frontend architecture.

---

# 📁 Planned Project Structure

```text
sih25033-ai-smart-allocation-engine/
│
├── app/
│   ├── (auth)/
│   ├── student/
│   ├── company/
│   └── admin/
│
├── components/
│   ├── ui/
│   ├── common/
│   ├── auth/
│   ├── student/
│   ├── company/
│   ├── admin/
│   ├── internship/
│   ├── allocation/
│   └── charts/
│
├── data/
│
├── types/
│
├── hooks/
│
├── lib/
│
├── services/
│
├── public/
│
├── README.md
├── package.json
├── tsconfig.json
└── .gitignore
```

---

# 🌿 Git Branch Strategy

Each team member should work on a separate branch.

```text
main
│
├── feature/student-portal
├── feature/ai-matching-assessment
├── feature/smart-allocation
├── feature/what-if-career
├── feature/company-portal
└── feature/admin-verification
```

Do not directly push feature development to the `main` branch.

---

# ⚠️ Development Guidelines

* Do not delete the existing frontend.
* Understand existing routes and components before modifying them.
* Reuse existing components wherever possible.
* Avoid duplicated code.
* Use TypeScript strictly.
* Avoid `any`.
* Keep components reusable.
* Use realistic mock data.
* Keep the application responsive.
* Maintain consistent UI/UX.
* Test every module before merging.
* Keep the main branch stable.
* Use separate Git branches for each module.

---

# 🎯 Final Goal

The final system aims to provide a complete internship lifecycle platform:

**MATCH → ASSESS → ANALYZE → SIMULATE → ALLOCATE FAIRLY → EXPLAIN → VERIFY → CHECK-IN → EVALUATE → IMPROVE**

---

## 📌 Project Status

🚧 **Currently in Development**

Frontend development is being implemented incrementally, starting with the core UI, authentication, Student Portal, Company Portal and Admin Portal.

---

## 🏆 Smart India Hackathon

**Problem Statement:** SIH25033

**Project:** AI-Based Smart Allocation Engine

**Domain:** Internship Matching & Smart Allocation

**Development Approach:** Frontend-first, modular and scalable architecture
