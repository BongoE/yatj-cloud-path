// ── QUESTIONS ─────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'name',
    type: 'text',
    number: '01',
    text: 'What is your first name?',
    hint: 'We\'ll use this to personalise your result.',
    placeholder: 'e.g. Amara',
  },
  {
    id: 'role',
    type: 'choice',
    number: '02',
    text: 'What is your current career?',
    hint: 'Pick the one that is closest to what you do today.',
    choices: [
      { value: 'banking',    icon: '🏦', label: 'Banking / Finance', desc: 'Accountant, analyst, teller, compliance, risk' },
      { value: 'healthcare', icon: '🏥', label: 'Healthcare / Nursing', desc: 'Nurse, carer, paramedic, pharmacy, admin' },
      { value: 'teaching',   icon: '📚', label: 'Teaching / Education', desc: 'Teacher, lecturer, trainer, curriculum' },
      { value: 'logistics',  icon: '🚚', label: 'Logistics / Operations', desc: 'Supply chain, warehouse, driver, ops manager' },
      { value: 'customer',   icon: '🎧', label: 'Customer Service / Retail', desc: 'Support agent, sales, retail, hospitality' },
      { value: 'admin',      icon: '📋', label: 'Admin / Project Management', desc: 'PA, coordinator, project manager, HR' },
      { value: 'other',      icon: '💼', label: 'Something else', desc: 'A background not listed above' },
    ],
  },
  {
    id: 'years',
    type: 'choice',
    number: '03',
    text: 'How long have you been in your current field?',
    hint: 'Your experience is a transferable asset — not a barrier.',
    choices: [
      { value: 'lt2',   icon: '🌱', label: 'Less than 2 years', desc: '' },
      { value: '2to5',  icon: '📈', label: '2 to 5 years', desc: '' },
      { value: '5to10', icon: '⭐', label: '5 to 10 years', desc: '' },
      { value: 'gt10',  icon: '🏆', label: 'More than 10 years', desc: '' },
    ],
  },
  {
    id: 'excites',
    type: 'choice',
    number: '04',
    text: 'What excites you most about tech?',
    hint: 'Choose the one that makes you lean forward.',
    choices: [
      { value: 'building',    icon: '🔧', label: 'Building and automating things', desc: 'Making processes run themselves' },
      { value: 'data',        icon: '📊', label: 'Working with data', desc: 'Finding patterns and insights in numbers' },
      { value: 'security',    icon: '🔐', label: 'Keeping systems safe', desc: 'Protecting people and organisations' },
      { value: 'helping',     icon: '🤝', label: 'Helping people use technology', desc: 'Support, training, explaining complex things simply' },
      { value: 'designing',   icon: '🎨', label: 'Designing digital products', desc: 'How things look and feel to users' },
      { value: 'managing',    icon: '🗂️', label: 'Managing technology projects', desc: 'Delivery, coordination, strategy' },
    ],
  },
  {
    id: 'workstyle',
    type: 'choice',
    number: '05',
    text: 'How do you work best?',
    hint: 'There is no wrong answer — this helps us match you to the right environment.',
    choices: [
      { value: 'solo',     icon: '🎧', label: 'Solo deep focus', desc: 'I do my best work alone with headphones on' },
      { value: 'people',   icon: '👥', label: 'With people', desc: 'I thrive when collaborating and communicating' },
      { value: 'leading',  icon: '🧭', label: 'Leading and coordinating', desc: 'I like owning outcomes and directing work' },
      { value: 'pressure', icon: '⚡', label: 'Under pressure', desc: 'I come alive when things are urgent and high stakes' },
    ],
  },
  {
    id: 'timeline',
    type: 'choice',
    number: '06',
    text: 'When do you want to make this transition?',
    hint: 'Be honest — your timeline shapes your plan.',
    choices: [
      { value: '6m',       icon: '🚀', label: 'Within 6 months', desc: 'I\'m ready to move fast' },
      { value: '12m',      icon: '📅', label: 'Within 12 months', desc: 'Steady and focused' },
      { value: '2y',       icon: '🌍', label: 'Within 2 years', desc: 'Building while I work' },
      { value: 'someday',  icon: '💭', label: 'Someday — I\'m still exploring', desc: 'Not yet committed' },
    ],
  },
  {
    id: 'passion',
    type: 'text',
    number: '07',
    text: 'What could you talk about for hours?',
    hint: 'Not tech necessarily. What topic makes you lose track of time?',
    placeholder: 'e.g. How hospitals could work better, financial systems, teaching people new skills…',
  },
  {
    id: 'dream',
    type: 'text',
    number: '08',
    text: 'Describe your dream role in 2 to 3 years.',
    hint: 'Where do you see yourself? What kind of work, team, and life?',
    placeholder: 'e.g. Working remotely as a cloud engineer, finally owning my time…',
  },
  {
    id: 'fear',
    type: 'choice',
    number: '09',
    text: 'What is your biggest fear about making this change?',
    hint: 'Name it. It\'s more common than you think.',
    choices: [
      { value: 'toolate',  icon: '⏰', label: 'I\'m too old or it\'s too late', desc: '' },
      { value: 'tooslow',  icon: '🐢', label: 'I\'ll be too slow to learn', desc: '' },
      { value: 'money',    icon: '💰', label: 'I can\'t afford to take the risk', desc: '' },
      { value: 'belong',   icon: '🚪', label: 'I don\'t belong in tech', desc: '' },
      { value: 'notime',   icon: '⌛', label: 'I don\'t have enough time', desc: '' },
      { value: 'alone',    icon: '🏝️', label: 'I\'ll have to figure it out alone', desc: '' },
    ],
  },
];

// ── CAREER PATHS ───────────────────────────────────────────────────────────
// Maps [role][excites] → recommended paths
const PATHS = {
  banking: {
    building:  ['devops', 'cloud_engineer'],
    data:      ['data_analyst', 'cloud_engineer'],
    security:  ['cloud_security', 'devops'],
    helping:   ['cloud_support', 'solutions_arch'],
    designing: ['solutions_arch', 'cloud_support'],
    managing:  ['cloud_pm', 'solutions_arch'],
  },
  healthcare: {
    building:  ['devops', 'cloud_engineer'],
    data:      ['data_analyst', 'health_informatics'],
    security:  ['cloud_security', 'devops'],
    helping:   ['cloud_support', 'health_informatics'],
    designing: ['cloud_support', 'solutions_arch'],
    managing:  ['cloud_pm', 'solutions_arch'],
  },
  teaching: {
    building:  ['devops', 'cloud_engineer'],
    data:      ['data_analyst', 'cloud_support'],
    security:  ['cloud_security', 'cloud_support'],
    helping:   ['cloud_support', 'dev_advocacy'],
    designing: ['dev_advocacy', 'cloud_support'],
    managing:  ['cloud_pm', 'dev_advocacy'],
  },
  logistics: {
    building:  ['devops', 'cloud_engineer'],
    data:      ['data_analyst', 'cloud_engineer'],
    security:  ['cloud_security', 'devops'],
    helping:   ['cloud_support', 'solutions_arch'],
    designing: ['solutions_arch', 'cloud_pm'],
    managing:  ['cloud_pm', 'solutions_arch'],
  },
  customer: {
    building:  ['cloud_support', 'devops'],
    data:      ['data_analyst', 'cloud_support'],
    security:  ['cloud_security', 'cloud_support'],
    helping:   ['cloud_support', 'dev_advocacy'],
    designing: ['dev_advocacy', 'cloud_pm'],
    managing:  ['cloud_pm', 'cloud_support'],
  },
  admin: {
    building:  ['devops', 'cloud_pm'],
    data:      ['data_analyst', 'cloud_pm'],
    security:  ['cloud_security', 'cloud_pm'],
    helping:   ['cloud_pm', 'cloud_support'],
    designing: ['cloud_pm', 'solutions_arch'],
    managing:  ['cloud_pm', 'solutions_arch'],
  },
  other: {
    building:  ['devops', 'cloud_engineer'],
    data:      ['data_analyst', 'cloud_support'],
    security:  ['cloud_security', 'devops'],
    helping:   ['cloud_support', 'solutions_arch'],
    designing: ['dev_advocacy', 'cloud_pm'],
    managing:  ['cloud_pm', 'solutions_arch'],
  },
};

// ── ROLE DEFINITIONS ───────────────────────────────────────────────────────
const ROLES = {
  devops: {
    title: 'DevOps / Platform Engineer',
    desc: 'You build the pipelines and infrastructure that take code from a developer\'s laptop to production. Automation, reliability, and speed are your craft.',
    salary: 'UK: £55k–£90k · US: $95k–$145k · Canada: CA$85k–$130k',
    cert: 'AWS DevOps Engineer Professional',
  },
  cloud_engineer: {
    title: 'Cloud Engineer',
    desc: 'You design, deploy, and manage cloud infrastructure. Think of yourself as the architect and builder of the digital environments where everything runs.',
    salary: 'UK: £50k–£85k · US: $90k–$140k · Canada: CA$80k–$125k',
    cert: 'AWS Solutions Architect Associate',
  },
  cloud_security: {
    title: 'Cloud Security Engineer',
    desc: 'You protect cloud environments from threats, ensure compliance, and make sure only the right people and systems have access to the right things.',
    salary: 'UK: £60k–£100k · US: $100k–$160k · Canada: CA$90k–$140k',
    cert: 'AWS Security Specialty',
  },
  data_analyst: {
    title: 'Cloud Data Analyst',
    desc: 'You turn raw data into decisions. Using cloud data tools you find patterns, build dashboards, and tell the story that numbers are trying to tell.',
    salary: 'UK: £40k–£70k · US: $75k–$120k · Canada: CA$65k–$105k',
    cert: 'AWS Cloud Practitioner + Data Analytics course',
  },
  cloud_support: {
    title: 'Cloud Support / Solutions Engineer',
    desc: 'You are the bridge between the technology and the people using it. You troubleshoot, explain, and help organisations get value from cloud.',
    salary: 'UK: £35k–£60k · US: $65k–$100k · Canada: CA$60k–$95k',
    cert: 'AWS Cloud Practitioner',
  },
  solutions_arch: {
    title: 'Solutions Architect',
    desc: 'You design cloud systems that solve business problems. You talk to stakeholders, understand requirements, and draw the map that engineers build.',
    salary: 'UK: £65k–£110k · US: $120k–$180k · Canada: CA$100k–$155k',
    cert: 'AWS Solutions Architect Professional',
  },
  cloud_pm: {
    title: 'Cloud Product / Programme Manager',
    desc: 'You lead the delivery of cloud projects and products. Technical enough to understand the work, strategic enough to align it with business goals.',
    salary: 'UK: £55k–£95k · US: $100k–$160k · Canada: CA$85k–$140k',
    cert: 'AWS Cloud Practitioner + PMP or PRINCE2',
  },
  dev_advocacy: {
    title: 'Developer Advocate / Technical Educator',
    desc: 'You teach, explain, and inspire. You create content, give talks, and help developers understand and adopt cloud technologies.',
    salary: 'UK: £50k–£85k · US: $95k–$145k · Canada: CA$80k–$130k',
    cert: 'AWS Cloud Practitioner + strong public portfolio',
  },
  health_informatics: {
    title: 'Health Informatics / Digital Health Engineer',
    desc: 'You apply cloud and data technology to improve healthcare systems. Your clinical background gives you an edge no computer science graduate has.',
    salary: 'UK: £45k–£80k · US: $85k–$130k · Canada: CA$75k–$120k',
    cert: 'AWS Cloud Practitioner + HL7/FHIR fundamentals',
  },
};

// ── TRANSFERABLE SKILLS BRIDGE ─────────────────────────────────────────────
const BRIDGES = {
  banking: {
    devops:       'Your banking background taught you risk management, compliance, and the cost of failure. DevOps engineering is built on exactly those instincts — reliability, change management, and knowing that a broken pipeline has a real cost.',
    cloud_engineer:'Risk frameworks, data governance, and audit trails from banking map directly to cloud architecture. You already understand why controls exist. Now you\'ll build them.',
    cloud_security:'Compliance, fraud prevention, and regulatory frameworks are the language of both banking and cloud security. You don\'t need to start from zero — you need to learn the technical vocabulary for what you already know.',
    data_analyst:  'You have spent years working with financial data, spotting anomalies, and communicating numbers to decision-makers. Cloud data analytics is the same skill with bigger datasets and better tools.',
    cloud_support: 'Banking taught you to work under pressure, explain complex things clearly, and care about accuracy. Cloud support engineering needs exactly that.',
    solutions_arch:'Understanding how business requirements become technical specifications is something you practised every time you designed a financial product or process. Architecture is the same translation skill.',
    cloud_pm:      'Project delivery, stakeholder management, regulatory timelines — banking gave you all of this. Cloud programme management is the same discipline in a faster-moving environment.',
    default:       'Your years in banking built instincts around risk, accuracy, and working in high-stakes environments. Those are rare in tech and more valuable than you think.',
  },
  healthcare: {
    devops:       'Healthcare taught you what happens when systems fail — people get hurt. That urgency is exactly what drives great DevOps engineers. You understand reliability at a level most engineers learn the hard way.',
    cloud_engineer:'Clinical protocols, patient data governance, and system interdependencies translate directly to cloud architecture. You already think in systems.',
    cloud_security:'Patient data protection, HIPAA, GDPR — you\'ve been practising data security principles every day. Cloud security is the technical implementation of what you already believe.',
    data_analyst:  'Clinical data, patient outcomes, resource allocation — you\'ve worked with data that matters. That context makes you a better analyst than someone who only knows spreadsheets.',
    health_informatics: 'Your clinical experience and technology skills together put you in a category that is genuinely rare and in high demand. Health systems desperately need people who understand both worlds.',
    cloud_support: 'You explain complex information clearly under pressure, every day. Cloud support engineers do the same thing — just with infrastructure instead of diagnoses.',
    default:       'Healthcare gave you systems thinking, protocol discipline, and the understanding that details matter. Cloud engineering is the same rigour in a different environment.',
  },
  teaching: {
    dev_advocacy:  'You already do what developer advocates do: take complex ideas and make them accessible. The audience changes. The skill is identical.',
    cloud_support: 'Teachers are natural cloud support engineers. You explain things clearly, you\'re patient, and you understand how people learn. That\'s the whole job.',
    cloud_pm:      'Curriculum design, project delivery, managing diverse stakeholders — teaching is project management. You just haven\'t called it that.',
    data_analyst:  'Assessment data, student outcomes, resource planning — you\'ve been doing data analysis for years. The tools get more powerful, not more complicated.',
    default:       'Teaching gave you the ability to explain complexity clearly and the patience to bring people along. Those are some of the most undervalued skills in tech.',
  },
  logistics: {
    devops:       'Supply chains and deployment pipelines are the same problem: moving things from one state to another reliably, at scale, without breaking. You already understand the principles.',
    cloud_engineer:'End-to-end systems thinking, bottleneck analysis, and scale — logistics is infrastructure. You\'ve been doing infrastructure work for years.',
    solutions_arch:'Logistics taught you to see the whole system, not just the part in front of you. Solutions architects do the same thing with cloud services.',
    default:       'Logistics built your systems thinking, your instinct for bottlenecks, and your understanding of scale. All three are exactly what cloud engineering demands.',
  },
  customer: {
    cloud_support: 'Customer service is cloud support with a different stack. You already have the most important skills: communication under pressure, empathy, and the ability to explain technical things to non-technical people.',
    dev_advocacy:  'You know what customers struggle with. That perspective is gold in a developer advocate role — you\'re the voice of the user.',
    default:       'Customer-facing work taught you communication, empathy, and how to solve problems when the stakes are high. Those are rare in tech.',
  },
  admin: {
    cloud_pm:      'You have been doing project management. Adding cloud knowledge to your existing coordination and delivery skills puts you ahead of most cloud PM candidates.',
    solutions_arch:'Understanding what different teams need and translating that into workable solutions is the core of solutions architecture. You\'ve been doing the human side; now you add the technical layer.',
    default:       'Administrative and project roles built your coordination instincts, stakeholder management, and delivery focus. Tech needs more people who can bridge the human and technical sides.',
  },
  other: {
    default: 'Whatever your background, the years you\'ve spent developing professional instincts — problem-solving, communication, working under pressure — are assets that most tech bootcamp graduates simply don\'t have.',
  },
};

// ── FEAR RESPONSES ─────────────────────────────────────────────────────────
const FEAR_RESPONSES = {
  toolate:  'You\'re not too late. The cloud industry is growing faster than universities can produce graduates. Companies are actively looking for people with real-world experience who have added cloud skills — that\'s a more valuable profile than a 22-year-old with a CS degree and nothing else.',
  tooslow:  'You won\'t be too slow. The people who struggle are the ones trying to learn everything at once. The plan below is specific to where you\'re going, not a firehose of everything cloud. Thirty focused minutes a day, pointed at the right things, is faster than it sounds.',
  money:    'You don\'t need to quit your job or take a pay cut to start. The plan below uses free resources. The transition happens while you\'re still employed — you step into the new career when it\'s ready, not before.',
  belong:   'You belong here. The person who told you tech is only for certain kinds of people was wrong, and the industry is slowly proving it. Your background is an advantage, not a disqualification. The people succeeding in cloud transitions are exactly the ones who thought they didn\'t belong.',
  notime:   'You don\'t need a lot of time. You need consistent time. The plan below is built for a full life — a job, a family, real responsibilities. Thirty focused minutes most days is enough. It takes longer, but it works.',
  alone:    'You don\'t have to figure this out alone. That\'s exactly why this exists. The community of African professionals making this transition is larger than you think, and they\'re not quiet about it.',
};

// ── 90-DAY PLAN BY ROLE & TIMELINE ────────────────────────────────────────
const PLANS = {
  fast: { // 6 months
    devops:       ['Create a free AWS account and complete AWS Cloud Practitioner Essentials on Skill Builder this month', 'Set up a GitHub account and complete the gitops-starter-kit (free) — do all six exercises', 'Book your AWS Cloud Practitioner exam for week 8 and your DevOps Professional study for month 4'],
    cloud_engineer:['Complete AWS Cloud Practitioner Essentials on AWS Skill Builder this week', 'Open an AWS Free Tier account and build three things: an S3 website, an EC2 server, a VPC — all documented on GitHub', 'Book the AWS Solutions Architect Associate exam for week 10'],
    cloud_security:['Start with AWS Security Fundamentals (free, Skill Builder) this week', 'Read the AWS Shared Responsibility Model until you can explain it to a non-technical person', 'Book the AWS Cloud Practitioner exam for week 8 — it\'s the gateway to the Security Specialty'],
    data_analyst:  ['Complete AWS Cloud Practitioner Essentials on Skill Builder', 'Start the Google Data Analytics Certificate on Coursera (free to audit) for the data fundamentals', 'Build one project: take a public dataset and answer a real question with it — publish on GitHub'],
    cloud_support: ['Complete AWS Cloud Practitioner Essentials — this is your target certification', 'Join the AWS re/Start programme if available in your country (free, employer-sponsored)', 'Apply to AWS cloud support roles before you feel ready — the certification plus any project gets you interviews'],
    solutions_arch:['Complete AWS Cloud Practitioner Essentials then move straight to Solutions Architect Associate content on Skill Builder', 'Draw architecture diagrams for systems you already understand (a bank branch, a hospital workflow) and translate them to AWS', 'Book the SAA exam for month 3'],
    cloud_pm:      ['Complete AWS Cloud Practitioner Essentials — you need the vocabulary, not deep technical skills', 'Document a project you have managed in your current role as if it were a cloud migration project', 'Start networking with cloud PMs on LinkedIn — most are generous with advice'],
    dev_advocacy:  ['Complete AWS Cloud Practitioner Essentials and earn the Cloud Quest badge (both free)', 'Write three LinkedIn posts or blog posts explaining a cloud concept in plain English', 'Apply to the AWS Community Builders programme — it is free and open to people early in their journey'],
    health_informatics: ['Complete AWS Cloud Practitioner Essentials', 'Research HL7 and FHIR standards — one hour of reading gives you a working vocabulary', 'Look for NHS Digital, NHS Transformation programmes or US digital health roles — your dual background is rare'],
    default:       ['Complete AWS Cloud Practitioner Essentials on Skill Builder (free)', 'Build one small project in your AWS Free Tier account and put it on GitHub', 'Book your first certification exam within 60 days'],
  },
  steady: { // 12 months
    default: ['Month 1–2: Complete AWS Cloud Practitioner Essentials and earn the Cloud Quest badge', 'Month 3–5: Study for and pass your first certification exam', 'Month 6–9: Build two projects on GitHub and start networking on LinkedIn in your target community'],
  },
  slow: { // 2 years or someday
    default: ['This quarter: Complete AWS Cloud Practitioner Essentials at your own pace — 30 minutes a day', 'Next quarter: Create a GitHub account and complete one hands-on project', 'This year: Pass your first AWS certification and connect with 5 people already working in cloud'],
  },
};
