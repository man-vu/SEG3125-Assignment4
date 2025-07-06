export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  instructor: {
    name: string;
    avatar: string;
    rating: number;
    experience: string;
    bio?: string;
  };
  duration: string;
  students: number;
  rating: number;
  reviewCount: number;
  price: {
    current: number;
    original?: number;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  skills: string[];
  features: string[];
  curriculum?: {
    sections: {
      title: string;
      lessons: {
        title: string;
        duration: string;
        preview?: boolean;
      }[];
    }[];
  };
  thumbnail: string;
  isPopular?: boolean;
  isBestseller?: boolean;
}

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Master full-stack web development from HTML/CSS to advanced JavaScript frameworks.',
    longDescription: 'This comprehensive bootcamp covers everything you need to become a full-stack web developer. From basic HTML/CSS to advanced React, Node.js, and database management.',
    instructor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 4.9,
      experience: '10+ years web development',
      bio: 'Dr. Sarah Johnson is a senior full-stack developer with over 10 years of experience building scalable web applications.'
    },
    duration: '12 weeks',
    students: 15420,
    rating: 4.8,
    reviewCount: 2340,
    price: {
      current: 199,
      original: 299
    },
    level: 'Beginner',
    category: 'Full Stack',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    features: ['Live Coding Sessions', '100+ Projects', '1-on-1 Mentoring', 'Certificate'],
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isBestseller: true
  },
  {
    id: '2',
    title: 'React.js Mastery',
    description: 'Build modern, scalable React applications with hooks, context, and advanced patterns.',
    longDescription: 'Master React.js with this comprehensive course covering functional components, hooks, context API, and advanced state management patterns.',
    instructor: {
      name: 'Prof. Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.7,
      experience: '8 years React specialist',
      bio: 'Professor Michael Chen is a React expert who has built applications used by millions of users.'
    },
    duration: '8 weeks',
    students: 8930,
    rating: 4.6,
    reviewCount: 1120,
    price: {
      current: 89,
      original: 129
    },
    level: 'Intermediate',
    category: 'Frontend',
    skills: ['React Hooks', 'Context API', 'Redux', 'TypeScript'],
    features: ['Real Projects', 'Code Reviews', 'Best Practices'],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '3',
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript from basics to advanced concepts with hands-on projects.',
    longDescription: 'Learn JavaScript from the ground up with this comprehensive course covering ES6+, async programming, and modern JavaScript patterns.',
    instructor: {
      name: 'Emma Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 4.8,
      experience: '6 years JavaScript expert',
      bio: 'Emma Thompson is a JavaScript instructor who has helped thousands of students master the language.'
    },
    duration: '6 weeks',
    students: 6750,
    rating: 4.7,
    reviewCount: 890,
    price: {
      current: 69,
      original: 99
    },
    level: 'Beginner',
    category: 'JavaScript',
    skills: ['ES6+', 'Async/Await', 'DOM Manipulation', 'Modules'],
    features: ['Interactive Exercises', 'Code Challenges', 'Debugging Skills'],
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Build robust backend APIs and server-side applications with Node.js.',
    longDescription: 'Learn to build scalable backend applications using Node.js, Express, and modern database technologies.',
    instructor: {
      name: 'Dr. James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      rating: 4.6,
      experience: '12 years backend development',
      bio: 'Dr. James Wilson specializes in building high-performance backend systems and APIs.'
    },
    duration: '10 weeks',
    students: 5430,
    rating: 4.5,
    reviewCount: 780,
    price: {
      current: 79,
      original: 119
    },
    level: 'Intermediate',
    category: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    features: ['API Development', 'Database Design', 'Authentication'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'CSS & Responsive Design',
    description: 'Master modern CSS, Flexbox, Grid, and responsive web design principles.',
    longDescription: 'Learn to create beautiful, responsive websites using modern CSS techniques including Flexbox, Grid, and CSS animations.',
    instructor: {
      name: 'Prof. Lisa Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      rating: 4.8,
      experience: '9 years CSS specialist',
      bio: 'Prof. Lisa Rodriguez is a CSS expert who creates stunning user interfaces and responsive designs.'
    },
    duration: '6 weeks',
    students: 7890,
    rating: 4.7,
    reviewCount: 1020,
    price: {
      current: 75,
      original: 110
    },
    level: 'Beginner',
    category: 'Frontend',
    skills: ['CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
    features: ['Design Projects', 'Mobile-First', 'CSS Animations'],
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '6',
    title: 'Python Web Development',
    description: 'Build web applications using Python, Django, and Flask frameworks.',
    longDescription: 'Learn to build powerful web applications using Python with Django and Flask frameworks.',
    instructor: {
      name: 'Dr. Robert Kim',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      rating: 4.9,
      experience: '15 years Python development',
      bio: 'Dr. Robert Kim is a Python expert who has built applications for major tech companies.'
    },
    duration: '10 weeks',
    students: 11200,
    rating: 4.8,
    reviewCount: 1560,
    price: {
      current: 95,
      original: 145
    },
    level: 'Intermediate',
    category: 'Backend',
    skills: ['Python', 'Django', 'Flask', 'SQL'],
    features: ['Django Projects', 'Database Models', 'User Authentication'],
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isBestseller: true
  },
  {
    id: '7',
    title: 'Vue.js Complete Guide',
    description: 'Master Vue.js 3 with Composition API and build modern web applications.',
    longDescription: 'Learn Vue.js 3 from scratch, including the Composition API, Vuex, and building real-world applications.',
    instructor: {
      name: 'Sarah Mitchell',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 4.7,
      experience: '7 years Vue.js development',
      bio: 'Sarah Mitchell is a Vue.js expert who has contributed to the Vue.js ecosystem.'
    },
    duration: '8 weeks',
    students: 4560,
    rating: 4.6,
    reviewCount: 620,
    price: {
      current: 149,
      original: 199
    },
    level: 'Intermediate',
    category: 'Frontend',
    skills: ['Vue.js 3', 'Composition API', 'Vuex', 'Vue Router'],
    features: ['Vue Projects', 'State Management', 'Component Design'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    title: 'TypeScript Fundamentals',
    description: 'Learn TypeScript to build more robust and maintainable JavaScript applications.',
    longDescription: 'Master TypeScript to write better JavaScript code with type safety and modern development practices.',
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4.5,
      experience: '5 years TypeScript development',
      bio: 'Alex Thompson specializes in TypeScript and has helped teams migrate from JavaScript.'
    },
    duration: '4 weeks',
    students: 3240,
    rating: 4.4,
    reviewCount: 450,
    price: {
      current: 49,
      original: 79
    },
    level: 'Intermediate',
    category: 'JavaScript',
    skills: ['TypeScript', 'Type Safety', 'Interfaces', 'Generics'],
    features: ['Type Definitions', 'Migration Guide', 'Best Practices'],
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    title: 'Database Design & SQL',
    description: 'Master database design principles and SQL for web applications.',
    longDescription: 'Learn to design efficient databases and write complex SQL queries for web applications.',
    instructor: {
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
      rating: 4.6,
      experience: '8 years database specialist',
      bio: 'Maria Garcia is a database expert who has designed systems for large-scale applications.'
    },
    duration: '6 weeks',
    students: 5670,
    rating: 4.5,
    reviewCount: 720,
    price: {
      current: 65,
      original: 95
    },
    level: 'Intermediate',
    category: 'Database',
    skills: ['SQL', 'Database Design', 'Normalization', 'Indexing'],
    features: ['Database Projects', 'Query Optimization', 'Performance Tuning'],
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10',
    title: 'Advanced JavaScript Patterns',
    description: 'Master advanced JavaScript concepts and design patterns for professional development.',
    longDescription: 'Learn advanced JavaScript concepts including design patterns, functional programming, and performance optimization.',
    instructor: {
      name: 'Dr. David Park',
      avatar: 'https://randomuser.me/api/portraits/men/39.jpg',
      rating: 4.9,
      experience: '20 years JavaScript development',
      bio: 'Dr. David Park is a JavaScript expert who has worked on major web applications.'
    },
    duration: '8 weeks',
    students: 2340,
    rating: 4.9,
    reviewCount: 890,
    price: {
      current: 299,
      original: 399
    },
    level: 'Advanced',
    category: 'JavaScript',
    skills: ['Design Patterns', 'Functional Programming', 'Performance', 'Testing'],
    features: ['Advanced Projects', 'Code Reviews', 'Performance Analysis'],
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isBestseller: true
  },
  {
    id: '11',
    title: 'Angular Development',
    description: 'Build enterprise-level applications with Angular framework.',
    longDescription: 'Learn Angular to build scalable, enterprise-level web applications with TypeScript.',
    instructor: {
      name: 'Jennifer Lee',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      rating: 4.7,
      experience: '6 years Angular development',
      bio: 'Jennifer Lee is an Angular expert who has built applications for Fortune 500 companies.'
    },
    duration: '10 weeks',
    students: 2890,
    rating: 4.6,
    reviewCount: 380,
    price: {
      current: 45,
      original: 69
    },
    level: 'Intermediate',
    category: 'Frontend',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Angular CLI'],
    features: ['Enterprise Projects', 'Component Architecture', 'State Management'],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    title: 'DevOps for Web Developers',
    description: 'Learn DevOps practices to deploy and maintain web applications.',
    longDescription: 'Master DevOps practices including CI/CD, Docker, and cloud deployment for web applications.',
    instructor: {
      name: 'Tom Anderson',
      avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
      rating: 4.4,
      experience: '4 years DevOps specialist',
      bio: 'Tom Anderson helps developers implement DevOps practices and automate deployments.'
    },
    duration: '6 weeks',
    students: 1870,
    rating: 4.3,
    reviewCount: 240,
    price: {
      current: 35,
      original: 55
    },
    level: 'Intermediate',
    category: 'DevOps',
    skills: ['Docker', 'CI/CD', 'AWS', 'Git'],
    features: ['Deployment Projects', 'Automation', 'Cloud Services'],
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '13',
    title: 'GraphQL API Development',
    description: 'Build modern APIs with GraphQL for efficient data fetching.',
    longDescription: 'Learn to build efficient APIs using GraphQL for better data fetching and client-server communication.',
    instructor: {
      name: 'Dr. Amanda Foster',
      avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
      rating: 4.7,
      experience: '11 years API development',
      bio: 'Dr. Amanda Foster specializes in building scalable APIs and has worked with major tech companies.'
    },
    duration: '6 weeks',
    students: 4320,
    rating: 4.6,
    reviewCount: 580,
    price: {
      current: 129,
      original: 179
    },
    level: 'Advanced',
    category: 'Backend',
    skills: ['GraphQL', 'Apollo Server', 'Schema Design', 'Resolvers'],
    features: ['API Projects', 'Schema Design', 'Performance Optimization'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '14',
    title: 'Mobile Web Development',
    description: 'Build responsive mobile web applications with PWA features.',
    longDescription: 'Learn to build mobile-first web applications with Progressive Web App (PWA) features.',
    instructor: {
      name: 'Dr. Christopher Brown',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      rating: 4.8,
      experience: '13 years mobile development',
      bio: 'Dr. Christopher Brown specializes in mobile web development and PWA technologies.'
    },
    duration: '8 weeks',
    students: 2980,
    rating: 4.7,
    reviewCount: 420,
    price: {
      current: 159,
      original: 219
    },
    level: 'Intermediate',
    category: 'Mobile',
    skills: ['PWA', 'Mobile Design', 'Service Workers', 'Offline Support'],
    features: ['Mobile Projects', 'PWA Implementation', 'Performance Testing'],
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '15',
    title: 'Web Security Fundamentals',
    description: 'Learn essential web security practices to protect your applications.',
    longDescription: 'Master web security fundamentals including authentication, authorization, and common vulnerabilities.',
    instructor: {
      name: 'Prof. Daniel Martinez',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      rating: 4.6,
      experience: '9 years security specialist',
      bio: 'Prof. Daniel Martinez is a security expert who has helped secure applications for major companies.'
    },
    duration: '6 weeks',
    students: 3450,
    rating: 4.5,
    reviewCount: 490,
    price: {
      current: 179,
      original: 249
    },
    level: 'Intermediate',
    category: 'Security',
    skills: ['Authentication', 'Authorization', 'OWASP', 'HTTPS'],
    features: ['Security Projects', 'Vulnerability Testing', 'Best Practices'],
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '16',
    title: 'CSS Animations & Effects',
    description: 'Create stunning animations and visual effects with CSS.',
    longDescription: 'Learn to create beautiful animations, transitions, and visual effects using modern CSS techniques.',
    instructor: {
      name: 'Sophie Williams',
      avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
      rating: 4.5,
      experience: '7 years CSS animation specialist',
      bio: 'Sophie Williams creates stunning visual effects and animations for web applications.'
    },
    duration: '4 weeks',
    students: 4120,
    rating: 4.4,
    reviewCount: 560,
    price: {
      current: 59,
      original: 89
    },
    level: 'Intermediate',
    category: 'Frontend',
    skills: ['CSS Animations', 'Transitions', 'Keyframes', 'Transform'],
    features: ['Animation Projects', 'Performance Tips', 'Creative Effects'],
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '17',
    title: 'Testing Web Applications',
    description: 'Master testing strategies for web applications with modern tools.',
    longDescription: 'Learn comprehensive testing strategies including unit tests, integration tests, and end-to-end testing.',
    instructor: {
      name: 'Rachel Green',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      rating: 4.6,
      experience: '6 years testing specialist',
      bio: 'Rachel Green helps teams implement comprehensive testing strategies for web applications.'
    },
    duration: '6 weeks',
    students: 3780,
    rating: 4.5,
    reviewCount: 520,
    price: {
      current: 55,
      original: 85
    },
    level: 'Intermediate',
    category: 'Testing',
    skills: ['Jest', 'React Testing', 'Cypress', 'Test-Driven Development'],
    features: ['Testing Projects', 'Test Automation', 'Best Practices'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '18',
    title: 'Web Performance Optimization',
    description: 'Optimize web applications for speed and performance.',
    longDescription: 'Learn techniques to optimize web applications for better performance and user experience.',
    instructor: {
      name: 'Kevin Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/63.jpg',
      rating: 4.4,
      experience: '5 years performance specialist',
      bio: 'Kevin Johnson specializes in optimizing web applications for maximum performance.'
    },
    duration: '4 weeks',
    students: 2340,
    rating: 4.3,
    reviewCount: 310,
    price: {
      current: 40,
      original: 65
    },
    level: 'Advanced',
    category: 'Performance',
    skills: ['Performance Metrics', 'Optimization', 'Lighthouse', 'Caching'],
    features: ['Performance Projects', 'Monitoring Tools', 'Optimization Techniques'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '19',
    title: 'Git & Version Control',
    description: 'Master Git and version control for collaborative development.',
    longDescription: 'Learn Git fundamentals and advanced techniques for effective version control and collaboration.',
    instructor: {
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
      rating: 4.3,
      experience: '4 years Git specialist',
      bio: 'Emma Davis helps teams implement effective version control practices and workflows.'
    },
    duration: '3 weeks',
    students: 1890,
    rating: 4.2,
    reviewCount: 240,
    price: {
      current: 25,
      original: 45
    },
    level: 'Beginner',
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Branching', 'Collaboration'],
    features: ['Git Workflows', 'Collaboration Projects', 'Best Practices'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '20',
    title: 'Web Accessibility',
    description: 'Build accessible web applications that work for everyone.',
    longDescription: 'Learn to create web applications that are accessible to users with disabilities and follow WCAG guidelines.',
    instructor: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
      rating: 4.5,
      experience: '6 years accessibility specialist',
      bio: 'Michael Chen is an accessibility expert who helps make the web more inclusive for all users.'
    },
    duration: '4 weeks',
    students: 2670,
    rating: 4.4,
    reviewCount: 350,
    price: {
      current: 35,
      original: 60
    },
    level: 'Intermediate',
    category: 'Accessibility',
    skills: ['WCAG Guidelines', 'Screen Readers', 'Keyboard Navigation', 'ARIA'],
    features: ['Accessibility Projects', 'Testing Tools', 'Inclusive Design'],
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '21',
    title: 'Sass & CSS Preprocessors',
    description: 'Master Sass and modern CSS preprocessors for efficient styling.',
    longDescription: 'Learn to use Sass and other CSS preprocessors to write more maintainable and efficient CSS code.',
    instructor: {
      name: 'Lisa Wang',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
      rating: 4.6,
      experience: '8 years CSS preprocessor specialist',
      bio: 'Lisa Wang helps teams implement efficient CSS workflows using preprocessors and build tools.'
    },
    duration: '4 weeks',
    students: 3450,
    rating: 4.5,
    reviewCount: 470,
    price: {
      current: 50,
      original: 80
    },
    level: 'Intermediate',
    category: 'Frontend',
    skills: ['Sass', 'SCSS', 'Variables', 'Mixins'],
    features: ['Sass Projects', 'Build Tools', 'CSS Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '22',
    title: 'Webpack & Build Tools',
    description: 'Master modern build tools and bundlers for web development.',
    longDescription: 'Learn to use Webpack and other build tools to optimize and bundle your web applications.',
    instructor: {
      name: 'Dr. Patricia Smith',
      avatar: 'https://randomuser.me/api/portraits/women/53.jpg',
      rating: 4.7,
      experience: '12 years build tools specialist',
      bio: 'Dr. Patricia Smith helps teams optimize their build processes and development workflows.'
    },
    duration: '5 weeks',
    students: 5230,
    rating: 4.6,
    reviewCount: 680,
    price: {
      current: 70,
      original: 110
    },
    level: 'Advanced',
    category: 'Tools',
    skills: ['Webpack', 'Babel', 'Loaders', 'Optimization'],
    features: ['Build Projects', 'Performance Optimization', 'Development Workflows'],
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '23',
    title: 'RESTful API Design',
    description: 'Design and build RESTful APIs following best practices.',
    longDescription: 'Learn to design and implement RESTful APIs that are scalable, maintainable, and follow industry best practices.',
    instructor: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
      rating: 4.5,
      experience: '7 years API design specialist',
      bio: 'James Wilson has designed APIs for major companies and helps teams implement RESTful practices.'
    },
    duration: '6 weeks',
    students: 3120,
    rating: 4.4,
    reviewCount: 410,
    price: {
      current: 45,
      original: 75
    },
    level: 'Intermediate',
    category: 'Backend',
    skills: ['REST Principles', 'API Design', 'HTTP Methods', 'Status Codes'],
    features: ['API Projects', 'Documentation', 'Testing Strategies'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '24',
    title: 'Progressive Web Apps',
    description: 'Build modern Progressive Web Apps with offline capabilities.',
    longDescription: 'Learn to build Progressive Web Apps that provide native app-like experiences with offline functionality.',
    instructor: {
      name: 'Anna Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
      rating: 4.4,
      experience: '5 years PWA specialist',
      bio: 'Anna Rodriguez specializes in building Progressive Web Apps and has helped companies implement PWA strategies.'
    },
    duration: '5 weeks',
    students: 1980,
    rating: 4.3,
    reviewCount: 260,
    price: {
      current: 30,
      original: 55
    },
    level: 'Advanced',
    category: 'Mobile',
    skills: ['Service Workers', 'Offline Storage', 'Push Notifications', 'App Shell'],
    features: ['PWA Projects', 'Performance Optimization', 'User Experience'],
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  if (category === 'All') return coursesData;
  return coursesData.filter(course => course.category === category);
};

export const getCoursesByLevel = (level: string): Course[] => {
  if (level === 'All') return coursesData;
  return coursesData.filter(course => course.level === level);
}; 