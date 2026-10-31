# Intern AI: Smart Job Allocation Engine (SIH25033)
## Candidate Experience & Student Career Intelligence Portal
### B.Tech Capstone Project Progress Evaluation (2025–2026) — Lovely Professional University

**Submitted to:** Konne Madhavi (Faculty Mentor, Assistant Professor, Department of CSE, LPU)  
**Submitted by:** Aashik Kumar  
**Reg. No:** 12306949  
**Program:** B.Tech — Computer Science & Engineering  

---

### Candidate Portal Statement of Contribution
This progress submission covers the specialized design and full-stack implementation of the **Student Portal**. It addresses student-centric placement challenges through automated ATS resume parsing, explainable AI recommendation breakdowns, autonomous skill-gap roadmaps, predictive readiness digital twins, and anti-proxy GPS geo-check-in verification for government stipend release under the **Prime Minister's Internship Scheme (PMIS)**.

---

### 1. Executive Summary & Problem Statement
Under the Government of India's **Prime Minister's Internship Scheme (PMIS)**, over 1.2 crore youth from across 28 states and union territories seek high-quality corporate exposure across top 500 enterprises. However, existing public placement portals operate merely as passive bulletin boards. Students face severe systemic friction: opaque rejection without actionable feedback, extreme geographical concentration around metropolitan hubs, and the "fresher cold-start" deficit where candidates lack industry-aligned resume keywords.

The **Intern AI Student Portal (SIH25033)** resolves these challenges by introducing an active career progression ecosystem. Rather than submitting blind applications, students receive transparent match explanations, diagnostic ATS resume assessments, curated learning pathways to bridge identified skill deltas, a predictive "Readiness Digital Twin", an interactive "What-If" career simulator, and cryptographic GPS-verified attendance logging for guaranteed stipend disbursement.

> **Core Candidate Innovation:** Transforming rejection into self-directed learning. When a candidate does not match a corporate opening, the portal decomposes the exact missing competencies and instantly provisions a time-bounded learning roadmap with free certified course links.

---

### 2. Candidate Portal Objectives
1. **Unified Academic Ledger:** Provide a tamper-proof profile repository capturing degree, verified CGPA, social reservation category (SC/ST/OBC/EWS), aspirational district status, and certified domain competencies.
2. **Explainable AI Matching & Recommendations:** Deliver ranked opportunity recommendations categorized into Highest Match, Skill Fit, and Aspirational tiers, explaining why a candidate qualifies.
3. **Automated ATS Resume Analyzer:** Parse uploaded resumes in real-time, extracting technical keywords and providing structural formatting diagnosis before corporate submission.
4. **Autonomous Skill Gap Decomposition:** Identify specific technical deltas between candidate abilities and job requirements, computing estimated upskill duration.
5. **Readiness Digital Twin & What-If Simulation Sandbox:** Enable students to model the placement impact of acquiring a certification or improving CGPA before committing study hours.
6. **One-Click Allocation Letter & Smart Check-In:** Issue verifiable PDF allocation letters and enable anti-proxy GPS geo-verified workplace check-in for automated stipend compliance.

---

### 3. Student Portal Technology Matrix

| Layer | Selected Technology | Candidate Experience Benefit |
| :--- | :--- | :--- |
| **Client Framework** | Next.js 16.3 (Turbopack) + React 19 | Sub-second route transitions and instant client-side rendering for application forms. |
| **Type Safety** | TypeScript 5.0 (Strict Mode) | Prevents client runtime crashes during resume parsing and profile updates. |
| **Styling & Theme** | Tailwind CSS 4 + Inline Tokens | Light & Dark modes with 6 customizable accent colors to reduce eye strain during exams. |
| **State Management** | Zustand v5 (Lightweight Stores) | Instant client updates across application tracking without unnecessary re-renders. |
| **Data Visualization** | Recharts | Interactive competency radar charts and dynamic readiness progression curves. |
| **Backend Microservices** | Node.js 22 LTS / Express REST APIs | High-throughput recommendation ranking and proctored assessment grading. |
| **Data Persistence** | MongoDB 7.0 + Mongoose | Compound indexing enabling sub-50ms query speeds over candidate records. |

---

### 4. Student Portal Functional Module Specifications

| Module Name | Portal Route | Core Functional Scope | Candidate Impact & Deliverables |
| :--- | :--- | :--- | :--- |
| **Command Dashboard** | `/student/dashboard` | Aggregated metrics: active applications, top match %, readiness score, action alerts. | Single-screen situational awareness with urgent deadline notifications. |
| **Academic Ledger** | `/student/profile` | College affiliation, branch, CGPA, affirmative action quota, location preferences. | Centralized digital transcript powering all AI recommendation matching. |
| **ATS Resume Analyzer** | `/student/resume` | Parses uploaded PDF/DOCX resumes, calculates keyword density and structural readability. | Instant feedback diagnosing missing industry keywords before job application. |
| **Internship Catalog** | `/student/internships` | Search across 24 industry sectors, stipend filters, remote/on-site modes. | Transparent exploration with clear minimum eligibility prerequisites. |
| **AI Recommendations** | `/student/recommendations` | Algorithmic ranking into Highest Match (>90%), Skill Fit (75-90%), and Aspirational. | Eliminates candidate search fatigue with explainable compatibility scores. |
| **Application Tracker** | `/student/applications` | Visual Kanban pipeline: Submitted → Review → Interview → Offer → Confirmed. | Complete transparency eliminating opaque corporate hiring delays. |
| **My Allocation** | `/student/allocations` | Formal placement portal with supervisor contact and Allocation Letter PDF. | Cryptographically signed placement credential protecting student rights. |
| **Skill Gap Visualizer** | `/student/skill-gap` | Compares candidate competencies against role requirements to extract deltas. | Provides direct links to free training modules with estimated days to complete. |
| **Readiness Digital Twin** | `/student/readiness` | Trajectory score combining technical, behavioral, and verification milestones. | Continuous progress tracking showing workplace readiness index. |
| **What-If Simulator** | `/student/what-if` | Interactive sandbox modeling hypothetical credential additions. | Demonstrates projected competitive rank shifts before starting a course. |
| **Domain Assessments** | `/student/assessments` | Timed proctored MCQs with automated score normalization. | Validates self-reported skills to boost algorithmic placement ranking. |
| **Smart Geo Check-In** | `/student/check-in` | GPS geo-tagged and QR-verified joining check-in. | Validates physical workplace attendance for automated government stipend release. |
| **Grievance & 360 Feedback** | `/student/feedback` | Structured portal for submitting mentor ratings and workplace feedback. | Ensures safe corporate working environments under government oversight. |
| **Competency Outcomes** | `/student/outcomes` | Post-internship skill uplift tracking and Pre-Placement Offer (PPO) recording. | Formal exit ledger for permanent academic and career records. |

---

### 5. Candidate User Journeys & Workflows

#### 5.1 AI-Assisted Discovery & Match Explanation
When a candidate accesses recommendations, each corporate posting displays a composite compatibility index. Instead of a black-box percentage, the student can expand the card to inspect individual dimensions: skill alignment, academic rigor, preferred district proximity, and affirmative action quota eligibility.

#### 5.2 Autonomous Skill Gap Remediation
For listings where the candidate falls below the threshold, the portal immediately isolates missing prerequisites. For instance, if an applicant possesses React and JavaScript but lacks Docker, the system surfaces a curated learning pathway outlining estimated time commitment (e.g., 5 days) and free certified course links.

#### 5.3 "What-If" Profile Simulation Sandbox
The simulator provides an interactive predictive sandbox. Students test hypothetical actions—such as completing an AWS certification or lifting their CGPA from 7.5 to 8.2. The engine recalculates vector similarity in real time, showing the exact number of newly accessible corporate seats and rank shifts.

#### 5.4 Anti-Proxy Smart Check-In & Stipend Validation
To prevent fraudulent attendance while eliminating paperwork, placed interns verify on-premise arrival via GPS geo-fencing (50-meter corporate radius) and QR handshake. This triggers instant attendance logging, enabling the Ministry to disburse the monthly stipend directly into the student's Aadhaar-linked bank account.

---

### 6. Architectural Decisions & Engineering Rationale

| Engineering Decision | Technical Implementation | Candidate Experience Rationale |
| :--- | :--- | :--- |
| **Monorepo Decoupling** | Independent Next.js route groups | Ensures candidate portal remains snappy and unaffected by heavy administrative batch queries. |
| **Client Fallback Resilience** | Local state hydration with mock fallbacks | Prevents screen freezes during peak college hours if campus Wi-Fi fluctuates. |
| **Multi-Color Theme Studio** | CSS Variables + LocalStorage sync | Provides Dark and Light modes with 6 high-contrast accent palettes for extended study comfort. |
| **Declarative Form Validation** | Zod schemas + React Hook Form | Delivers immediate inline validation feedback before submitting extensive academic forms. |
| **Zero External CDN Dependency** | Locally bundled system vector assets | Guarantees fast load times on 3G/4G mobile networks across rural aspirational districts. |

#### 6.1 Candidate Data Privacy & OWASP Security
- **Strict Candidate Data Isolation:** Role-Based Access Control guarantees students can only view their own credentials, application states, and offer letters.
- **PII Encryption:** Aadhaar numbers and socioeconomic verification documents are encrypted at rest using AES-256 and masked in shared views.
- **Anti-Spoofing Geo Verification:** Check-in endpoints detect mock GPS locations and virtualized network proxies to maintain complete integrity.

---

### 7. Candidate Portal System Architecture & Dataflow
- **Tier 1: Interaction Layer:** Next.js 16 App Router routing `/student/*` candidate modules (Dashboard, Resume Analyzer, Recommendations, Skill Gap, What-If, Check-In).
- **Tier 2: Career Engines & Microservices:** Node.js Express REST APIs executing real-time vector matching, delta gap extraction, and proctored assessment scoring.
- **Tier 3: Persistent Data Schema:** MongoDB collections (`StudentProfiles`, `CandidateSkills`, `Applications`, `Allocations`, `GeoCheckInLogs`) with compound indexing for sub-50ms queries.

---

### 8. Implementation Evidence & Screens
- **Figure 1:** Student Executive Dashboard with KPIs and Active Placement Pipeline
- **Figure 2:** Verified Corporate Internship Catalog with Sector and Eligibility Filters
- **Figure 3:** Tiered AI Matching Studio with Explainable Multi-Factor Compatibility
- **Figure 4:** Automated ATS Resume Intelligence with Readability & Keyword Breakdown
- **Figure 5:** What-If Profile Simulation Sandbox & Digital Readiness Twin Projections
- **Figure 6:** Formal Allocation Letter Issuance & Anti-Proxy GPS Geo-Check-In

---

### 9. Current Scope, Future Roadmap & Conclusion

#### 9.1 Completed Candidate Scope
The student portal delivers all 14 planned functional modules covering preparation, discovery, application tracking, skill gap remediation, and attendance check-in.

#### 9.2 Future Development Horizons
1. **Vernacular Voice AI Interface:** Multilingual voice navigation in regional Indian languages (Hindi, Punjabi, Tamil, Telugu) via Bhashini API.
2. **AI Multimodal Video Mock Interviews:** Real-time interactive interview practice with computer-vision feedback on communication clarity and demeanor.
3. **National Blockchain Credential Anchoring:** Tamper-proof internship completion certificates anchored to India's National Blockchain Framework.

---

### 10. Conclusion
The **Student Portal of the Intern AI Platform (SIH25033)** fundamentally re-engineers the national placement paradigm from an opaque application lottery into an empowering, AI-guided career accelerator, ensuring an equitable pathway to professional excellence under the Prime Minister’s Internship Scheme.

---

### 11. Academic References
1. Gale, D., & Shapley, L. S. (1962). College admissions and the stability of marriage. *The American Mathematical Monthly*, 69(1), 9–15.
2. Ministry of Corporate Affairs, Government of India. (2024). *Operational Guidelines for Prime Minister’s Internship Scheme (PMIS)*. New Delhi: MCA.
3. Salton, G., & Buckley, C. (1988). Term-weighting approaches in automatic text retrieval. *Information Processing & Management*, 24(5), 513–523.

---

**Formal Academic Sign-off:**

| Submitted By | Evaluated By | Department Head |
| :---: | :---: | :---: |
| **Aashik Kumar** | **Konne Madhavi** | **School of Computer Science & Engineering** |
| Reg. No: 12306949 | Faculty Mentor, Assistant Professor | Lovely Professional University |
| B.Tech CSE, LPU | Department of CSE, LPU | Phagwara, Punjab |
