export const siteConfig = {
  name: 'Anurag Raut',
  title: 'Anurag Raut — Software Engineer',
  description:
    'Software engineer in Mumbai building full-stack products with React, React Native, and Node.js, plus low-level systems in C++ and Go.',
  url: 'https://anuragraut.dev',
  email: 'anurag.raut.86@gmail.com',
  phone: '+91 9561401105',
  location: 'Mumbai, India',
  twitter: 'https://twitter.com/AnuragRaut86',
  ogImage: '/og-image.svg',
};

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Anurag-Raut', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/anurag-raut', icon: 'linkedin' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/Anurag-Raut', icon: 'leetcode' },
  { name: 'Codeforces', url: 'https://codeforces.com/profile/Anurag-Raut', icon: 'codeforces' },
  { name: 'CodeChef', url: 'https://codechef.com/users/anurag_raut', icon: 'codechef' },
  { name: 'Twitter', url: 'https://twitter.com/AnuragRaut86', icon: 'twitter' },
];

export const education = {
  institution: 'Dwarkadas J. Sanghvi College of Engineering',
  degree: 'Bachelor of Technology in Information Technology',
  period: 'Aug 2021 – Jul 2025',
  cgpa: '8.56',
};

type ExperienceEntry = {
  role: string;
  company?: string;
  location: string;
  period: string;
  points: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: 'Full-Stack Developer',
    location: 'Remote',
    period: '2024 – Present',
    points: [
      'Built and shipped core product features across React, React Native, and Node.js.',
      'Cut backend latency by up to 60% through performance optimization.',
      'Designed a HIPAA-aligned system with security controls for sensitive healthcare data.',
    ],
  },
];

export const achievements = [
  '2nd runner-up at Bajaj Finserv\u2019s Hackrx 5.0 hackathon.',
  'Knight Badge on LeetCode (Top 3%, max rating 2000).',
  'Contributed to Scaffold ETH-2 migration (Next.js page router \u2192 app router).',
  'Top 15/125 teams in the DuHacks hackathon.',
  'Solved 1000+ problems across platforms.',
  'Global rank 26/17,000+ in CodeChef Starters 60 (Div 4).',
];

export const skills = {
  languages: ['C++', 'Go', 'JavaScript', 'TypeScript', 'SQL'],
  technologies: ['Next.js', 'React.js', 'React Native', 'Node.js', 'RabbitMQ', 'Docker', 'AWS', 'Azure'],
};
