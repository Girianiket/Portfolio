export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  type: 'sql' | 'bi' | 'excel';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
  details?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  color: string;
}

export const PERSONAL_INFO = {
  name: 'Aniket Giri',
  title: 'Data Analyst | BI Enthusiast | Aspiring PM',
  fullTitle: 'Data Analyst | Business Intelligence Enthusiast | Aspiring Product Manager',
  location: 'Noida, India',
  email: 'girianiket468@gmail.com',
  phone: '+91-8929080364',
  linkedin: 'https://www.linkedin.com/in/aniket-g-045833255',
  github: 'https://github.com/Girianiket',
  image: '/src/assets/images/aniket_professional_portrait_1783169290028.jpg',
  aboutSummary: `Results-driven analyst passionate about transforming complex datasets into actionable insights using SQL, Power BI, Excel, and Python. Interested in Product Management, business strategy, and data-driven decision making. Experienced in converting raw data into business insights and supporting strategic decisions through data visualization and reporting.`,
  highlights: [
    { title: 'Analytical Mindset', desc: 'Decoding complex multi-dimensional data trends' },
    { title: 'Product Thinking', desc: 'Aligning data metrics with product growth goals' },
    { title: 'KPI Reporting', desc: 'Developing actionable dashboards for executive decisions' },
    { title: 'Stakeholder Alignment', desc: 'Bridging the gap between technical data & business needs' },
    { title: 'Dashboard Building', desc: 'Crafting highly intuitive & readable BI solutions' },
    { title: 'Data Storytelling', desc: 'Translating numbers into compelling, structured narratives' },
    { title: 'Business Strategy', desc: 'Uncovering market opportunities and optimizing operations' }
  ]
};

export const SKILLS: SkillCategory[] = [
  {
    title: 'Programming & Query',
    skills: [
      { name: 'SQL (PostgreSQL / SSMS)', level: 90 },
      { name: 'Python (Pandas / NumPy)', level: 80 }
    ]
  },
  {
    title: 'Data Analytics & BI',
    skills: [
      { name: 'Power BI & DAX', level: 95 },
      { name: 'Advanced Excel & VBA', level: 92 },
      { name: 'SSMS & SSRS', level: 85 },
      { name: 'Google Analytics', level: 78 }
    ]
  },
  {
    title: 'Product & Business Skills',
    skills: [
      { name: 'Product Roadmap Planning', level: 85 },
      { name: 'PRD Documentation', level: 82 },
      { name: 'Feature Prioritization (RICE/Kano)', level: 88 },
      { name: 'A/B Testing & Experimentation', level: 80 },
      { name: 'Competitive & Market Analysis', level: 85 }
    ]
  },
  {
    title: 'Core Competencies',
    skills: [
      { name: 'Data Visualization & Reporting', level: 95 },
      { name: 'ETL & Data Modeling', level: 88 },
      { name: 'Statistical Analysis', level: 82 },
      { name: 'SEO & Keyword Analytics', level: 85 }
    ]
  },
  {
    title: 'Tools & Workspace',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Figma', level: 75 },
      { name: 'Semrush', level: 80 },
      { name: 'Notion', level: 90 }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'SEO and Analytics Intern',
    company: 'Salesix AI',
    period: 'Apr 2026 – Present',
    description: [
      'Improved search rankings and organic growth through metrics-driven SEO optimization.',
      'Conducted extensive competitor analysis across AI voice platforms to extract market gaps.',
      'Delivered product positioning insights to bridge features with targeted user segments.',
      'Performed keyword gap analysis and generated structured reports to drive content roadmap decisions.'
    ],
    tags: ['SEO Analytics', 'Competitor Analysis', 'Product Positioning', 'Semrush']
  },
  {
    role: 'Technical & Analytics Intern',
    company: 'Giribroadband Company',
    period: 'Sep 2025 – Present',
    description: [
      'Built interactive analytical dashboards to track service performance and team efficiency.',
      'Analyzed customer behavior trends and connection drop points to reduce churn rate.',
      'Resolved complex customer technical issues while compiling reports to prevent recurring faults.',
      'Improved overall customer support operations and response times using structured data reporting.'
    ],
    tags: ['Power BI', 'Customer Behavior', 'SSRS', 'Operations Analytics']
  },
  {
    role: 'Research Analyst',
    company: 'EvePaper',
    period: 'Nov 2025 – Feb 2026',
    description: [
      'Conducted exhaustive market and business research for tech-enabled educational publications.',
      'Supported business intelligence initiatives by aggregating and structuring high-volume market datasets.',
      'Mentored and coordinated a team of junior interns, reviewing analytical output and structured findings.',
      'Prepared detailed market intelligence slide decks and executive summaries for stakeholders.'
    ],
    tags: ['Market Research', 'Business Intelligence', 'Data Structuring', 'Leadership']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'walmart',
    title: 'Walmart Sales Analysis',
    category: 'SQL, Excel & Data Analytics',
    description: 'Analyzed massive Walmart sales datasets using SQL queries, complex joins, nested subqueries, window functions, and KPI analysis to identify seasonal sales trends, top-performing product categories, and major operational growth opportunities.',
    tech: ['SQL', 'Excel', 'SSMS', 'Data Wrangling'],
    github: 'https://github.com/Girianiket',
    live: '#',
    type: 'sql'
  },
  {
    id: 'hr-dashboard',
    title: 'HR Analytics Dashboard',
    category: 'Power BI, Power Query & DAX',
    description: 'Developed an end-to-end interactive HR Analytics dashboard analyzing company-wide employee attrition rates, average salary trends, role satisfaction, and overall workforce demographics. Integrated dynamic Power Query ETL pipelines and advanced DAX measures for real-time filtering and drill-down analytics.',
    tech: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'],
    github: 'https://github.com/Girianiket',
    live: '#',
    type: 'bi'
  },
  {
    id: 'blinkit',
    title: 'Blinkit Sales Dashboard',
    category: 'Advanced Excel & Pivot Charts',
    description: 'Built a business-oriented grocery sales performance dashboard utilizing advanced Excel formulas (XLOOKUP, SUMIFS), pivot charts, and conditional formatting. Delivered visual breakdowns of product category revenue, outlet sizes performance, and operational growth KPIs.',
    tech: ['Excel', 'Pivot Tables', 'Advanced Formulas', 'KPI Tracking'],
    github: 'https://github.com/Girianiket',
    live: '#',
    type: 'excel'
  }
];

export const EDUCATION_HISTORY: Education[] = [
  {
    degree: 'B.Tech in Electronics and Communication Engineering',
    institution: 'ABES Engineering College, Ghaziabad',
    period: '2021 – 2025',
    score: 'CGPA: 7.54',
    details: ['Focus on analytical thinking, hardware systems, signal processing, and numerical modeling.']
  },
  {
    degree: 'Class 12th (Intermediate)',
    institution: 'Delhi Board / CBSE School',
    period: '2020 – 2021',
    score: 'Score: 91.6%',
    details: ['Stream: Science (Physics, Chemistry, Mathematics). Developed foundational mathematical and analytical skills.']
  },
  {
    degree: 'Class 10th (High School)',
    institution: 'Delhi Board / CBSE School',
    period: '2018 – 2019',
    score: 'Score: 86%',
    details: ['Achieved excellence in Mathematics and Science.']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Data Analyst Certification',
    issuer: 'Easy Data School',
    date: '2025',
    color: 'from-[#06B6D4]/20 to-[#3B82F6]/20 text-[#06B6D4] border-[#06B6D4]/30'
  },
  {
    name: 'Data Science Methodologies',
    issuer: 'IBM',
    date: '2025',
    color: 'from-[#3B82F6]/20 to-[#8B5CF6]/20 text-[#3B82F6] border-[#3B82F6]/30'
  },
  {
    name: 'Python using AI',
    issuer: 'Authorized Training Center',
    date: '2025',
    color: 'from-[#8B5CF6]/20 to-[#06B6D4]/20 text-[#8B5CF6] border-[#8B5CF6]/30'
  }
];
