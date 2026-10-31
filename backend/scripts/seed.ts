/**
 * Seed script — realistic Indian data for SIH25033
 * Run: npm run seed
 */
import mongoose from "mongoose";
import dotenv   from "dotenv";
import path     from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { User }        from "../src/models/User";
import { Student }     from "../src/models/Student";
import { Company }     from "../src/models/Company";
import { Internship }  from "../src/models/Internship";
import { Application } from "../src/models/Application";
import { Allocation }  from "../src/models/Allocation";
import { Notification }from "../src/models/Notification";
import { Rule }        from "../src/models/Rule";
import { Skill }       from "../src/models/Skill";
import { Sector }      from "../src/models/Sector";
import { Location }    from "../src/models/Location";
import { Recommendation } from "../src/models/Recommendation";
import { Assessment }  from "../src/models/Assessment";
import { hashPassword } from "../src/utils/password";

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/sih25033";

/* ─────────────────────── RAW DATA ──────────────────────── */

const SKILLS_DATA = [
  { name: "React",           category: "Frontend" },
  { name: "Next.js",         category: "Frontend" },
  { name: "TypeScript",      category: "Frontend" },
  { name: "JavaScript",      category: "Frontend" },
  { name: "Vue.js",          category: "Frontend" },
  { name: "Angular",         category: "Frontend" },
  { name: "Tailwind CSS",    category: "Frontend" },
  { name: "Node.js",         category: "Backend" },
  { name: "Express.js",      category: "Backend" },
  { name: "Python",          category: "Backend" },
  { name: "Django",          category: "Backend" },
  { name: "FastAPI",         category: "Backend" },
  { name: "Java",            category: "Backend" },
  { name: "Spring Boot",     category: "Backend" },
  { name: "MongoDB",         category: "Database" },
  { name: "PostgreSQL",      category: "Database" },
  { name: "MySQL",           category: "Database" },
  { name: "Redis",           category: "Database" },
  { name: "AWS",             category: "Cloud" },
  { name: "Docker",          category: "DevOps" },
  { name: "Kubernetes",      category: "DevOps" },
  { name: "CI/CD",           category: "DevOps" },
  { name: "Git",             category: "Tools" },
  { name: "Machine Learning",category: "AI/ML" },
  { name: "TensorFlow",      category: "AI/ML" },
  { name: "PyTorch",         category: "AI/ML" },
  { name: "Data Analysis",   category: "Data" },
  { name: "Pandas",          category: "Data" },
  { name: "SQL",             category: "Data" },
  { name: "Power BI",        category: "Data" },
  { name: "Flutter",         category: "Mobile" },
  { name: "React Native",    category: "Mobile" },
  { name: "Android",         category: "Mobile" },
  { name: "Figma",           category: "Design" },
  { name: "AutoCAD",         category: "Engineering" },
  { name: "MATLAB",          category: "Engineering" },
  { name: "Embedded C",      category: "Embedded" },
  { name: "IoT",             category: "Embedded" },
  { name: "Cybersecurity",   category: "Security" },
  { name: "Linux",           category: "System" },
  { name: "REST API",        category: "Backend" },
  { name: "GraphQL",         category: "Backend" },
  { name: "Agile/Scrum",     category: "Process" },
  { name: "System Design",   category: "Architecture" },
  { name: "Excel",           category: "Tools" },
  { name: "Communication",   category: "Soft Skills" },
  { name: "Problem Solving", category: "Soft Skills" },
  { name: "CGPA 8+",         category: "Academic" },
  { name: "C++",             category: "Backend" },
  { name: "Blockchain",      category: "Emerging" },
];

const SECTORS_DATA = [
  "Software Development", "Information Technology", "Artificial Intelligence & ML",
  "Data Science & Analytics", "Cloud Computing", "Cybersecurity",
  "FinTech & Finance", "EdTech", "HealthTech", "E-Commerce & Retail",
  "Manufacturing", "Energy & CleanTech", "Consulting", "Government & Public Sector",
  "Media & Entertainment",
];

const LOCATIONS_DATA = [
  { state: "Maharashtra",   city: "Mumbai"     },
  { state: "Maharashtra",   city: "Pune"       },
  { state: "Karnataka",     city: "Bengaluru"  },
  { state: "Tamil Nadu",    city: "Chennai"    },
  { state: "Telangana",     city: "Hyderabad"  },
  { state: "Delhi",         city: "New Delhi"  },
  { state: "West Bengal",   city: "Kolkata"    },
  { state: "Gujarat",       city: "Ahmedabad"  },
  { state: "Rajasthan",     city: "Jaipur"     },
  { state: "Uttar Pradesh", city: "Noida"      },
  { state: "Uttar Pradesh", city: "Lucknow"    },
  { state: "Madhya Pradesh",city: "Bhopal"     },
  { state: "Punjab",        city: "Chandigarh" },
  { state: "Kerala",        city: "Kochi"      },
  { state: "Odisha",        city: "Bhubaneswar"},
];

const STUDENT_DATA = [
  { name:"Aarav Sharma",   email:"aarav.sharma@student.com",   university:"PICT Pune",        branch:"Computer Science",          degree:"B.Tech", cgpa:8.7, city:"Pune",        state:"Maharashtra",   skills:["React","Node.js","MongoDB","TypeScript","Git"],         interests:["Web Development","Open Source"],           pLoc:["Pune","Mumbai","Bengaluru"],          pSec:["Software Development","Information Technology"], wMode:"Hybrid"  },
  { name:"Priya Patel",    email:"priya.patel@student.com",    university:"Nirma University", branch:"Electronics & Communication",degree:"B.Tech", cgpa:9.1, city:"Ahmedabad",  state:"Gujarat",       skills:["Python","Machine Learning","TensorFlow","SQL","Pandas"],interests:["AI/ML","Data Science","Research"],         pLoc:["Ahmedabad","Bengaluru","Hyderabad"],  pSec:["Artificial Intelligence & ML","Data Science & Analytics"], wMode:"Remote" },
  { name:"Rahul Verma",    email:"rahul.verma@student.com",    university:"IIIT Lucknow",     branch:"Information Technology",    degree:"B.Tech", cgpa:7.8, city:"Lucknow",    state:"Uttar Pradesh", skills:["Java","Spring Boot","MySQL","REST API","Docker"],       interests:["Backend Development","Cloud Computing"],   pLoc:["Lucknow","Noida","Delhi"],            pSec:["Software Development","Cloud Computing"],       wMode:"On-site"},
  { name:"Sneha Reddy",    email:"sneha.reddy@student.com",    university:"Osmania University",branch:"Computer Science",         degree:"B.E.",   cgpa:8.4, city:"Hyderabad",  state:"Telangana",     skills:["React","Python","Django","PostgreSQL","Git"],           interests:["Full Stack Development","Product Management"],pLoc:["Hyderabad","Bengaluru"],             pSec:["Software Development","E-Commerce & Retail"],   wMode:"Hybrid"  },
  { name:"Kiran Kumar",    email:"kiran.kumar@student.com",    university:"RVCE Bengaluru",   branch:"Electrical Engineering",    degree:"B.E.",   cgpa:7.2, city:"Bengaluru",  state:"Karnataka",     skills:["Python","MATLAB","Power BI","Excel","SQL"],             interests:["Data Analytics","Energy Sector"],           pLoc:["Bengaluru","Pune"],                  pSec:["Energy & CleanTech","Manufacturing"],            wMode:"On-site"},
  { name:"Divya Nair",     email:"divya.nair@student.com",     university:"CET Trivandrum",   branch:"Computer Science",          degree:"B.Tech", cgpa:9.3, city:"Kochi",      state:"Kerala",        skills:["Flutter","Dart","Firebase","React Native","Git"],       interests:["Mobile Development","UI/UX"],               pLoc:["Kochi","Bengaluru","Chennai"],        pSec:["Software Development","EdTech"],                wMode:"Remote"  },
  { name:"Arjun Singh",    email:"arjun.singh@student.com",    university:"PEC Chandigarh",   branch:"Mechanical Engineering",    degree:"B.E.",   cgpa:6.9, city:"Chandigarh", state:"Punjab",        skills:["AutoCAD","MATLAB","Python","C++"],                      interests:["Manufacturing","Automation"],                pLoc:["Chandigarh","Delhi","Pune"],          pSec:["Manufacturing","Consulting"],                    wMode:"On-site"},
  { name:"Pooja Gupta",    email:"pooja.gupta@student.com",    university:"MNIT Jaipur",      branch:"Computer Science",          degree:"B.Tech", cgpa:8.9, city:"Jaipur",     state:"Rajasthan",     skills:["React","TypeScript","Node.js","AWS","CI/CD"],           interests:["Cloud Native","DevOps","Full Stack"],       pLoc:["Jaipur","Bengaluru","Hyderabad"],     pSec:["Cloud Computing","Software Development"],        wMode:"Remote"  },
  { name:"Aditya Joshi",   email:"aditya.joshi@student.com",   university:"NIT Bhopal",       branch:"Electronics & Communication",degree:"B.Tech",cgpa:7.5, city:"Bhopal",     state:"Madhya Pradesh",skills:["Embedded C","Arduino","Python","IoT","Linux"],          interests:["Embedded Systems","IoT"],                   pLoc:["Bhopal","Pune","Delhi"],              pSec:["Manufacturing","Energy & CleanTech"],            wMode:"On-site"},
  { name:"Meera Iyer",     email:"meera.iyer@student.com",     university:"Anna University",  branch:"Information Technology",    degree:"B.E.",   cgpa:8.2, city:"Chennai",    state:"Tamil Nadu",    skills:["Java","Angular","MySQL","Spring Boot","Agile/Scrum"],   interests:["Enterprise Software","Banking Tech"],       pLoc:["Chennai","Hyderabad","Bengaluru"],    pSec:["FinTech & Finance","Software Development"],     wMode:"Hybrid"  },
  { name:"Vikram Rao",     email:"vikram.rao@student.com",     university:"IIT Bombay",       branch:"Computer Science",          degree:"B.Tech", cgpa:9.6, city:"Mumbai",     state:"Maharashtra",   skills:["Python","Machine Learning","PyTorch","Data Analysis","SQL"],interests:["AI/ML","Research","Deep Learning"],     pLoc:["Mumbai","Bengaluru","Hyderabad"],     pSec:["Artificial Intelligence & ML","Data Science & Analytics"],wMode:"Hybrid"},
  { name:"Ananya Singh",   email:"ananya.singh@student.com",   university:"Delhi University", branch:"Computer Science",          degree:"B.Sc",   cgpa:8.0, city:"New Delhi",  state:"Delhi",         skills:["JavaScript","React","CSS","Figma","Git"],               interests:["UI/UX Design","Frontend Development"],     pLoc:["New Delhi","Noida","Gurgaon"],        pSec:["Software Development","Media & Entertainment"], wMode:"Hybrid"  },
  { name:"Rohan Mishra",   email:"rohan.mishra@student.com",   university:"NIT Warangal",     branch:"Computer Science",          degree:"B.Tech", cgpa:8.5, city:"Hyderabad",  state:"Telangana",     skills:["Node.js","MongoDB","Express.js","Docker","AWS"],        interests:["Backend Development","DevOps"],             pLoc:["Hyderabad","Bengaluru","Pune"],       pSec:["Cloud Computing","Software Development"],        wMode:"Remote"  },
  { name:"Kavita Sharma",  email:"kavita.sharma@student.com",  university:"Jadavpur University",branch:"Information Technology", degree:"B.Tech", cgpa:7.9, city:"Kolkata",    state:"West Bengal",   skills:["Python","Django","PostgreSQL","REST API","Linux"],      interests:["Backend Development","Open Source"],        pLoc:["Kolkata","Bengaluru","Pune"],         pSec:["Software Development","EdTech"],                wMode:"Remote"  },
  { name:"Suresh Babu",    email:"suresh.babu@student.com",    university:"VIT Vellore",      branch:"Electronics Engineering",   degree:"B.Tech", cgpa:7.4, city:"Chennai",    state:"Tamil Nadu",    skills:["Python","TensorFlow","Data Analysis","Pandas","SQL"],   interests:["AI/ML","Data Science"],                     pLoc:["Chennai","Hyderabad","Bengaluru"],    pSec:["Artificial Intelligence & ML","Data Science & Analytics"],wMode:"Hybrid"},
  { name:"Nisha Agarwal",  email:"nisha.agarwal@student.com",  university:"BITS Pilani",      branch:"Computer Science",          degree:"B.E.",   cgpa:8.8, city:"Jaipur",     state:"Rajasthan",     skills:["Cybersecurity","Linux","Python","C++","Networking"],    interests:["Cybersecurity","Ethical Hacking"],          pLoc:["Jaipur","Pune","Bengaluru"],          pSec:["Cybersecurity","Information Technology"],        wMode:"Hybrid"  },
  { name:"Ravi Teja",      email:"ravi.teja@student.com",      university:"JNTU Hyderabad",   branch:"Computer Science",          degree:"B.Tech", cgpa:7.6, city:"Hyderabad",  state:"Telangana",     skills:["React","JavaScript","TypeScript","Git","Figma"],        interests:["Frontend Development","UI/UX"],             pLoc:["Hyderabad","Bengaluru","Pune"],       pSec:["Software Development","E-Commerce & Retail"],   wMode:"Remote"  },
  { name:"Pallavi Kulkarni",email:"pallavi.kulkarni@student.com",university:"Pune University",branch:"Computer Science",          degree:"B.E.",   cgpa:8.3, city:"Pune",       state:"Maharashtra",   skills:["Java","Spring Boot","MongoDB","AWS","Docker"],          interests:["Backend Development","Cloud Computing"],   pLoc:["Pune","Mumbai","Bengaluru"],          pSec:["Software Development","Cloud Computing"],        wMode:"Hybrid"  },
  { name:"Deepak Nair",    email:"deepak.nair@student.com",    university:"CET Trivandrum",   branch:"Electronics",               degree:"B.Tech", cgpa:7.1, city:"Kochi",      state:"Kerala",        skills:["IoT","Embedded C","Python","Arduino","MATLAB"],         interests:["IoT","Embedded Systems","Robotics"],        pLoc:["Kochi","Bengaluru","Pune"],           pSec:["Manufacturing","Energy & CleanTech"],            wMode:"On-site"},
  { name:"Shreya Bansal",  email:"shreya.bansal@student.com",  university:"IIT Delhi",        branch:"Computer Science",          degree:"B.Tech", cgpa:9.4, city:"New Delhi",  state:"Delhi",         skills:["Machine Learning","Python","TensorFlow","SQL","Data Analysis"],interests:["AI/ML","Research","NLP"],          pLoc:["New Delhi","Bengaluru","Hyderabad"],  pSec:["Artificial Intelligence & ML","Data Science & Analytics"],wMode:"Hybrid"},
  { name:"Mohit Srivastava",email:"mohit.srivastava@student.com",university:"IIT Kanpur",    branch:"Computer Science",          degree:"B.Tech", cgpa:8.6, city:"Lucknow",    state:"Uttar Pradesh", skills:["System Design","Node.js","Python","PostgreSQL","Redis"], interests:["System Design","Backend Development"],      pLoc:["Lucknow","Noida","Bengaluru"],        pSec:["Software Development","FinTech & Finance"],     wMode:"Remote"  },
];

const COMPANY_DATA = [
  { name:"TechNova Solutions",    email:"hr@technova.com",       industry:"Software Development",  city:"Bengaluru",  state:"Karnataka",   size:"201-500" },
  { name:"DataMinds Analytics",   email:"careers@dataminds.com", industry:"Data Science & Analytics",city:"Hyderabad",state:"Telangana",   size:"51-200"  },
  { name:"CloudSpark Technologies",email:"jobs@cloudspark.com",  industry:"Cloud Computing",       city:"Pune",       state:"Maharashtra", size:"51-200"  },
  { name:"InnovateTech India",    email:"hr@innovatetech.in",    industry:"Information Technology", city:"Mumbai",     state:"Maharashtra", size:"201-500" },
  { name:"AI Dynamics",           email:"talent@aidynamics.in",  industry:"Artificial Intelligence & ML",city:"Bengaluru",state:"Karnataka",size:"11-50" },
  { name:"FinEdge Solutions",     email:"careers@finedge.com",   industry:"FinTech & Finance",     city:"Mumbai",     state:"Maharashtra", size:"51-200"  },
  { name:"EduTech Academy",       email:"jobs@edutechacademy.in",industry:"EdTech",                city:"Chennai",    state:"Tamil Nadu",  size:"51-200"  },
  { name:"GreenPower Systems",    email:"hr@greenpower.in",      industry:"Energy & CleanTech",    city:"Ahmedabad",  state:"Gujarat",     size:"201-500" },
  { name:"SecureNet Cyber",       email:"careers@securenet.in",  industry:"Cybersecurity",         city:"New Delhi",  state:"Delhi",       size:"11-50"   },
  { name:"MobiApps India",        email:"jobs@mobiapps.in",      industry:"Software Development",  city:"Noida",      state:"Uttar Pradesh",size:"51-200" },
];

/* ─────────────────────── SEEDER ─────────────────────────── */
async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected");

  // Clear existing data
  await Promise.all([
    User.deleteMany({}), Student.deleteMany({}), Company.deleteMany({}),
    Internship.deleteMany({}), Application.deleteMany({}), Allocation.deleteMany({}),
    Notification.deleteMany({}), Rule.deleteMany({}), Skill.deleteMany({}),
    Sector.deleteMany({}), Location.deleteMany({}), Recommendation.deleteMany({}),
  ]);
  console.log("🗑️  Cleared existing data");

  /* ── Skills ─────────────────────────────────────────────── */
  await Skill.insertMany(SKILLS_DATA.map(s => ({ ...s, isActive: true })));
  console.log(`✅ Seeded ${SKILLS_DATA.length} skills`);

  /* ── Sectors ─────────────────────────────────────────────── */
  await Sector.insertMany(SECTORS_DATA.map(n => ({ name: n, isActive: true })));
  console.log(`✅ Seeded ${SECTORS_DATA.length} sectors`);

  /* ── Locations ───────────────────────────────────────────── */
  await Location.insertMany(LOCATIONS_DATA.map(l => ({ ...l, isActive: true })));
  console.log(`✅ Seeded ${LOCATIONS_DATA.length} locations`);

  /* ── Default Rules ───────────────────────────────────────── */
  await Rule.insertMany([
    {
      name: "Default Matching Rule", type: "matching", isActive: true,
      weights: { skillMatch: 40, qualification: 20, location: 15, interest: 15, experience: 10 },
      eligibilityCriteria: { minimumCGPA: 6.0, minimumSkills: 2, requireResume: false, requireVerification: false, allowedBranches: [] },
      constraints: [
        { id: "c1", label: "Maximum applications per student", value: 10,    isEnabled: true },
        { id: "c2", label: "Minimum match score to show",       value: 40,   isEnabled: true },
        { id: "c3", label: "Maximum seats per allocation run",  value: 1000, isEnabled: true },
      ],
    },
    {
      name: "Default Allocation Rule", type: "allocation", isActive: true,
      weights: { skillMatch: 35, qualification: 20, location: 15, interest: 15, experience: 15 },
      eligibilityCriteria: { minimumCGPA: 6.0, minimumSkills: 2, requireResume: false, requireVerification: false, allowedBranches: [] },
      constraints: [],
    },
    {
      name: "Default Eligibility Rule", type: "eligibility", isActive: true,
      weights: { skillMatch: 40, qualification: 20, location: 15, interest: 15, experience: 10 },
      eligibilityCriteria: { minimumCGPA: 6.0, minimumSkills: 1, requireResume: false, requireVerification: false, allowedBranches: [] },
      constraints: [],
    },
  ]);
  console.log("✅ Seeded default rules");

  /* ── Admin User ──────────────────────────────────────────── */
  const adminPwd = await hashPassword("Admin@123");
  const adminUser = await User.create({
    name: "System Admin", email: "admin@sih25033.com",
    password: adminPwd, role: "admin",
    isEmailVerified: true, isActive: true,
  });
  console.log("✅ Admin created — admin@sih25033.com / Admin@123");

  /* ── Company Users + Profiles ────────────────────────────── */
  const companyPwd = await hashPassword("Company@123");
  const companyUsers: InstanceType<typeof User>[] = [];
  const companyProfiles: InstanceType<typeof Company>[] = [];

  for (const c of COMPANY_DATA) {
    const u = await User.create({
      name: c.name, email: c.email, password: companyPwd,
      role: "company", isEmailVerified: true, isActive: true,
    });
    companyUsers.push(u);
    const cp = await Company.create({
      userId: u._id, companyName: c.name, email: c.email,
      industry: c.industry, city: c.city, state: c.state,
      companySize: c.size,
      description: `${c.name} is a leading company in ${c.industry}.`,
      verificationStatus: "Verified", isActive: true,
    });
    companyProfiles.push(cp);
  }
  console.log(`✅ Seeded ${COMPANY_DATA.length} companies`);

  // Demo company user
  await User.create({
    name: "Demo Company", email: "company@sih25033.com",
    password: await hashPassword("Company@123"), role: "company",
    isEmailVerified: true, isActive: true,
  }).then(async (u) => {
    await Company.create({
      userId: u._id, companyName: "Demo Company Pvt Ltd",
      email: "company@sih25033.com", industry: "Software Development",
      city: "Bengaluru", state: "Karnataka",
      description: "Demo company for testing.",
      verificationStatus: "Verified", isActive: true,
    });
  });

  /* ── Student Users + Profiles ────────────────────────────── */
  const studentPwd = await hashPassword("Student@123");
  const studentProfiles: InstanceType<typeof Student>[] = [];

  for (const s of STUDENT_DATA) {
    const u = await User.create({
      name: s.name, email: s.email, password: studentPwd,
      role: "student", isEmailVerified: true, isActive: true,
    });
    const sp = await Student.create({
      userId: u._id, fullName: s.name, email: s.email,
      university: s.university, branch: s.branch, degree: s.degree,
      cgpa: s.cgpa, graduationYear: 2025,
      city: s.city, state: s.state,
      skills: s.skills.map(sk => ({ name: sk, level: "Intermediate", yearsOfExperience: 1 })),
      interests: s.interests,
      preferredLocations: s.pLoc,
      preferredSectors: s.pSec,
      preferredWorkMode: s.wMode,
      profileCompletion: 75,
      verificationStatus: "Verified", isActive: true,
      education: [{
        degree: s.degree, branch: s.branch, institution: s.university,
        cgpa: s.cgpa, startYear: 2021, isCurrently: true,
      }],
    });
    studentProfiles.push(sp);
  }

  // Demo student
  const demoStudentUser = await User.create({
    name: "Demo Student", email: "student@sih25033.com",
    password: await hashPassword("Student@123"), role: "student",
    isEmailVerified: true, isActive: true,
  });
  const demoStudent = await Student.create({
    userId: demoStudentUser._id, fullName: "Demo Student",
    email: "student@sih25033.com",
    university: "IIT Bombay", branch: "Computer Science", degree: "B.Tech",
    cgpa: 8.5, graduationYear: 2025,
    city: "Mumbai", state: "Maharashtra",
    skills: [
      { name: "React", level: "Advanced", yearsOfExperience: 2 },
      { name: "Node.js", level: "Intermediate", yearsOfExperience: 1 },
      { name: "TypeScript", level: "Intermediate", yearsOfExperience: 1 },
    ],
    interests: ["Web Development", "Full Stack"],
    preferredLocations: ["Mumbai", "Pune", "Bengaluru"],
    preferredSectors: ["Software Development", "Information Technology"],
    preferredWorkMode: "Hybrid",
    profileCompletion: 85,
    verificationStatus: "Verified", isActive: true,
    education: [{
      degree: "B.Tech", branch: "Computer Science", institution: "IIT Bombay",
      cgpa: 8.5, startYear: 2021, isCurrently: true,
    }],
  });
  studentProfiles.push(demoStudent);
  console.log(`✅ Seeded ${STUDENT_DATA.length + 1} students`);

  /* ── Internships ─────────────────────────────────────────── */
  const internshipTemplates = [
    { title:"Full Stack Developer Intern",  sector:"Software Development", skills:["React","Node.js","MongoDB","TypeScript"],    branches:["Computer Science","Information Technology"],        cgpa:7.0, seats:15, stipMin:15000,stipMax:25000, dur:"6 Months",  mode:"Hybrid"   },
    { title:"Data Science Intern",           sector:"Data Science & Analytics",skills:["Python","Machine Learning","Pandas","SQL"], branches:["Computer Science","Electronics & Communication"],  cgpa:7.5, seats:10, stipMin:12000,stipMax:20000, dur:"3 Months",  mode:"Remote"   },
    { title:"Backend Developer Intern",      sector:"Software Development", skills:["Node.js","MongoDB","REST API","Docker"],       branches:["Computer Science","Information Technology"],        cgpa:6.5, seats:12, stipMin:10000,stipMax:18000, dur:"6 Months",  mode:"Hybrid"   },
    { title:"AI/ML Engineer Intern",         sector:"Artificial Intelligence & ML",skills:["Python","TensorFlow","Machine Learning","PyTorch"],branches:["Computer Science","Electronics & Communication"],cgpa:8.0,seats:8,stipMin:18000,stipMax:30000,dur:"6 Months",mode:"Hybrid"},
    { title:"Cloud Infrastructure Intern",   sector:"Cloud Computing",       skills:["AWS","Docker","Linux","CI/CD"],               branches:["Computer Science","Information Technology"],        cgpa:7.0, seats:10, stipMin:15000,stipMax:22000, dur:"3 Months",  mode:"Remote"   },
    { title:"Frontend Developer Intern",     sector:"Software Development", skills:["React","JavaScript","TypeScript","CSS"],       branches:["Computer Science","Information Technology"],        cgpa:6.5, seats:15, stipMin:10000,stipMax:18000, dur:"3 Months",  mode:"Remote"   },
    { title:"Cybersecurity Analyst Intern",  sector:"Cybersecurity",         skills:["Cybersecurity","Linux","Python","Networking"],  branches:["Computer Science","Electronics & Communication"],  cgpa:7.5, seats:6,  stipMin:12000,stipMax:20000, dur:"6 Months",  mode:"On-site"  },
    { title:"Mobile App Developer Intern",   sector:"Software Development", skills:["Flutter","React Native","Firebase"],           branches:["Computer Science","Information Technology"],        cgpa:7.0, seats:8,  stipMin:12000,stipMax:20000, dur:"6 Months",  mode:"Remote"   },
    { title:"DevOps Engineer Intern",        sector:"Cloud Computing",       skills:["Docker","Kubernetes","CI/CD","Linux","AWS"],   branches:["Computer Science","Information Technology"],        cgpa:7.5, seats:6,  stipMin:18000,stipMax:28000, dur:"6 Months",  mode:"Hybrid"   },
    { title:"Data Analyst Intern",           sector:"Data Science & Analytics",skills:["Python","SQL","Power BI","Excel","Pandas"],  branches:["Computer Science","Information Technology","Mechanical Engineering"],cgpa:6.5,seats:12,stipMin:10000,stipMax:15000,dur:"3 Months",mode:"Hybrid"},
    { title:"Java Backend Intern",           sector:"Software Development", skills:["Java","Spring Boot","MySQL","REST API"],        branches:["Computer Science","Information Technology"],        cgpa:7.0, seats:10, stipMin:12000,stipMax:20000, dur:"6 Months",  mode:"On-site"  },
    { title:"UI/UX Design Intern",           sector:"Software Development", skills:["Figma","JavaScript","React","CSS"],            branches:["Computer Science","Information Technology"],        cgpa:6.5, seats:8,  stipMin:10000,stipMax:15000, dur:"3 Months",  mode:"Remote"   },
    { title:"IoT Systems Intern",            sector:"Manufacturing",          skills:["IoT","Embedded C","Python","Arduino"],         branches:["Electronics & Communication","Electronics Engineering","Electrical Engineering"],cgpa:6.5,seats:6,stipMin:8000,stipMax:15000,dur:"3 Months",mode:"On-site"},
    { title:"FinTech Developer Intern",      sector:"FinTech & Finance",     skills:["Java","Spring Boot","PostgreSQL","React"],     branches:["Computer Science","Information Technology"],        cgpa:7.5, seats:8,  stipMin:20000,stipMax:35000, dur:"6 Months",  mode:"Hybrid"   },
    { title:"NLP Research Intern",           sector:"Artificial Intelligence & ML",skills:["Python","Machine Learning","TensorFlow","Data Analysis"],branches:["Computer Science","Electronics & Communication"],cgpa:8.5,seats:4,stipMin:20000,stipMax:40000,dur:"6 Months",mode:"Remote"},
    { title:"Systems Engineer Intern",       sector:"Information Technology",skills:["Linux","Python","C++","System Design"],       branches:["Computer Science","Electronics & Communication"],  cgpa:7.0, seats:8,  stipMin:12000,stipMax:20000, dur:"6 Months",  mode:"On-site"  },
    { title:"EdTech Product Intern",         sector:"EdTech",                skills:["React","Node.js","MongoDB","Agile/Scrum"],     branches:["Computer Science","Information Technology"],        cgpa:7.0, seats:10, stipMin:12000,stipMax:18000, dur:"3 Months",  mode:"Remote"   },
    { title:"Blockchain Developer Intern",   sector:"Software Development", skills:["Blockchain","JavaScript","Node.js","Python"],  branches:["Computer Science","Information Technology"],        cgpa:7.5, seats:4,  stipMin:20000,stipMax:35000, dur:"6 Months",  mode:"Remote"   },
    { title:"Embedded Systems Intern",       sector:"Manufacturing",          skills:["Embedded C","MATLAB","C++","IoT"],            branches:["Electronics & Communication","Electrical Engineering"],cgpa:6.5,seats:6,stipMin:8000,stipMax:15000,dur:"3 Months",mode:"On-site"},
    { title:"Product Analytics Intern",      sector:"Data Science & Analytics",skills:["SQL","Python","Power BI","Excel","Data Analysis"],branches:["Computer Science","Information Technology"],cgpa:6.5,seats:8,stipMin:10000,stipMax:18000,dur:"3 Months",mode:"Hybrid"},
    { title:"React Native App Intern",       sector:"Software Development", skills:["React Native","JavaScript","Firebase","Git"],  branches:["Computer Science","Information Technology"],        cgpa:6.5, seats:6,  stipMin:10000,stipMax:18000, dur:"3 Months",  mode:"Remote"   },
    { title:"Machine Learning Intern",       sector:"Artificial Intelligence & ML",skills:["Python","TensorFlow","Machine Learning","SQL"],branches:["Computer Science"],cgpa:8.0,seats:5,stipMin:20000,stipMax:35000,dur:"6 Months",mode:"Hybrid"},
    { title:"Cloud Security Intern",         sector:"Cybersecurity",         skills:["AWS","Cybersecurity","Linux","Python"],        branches:["Computer Science","Information Technology"],        cgpa:7.5, seats:4,  stipMin:18000,stipMax:28000, dur:"6 Months",  mode:"Remote"   },
    { title:"Digital Marketing Tech Intern", sector:"E-Commerce & Retail",  skills:["Python","SQL","Excel","Data Analysis"],        branches:["Computer Science","Information Technology"],        cgpa:6.0, seats:10, stipMin:8000, stipMax:12000, dur:"3 Months",  mode:"Hybrid"   },
    { title:"GraphQL API Intern",            sector:"Software Development", skills:["GraphQL","Node.js","TypeScript","MongoDB"],    branches:["Computer Science","Information Technology"],        cgpa:7.0, seats:6,  stipMin:15000,stipMax:22000, dur:"6 Months",  mode:"Remote"   },
  ];

  const startDate = new Date("2025-08-01");
  const endDate6  = new Date("2026-01-31");
  const endDate3  = new Date("2025-10-31");
  const deadline  = new Date("2025-07-25");

  const internships: InstanceType<typeof Internship>[] = [];
  for (let i = 0; i < internshipTemplates.length; i++) {
    const tmpl    = internshipTemplates[i];
    const company = companyProfiles[i % companyProfiles.length];
    const loc     = LOCATIONS_DATA[i % LOCATIONS_DATA.length];
    const endDate = tmpl.dur === "6 Months" ? endDate6 : endDate3;

    const intern = await Internship.create({
      companyId:           company._id,
      companyName:         company.companyName,
      title:               tmpl.title,
      description:         `${tmpl.title} role at ${company.companyName}. Join our team and work on real-world ${tmpl.sector} projects. You will gain hands-on experience with ${tmpl.skills.slice(0,3).join(", ")} and more.`,
      sector:              tmpl.sector,
      requiredSkills:      tmpl.skills,
      qualification:       "B.Tech / B.E. / B.Sc",
      eligibleBranches:    tmpl.branches,
      minimumCGPA:         tmpl.cgpa,
      state:               loc.state,
      city:                loc.city,
      workMode:            tmpl.mode as "Remote" | "Hybrid" | "On-site",
      duration:            tmpl.dur,
      stipendMin:          tmpl.stipMin,
      stipendMax:          tmpl.stipMax,
      totalSeats:          tmpl.seats,
      availableSeats:      tmpl.seats,
      startDate,
      endDate,
      applicationDeadline: deadline,
      status:              "Active",
      isPublished:         true,
    });
    internships.push(intern);
  }
  console.log(`✅ Seeded ${internships.length} internships`);

  /* ── Applications ────────────────────────────────────────── */
  const appStatuses = ["Applied","Shortlisted","Applied","Applied","Rejected","Applied","Shortlisted","Applied"];
  let appCount = 0;

  for (const student of studentProfiles.slice(0, 15)) {
    const internCount = 2 + Math.floor(Math.random() * 3); // 2-4 applications per student
    const chosen = internships.sort(() => Math.random() - 0.5).slice(0, internCount);

    for (const intern of chosen) {
      const status = appStatuses[appCount % appStatuses.length] as "Applied" | "Shortlisted" | "Rejected";
      try {
        await Application.create({
          studentId:       student._id,
          internshipId:    intern._id,
          companyId:       intern.companyId,
          studentName:     student.fullName,
          internshipTitle: intern.title,
          companyName:     intern.companyName,
          matchScore:      55 + Math.floor(Math.random() * 40),
          scoreBreakdown: {
            skillMatch: 50 + Math.floor(Math.random() * 50),
            qualification: 60 + Math.floor(Math.random() * 40),
            location: 40 + Math.floor(Math.random() * 60),
            interest: 50 + Math.floor(Math.random() * 50),
            experience: 30 + Math.floor(Math.random() * 70),
          },
          status,
          appliedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        });
        appCount++;
        if (status === "Shortlisted") {
          await Internship.findByIdAndUpdate(intern._id, { $inc: { totalApplications: 1, shortlistedCount: 1 } });
        } else {
          await Internship.findByIdAndUpdate(intern._id, { $inc: { totalApplications: 1 } });
        }
      } catch {
        // Skip duplicate
      }
    }
  }
  console.log(`✅ Seeded ~${appCount} applications`);

  /* ── Allocations ─────────────────────────────────────────── */
  const cycle = "2025-07";
  let allocCount = 0;

  for (const student of studentProfiles.slice(0, 10)) {
    const intern = internships[allocCount % internships.length];
    try {
      await Allocation.create({
        studentId:       student._id,
        internshipId:    intern._id,
        companyId:       intern.companyId,
        studentName:     student.fullName,
        internshipTitle: intern.title,
        companyName:     intern.companyName,
        location:        `${intern.city}, ${intern.state}`,
        workMode:        intern.workMode,
        startDate:       intern.startDate,
        endDate:         intern.endDate,
        stipend:         intern.stipendMin,
        matchScore:      70 + Math.floor(Math.random() * 25),
        scoreBreakdown: {
          skillMatch: 70 + Math.floor(Math.random() * 30),
          qualification: 80 + Math.floor(Math.random() * 20),
          location: 60 + Math.floor(Math.random() * 40),
          interest: 65 + Math.floor(Math.random() * 35),
          experience: 50 + Math.floor(Math.random() * 50),
        },
        allocationRank:   allocCount + 1,
        selectionReasons: ["Strong skill match","Preferred location matched","Qualification criteria satisfied"],
        status:           allocCount < 7 ? "Approved" : "Recommended",
        allocationCycle:  cycle,
      });
      allocCount++;
    } catch {
      // Skip duplicate
    }
  }
  console.log(`✅ Seeded ${allocCount} allocations`);

  /* ── Notifications ───────────────────────────────────────── */
  const notifTypes = ["APPLICATION","SHORTLIST","ALLOCATION","INTERNSHIP","SYSTEM"] as const;
  const notifMessages = [
    { title: "Application Submitted",    message: "Your application has been submitted successfully.", type: "APPLICATION"  as const },
    { title: "You've been shortlisted",  message: "Congratulations! You have been shortlisted for an internship.", type: "SHORTLIST" as const },
    { title: "Internship Allocated",     message: "You have been allocated an internship. Check your dashboard.", type: "ALLOCATION" as const },
    { title: "New Internship Available", message: "A new internship matching your profile is available.", type: "INTERNSHIP" as const },
    { title: "Profile Reminder",         message: "Complete your profile to improve your match score.", type: "SYSTEM" as const },
  ];

  for (const student of studentProfiles.slice(0, 10)) {
    const notif = notifMessages[Math.floor(Math.random() * notifMessages.length)];
    await Notification.create({
      userId:  student.userId,
      title:   notif.title,
      message: notif.message,
      type:    notif.type,
      isRead:  Math.random() > 0.5,
    });
  }
  // Also for admin
  await Notification.create({
    userId:  adminUser._id,
    title:   "System Ready",
    message: "SIH25033 platform seeded successfully.",
    type:    "SYSTEM",
    isRead:  false,
  });
  console.log("✅ Seeded notifications");

  /* ── Assessments with Questions ──────────────────────────── */
  await Assessment.deleteMany({});
  for (let i = 0; i < 5; i++) {
    const intern = internships[i];
    await Assessment.create({
      title:       `${intern.title} — Skill Assessment`,
      description: `Assess your skills for the ${intern.title} role at ${intern.companyName}.`,
      internshipId:intern._id,
      companyId:   intern.companyId,
      duration:    30,
      totalMarks:  50,
      passingMarks:30,
      status:      "Published",
      questions: [
        {
          question:      "Which of the following is a JavaScript framework for building UIs?",
          type:          "MCQ",
          options:       ["Django","React","Spring Boot","Laravel"],
          correctAnswer: "React",
          marks:         10,
          explanation:   "React is a JavaScript library for building user interfaces.",
        },
        {
          question:      "What does REST stand for?",
          type:          "MCQ",
          options:       ["Rapid Execution State Transfer","Representational State Transfer","Remote Execution State Test","None of the above"],
          correctAnswer: "Representational State Transfer",
          marks:         10,
          explanation:   "REST = Representational State Transfer.",
        },
        {
          question:      "Which of the following are NoSQL databases?",
          type:          "MULTIPLE_SELECT",
          options:       ["MySQL","MongoDB","PostgreSQL","Redis"],
          correctAnswer: ["MongoDB","Redis"],
          marks:         15,
          explanation:   "MongoDB and Redis are NoSQL databases.",
        },
        {
          question:      "Git is a version control system.",
          type:          "TRUE_FALSE",
          options:       ["True","False"],
          correctAnswer: "True",
          marks:         5,
          explanation:   "Git is a distributed version control system.",
        },
        {
          question:      "Which HTTP method is used to UPDATE a resource?",
          type:          "MCQ",
          options:       ["GET","POST","PUT","DELETE"],
          correctAnswer: "PUT",
          marks:         10,
          explanation:   "PUT is used to update an existing resource.",
        },
      ],
    });
  }
  console.log("✅ Seeded 5 assessments with questions");

  /* ── Summary ─────────────────────────────────────────────── */
  console.log("\n✅ ========= SEED COMPLETE =========");
  console.log("📧 Demo Credentials:");
  console.log("   Admin   : admin@sih25033.com   / Admin@123");
  console.log("   Company : company@sih25033.com / Company@123");
  console.log("   Student : student@sih25033.com / Student@123");
  console.log("=".repeat(40));

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  mongoose.disconnect().finally(() => process.exit(1));
});
