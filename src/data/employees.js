const employees = [
  {
    id: 1,
    name: "John Russo",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4.5,
    department: "Engineering",
    hireDate: "2022-03-15",
    contactInfo: {
      email: "john.russo@abk-people.com",
      phone: "+1-555-0123",
    },
    password: "JohnEng2022!",
    skills: [
      {
        id: 11,
        name: "React Native",
        proficiency: "Advanced",
        yearsExperience: 4,
      },
      {
        id: 12,
        name: "JavaScript",
        proficiency: "Expert",
        yearsExperience: 6,
      },
      {
        id: 13,
        name: "Team Leadership",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
    ],
    position: "Senior Developer",
    description: "Mobile app development specialist",
    status: "Inactive",
    hrSpecific: null,
    role: "user", // Added role
  },
  {
    id: 2,
    name: "Li Mei Chen",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.2,
    department: "Marketing",
    hireDate: "2021-08-22",
    contactInfo: {
      email: "limei.chen@abk-people.com",
      phone: "+1-555-0124",
    },
    password: "LiMeiMkt2021!",
    skills: [
      {
        id: 14,
        name: "Digital Marketing",
        proficiency: "Expert",
        yearsExperience: 5,
      },
      {
        id: 15,
        name: "Content Creation",
        proficiency: "Advanced",
        yearsExperience: 3,
      },
      {
        id: 16,
        name: "SEO",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
    ],
    position: "Marketing Manager",
    description: "Digital campaign strategist",
    status: "Active",
    hrSpecific: null,
    role: "user", // Added role
  },
  {
    id: 3,
    name: "Carlos Martinez",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4.7,
    department: "Sales",
    hireDate: "2020-11-10",
    contactInfo: {
      email: "carlos.martinez@abk-people.com",
      phone: "+1-555-0125",
    },
    password: "CarlosSales2020!",
    skills: [
      {
        id: 17,
        name: "Client Relations",
        proficiency: "Expert",
        yearsExperience: 6,
      },
      {
        id: 18,
        name: "Negotiation",
        proficiency: "Advanced",
        yearsExperience: 4,
      },
      {
        id: 19,
        name: "CRM Software",
        proficiency: "Intermediate",
        yearsExperience: 3,
      },
    ],
    position: "Sales Lead",
    description: "Top-performing sales professional",
    status: "Active",
    hrSpecific: null,
    role: "user", // Added role
  },
  {
    id: 4,
    name: "Ahmad Al-Khalid",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 4.8,
    department: "Finance",
    hireDate: "2019-06-18",
    contactInfo: {
      email: "ahmad.alkhalid@abk-people.com",
      phone: "+1-555-0127",
    },
    password: "AhmadFin2019!",
    skills: [
      {
        id: 23,
        name: "Financial Analysis",
        proficiency: "Expert",
        yearsExperience: 7,
      },
      {
        id: 24,
        name: "Budget Planning",
        proficiency: "Advanced",
        yearsExperience: 5,
      },
      {
        id: 25,
        name: "Accounting Software",
        proficiency: "Intermediate",
        yearsExperience: 3,
      },
    ],
    position: "Finance Manager",
    description: "Strategic financial planner",
    status: "Active",
    hrSpecific: null,
    role: "user", // Added role
  },
  // HR Employees
  {
    id: 5,
    name: "Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4.6,
    department: "Human Resources",
    hireDate: "2023-01-05",
    contactInfo: {
      email: "priya.sharma@abk-people.com",
      phone: "+1-555-0126",
    },
    password: "PriyaHR2023!",
    skills: [
      {
        id: 11,
        name: "Recruitment",
        proficiency: "Advanced",
        yearsExperience: 3,
      },
      {
        id: 12,
        name: "Employee Training",
        proficiency: "Expert",
        yearsExperience: 5,
      },
      {
        id: 13,
        name: "Conflict Resolution",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
    ],
    position: "HR Specialist",
    description: "Employee relations and training expert",
    status: "Active",
    hrSpecific: {
      certifications: ["SHRM-CP"],
      yearsInHR: 6,
      specialties: ["Talent Acquisition", "Employee Engagement"],
    },
    role: "user", // Added role
  },
  {
    id: 6,
    name: "David Kim",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 4.8,
    department: "Human Resources",
    hireDate: "2020-09-12",
    contactInfo: {
      email: "david.kim@abk-people.com",
      phone: "+1-555-0128",
    },
    password: "David2020#HR",
    skills: [
      {
        id: 14,
        name: "Payroll Management",
        proficiency: "Expert",
        yearsExperience: 7,
      },
      {
        id: 15,
        name: "Benefits Administration",
        proficiency: "Advanced",
        yearsExperience: 5,
      },
      {
        id: 16,
        name: "Compliance",
        proficiency: "Intermediate",
        yearsExperience: 3,
      },
    ],
    position: "HR Manager",
    description: "Oversees payroll and benefits programs",
    status: "Active",
    hrSpecific: {
      certifications: ["PHR", "CPP"],
      yearsInHR: 8,
      specialties: ["Compensation", "Regulatory Compliance"],
    },
    role: "user", // Added role
  },
  {
    id: 7,
    name: "Sofia Alvarez",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    rating: 4.4,
    department: "Human Resources",
    hireDate: "2022-06-20",
    contactInfo: {
      email: "sofia.alvarez@abk-people.com",
      phone: "+1-555-0129",
    },
    password: "SofiaHR22$",
    skills: [
      {
        id: 17,
        name: "Onboarding",
        proficiency: "Advanced",
        yearsExperience: 3,
      },
      {
        id: 18,
        name: "HR Analytics",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
      {
        id: 19,
        name: "Diversity Training",
        proficiency: "Expert",
        yearsExperience: 4,
      },
    ],
    position: "HR Coordinator",
    description: "Supports onboarding and diversity initiatives",
    status: "Active",
    hrSpecific: {
      certifications: ["aPHR"],
      yearsInHR: 4,
      specialties: ["Onboarding", "Diversity & Inclusion"],
    },
    role: "user", // Added role
  },
  {
    id: 8,
    name: "Marcus Johnson",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    rating: 4.9,
    department: "Human Resources",
    hireDate: "2018-04-01",
    contactInfo: {
      email: "marcus.johnson@abk-people.com",
      phone: "+1-555-0130",
    },
    password: "MarcusHR2018*",
    skills: [
      {
        id: 20,
        name: "Labor Relations",
        proficiency: "Expert",
        yearsExperience: 10,
      },
      {
        id: 21,
        name: "Performance Management",
        proficiency: "Advanced",
        yearsExperience: 8,
      },
      {
        id: 22,
        name: "Policy Development",
        proficiency: "Expert",
        yearsExperience: 7,
      },
    ],
    position: "Director of HR",
    description: "Leads HR strategy and labor negotiations",
    status: "Active",
    hrSpecific: {
      certifications: ["SPHR", "GPHR"],
      yearsInHR: 12,
      specialties: ["Strategic HR", "Labor Law"],
    },
    role: "user",
  },
  {
    id: 9,
    name: "Aisha Patel",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    rating: 4.7,
    department: "Human Resources",
    hireDate: "2021-11-15",
    contactInfo: {
      email: "aisha.patel@abk-people.com",
      phone: "+1-555-0131",
    },
    password: "Aisha21@HR",
    skills: [
      {
        id: 23,
        name: "Employee Wellness",
        proficiency: "Advanced",
        yearsExperience: 4,
      },
      {
        id: 24,
        name: "HRIS Systems",
        proficiency: "Expert",
        yearsExperience: 5,
      },
      {
        id: 25,
        name: "Change Management",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
    ],
    position: "HR Business Partner",
    description: "Focuses on employee wellness and HR technology",
    status: "Active",
    hrSpecific: {
      certifications: ["SHRM-SCP"],
      yearsInHR: 6,
      specialties: ["Wellness Programs", "HR Technology"],
    },
    role: "user",
  },
  {
    id: 10,
    name: "Abdulaziz AlMarifi",
    image:
      "https://png.pngtree.com/png-vector/20191125/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg",
    rating: 4.7,
    department: "Human Resources",
    hireDate: "2021-11-15",
    contactInfo: {
      email: "Abdulaziz-AlMarifi@abk-people.com",
      phone: "+1-555-0131",
    },
    password: "Abdulaziz@Admin",
    skills: [
      {
        id: 23,
        name: "Employee Wellness",
        proficiency: "Advanced",
        yearsExperience: 4,
      },
      {
        id: 24,
        name: "HRIS Systems",
        proficiency: "Expert",
        yearsExperience: 5,
      },
      {
        id: 25,
        name: "Change Management",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
    ],
    position: "HR Business Partner",
    description: "Focuses on employee wellness and HR technology",
    status: "Active",
    hrSpecific: {
      certifications: ["SHRM-SCP"],
      yearsInHR: 6,
      specialties: ["Wellness Programs", "HR Technology"],
    },
    role: "admin",
  },
  {
    id: 11,
    name: "Abdullah AlHirz",
    image:
      "https://png.pngtree.com/png-vector/20191125/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg",
    rating: 4.7,
    department: "Human Resources",
    hireDate: "2021-11-15",
    contactInfo: {
      email: "Abdullah-AlHirz@abk-people.com",
      phone: "+1-555-0131",
    },
    password: "Abdullah@Admin",
    skills: [
      {
        id: 23,
        name: "Employee Wellness",
        proficiency: "Advanced",
        yearsExperience: 4,
      },
      {
        id: 24,
        name: "HRIS Systems",
        proficiency: "Expert",
        yearsExperience: 5,
      },
      {
        id: 25,
        name: "Change Management",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
    ],
    position: "HR Business Partner",
    description: "Focuses on employee wellness and HR technology",
    status: "Active",
    hrSpecific: {
      certifications: ["SHRM-SCP"],
      yearsInHR: 6,
      specialties: ["Wellness Programs", "HR Technology"],
    },
    role: "admin",
  },
  {
    id: 12,
    name: "Admin",
    image:
      "https://png.pngtree.com/png-vector/20191125/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg",
    rating: 4.7,
    department: "Human Resources",
    hireDate: "2021-11-15",
    contactInfo: {
      email: "Admin",
      phone: "+1-555-0131",
    },
    password: "Admin",
    skills: [
      {
        id: 23,
        name: "Employee Wellness",
        proficiency: "Advanced",
        yearsExperience: 4,
      },
      {
        id: 24,
        name: "HRIS Systems",
        proficiency: "Expert",
        yearsExperience: 5,
      },
      {
        id: 25,
        name: "Change Management",
        proficiency: "Intermediate",
        yearsExperience: 2,
      },
    ],
    position: "HR Business Partner",
    description: "Focuses on employee wellness and HR technology",
    status: "Active",
    hrSpecific: {
      certifications: ["SHRM-SCP"],
      yearsInHR: 6,
      specialties: ["Wellness Programs", "HR Technology"],
    },
    role: "admin",
  },
];

export default employees;
