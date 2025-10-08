import { Study, StudyApplication } from '../types';

export const mockStudies: Study[] = [
  {
    id: '1',
    title: 'E-commerce Mobile App Usability Study',
    description: 'We\'re looking for participants to test our new mobile shopping app. You\'ll complete typical shopping tasks while we observe and gather feedback.',
    category: 'UX Research',
    methodology: 'Usability Test',
    compensation: 150,
    duration: '60 minutes',
    participantLimit: 12,
    currentApplications: 8,
    requirements: [
      { id: '1', type: 'age', description: '25-45 years old', required: true },
      { id: '2', type: 'experience', description: 'Regular online shopper (3+ times per month)', required: true },
      { id: '3', type: 'custom', description: 'Own an iPhone or Android device', required: true }
    ],
    location: 'remote',
    status: 'active',
    researcherId: 'r1',
    createdAt: '2024-01-15T10:00:00Z',
    deadline: '2024-02-01T23:59:59Z',
    tags: ['Mobile', 'E-commerce', 'Usability']
  },
  {
    id: '2',
    title: 'Financial Planning Tool User Interviews',
    description: 'Help us understand how people approach personal financial planning. We\'ll discuss your current tools, pain points, and ideal features.',
    category: 'User Interviews',
    methodology: 'Interview',
    compensation: 200,
    duration: '45 minutes',
    participantLimit: 8,
    currentApplications: 3,
    requirements: [
      { id: '1', type: 'age', description: '30-55 years old', required: true },
      { id: '2', type: 'custom', description: 'Household income $50k+', required: true },
      { id: '3', type: 'experience', description: 'Currently use budgeting or investment tools', required: false }
    ],
    location: 'remote',
    status: 'active',
    researcherId: 'r2',
    createdAt: '2024-01-14T14:30:00Z',
    deadline: '2024-01-30T23:59:59Z',
    tags: ['Finance', 'Planning', 'Interviews']
  },
  {
    id: '3',
    title: 'Healthcare Portal Navigation Study',
    description: 'Test our patient portal interface and help us improve the user experience for managing medical appointments and records.',
    category: 'UX Research',
    methodology: 'Usability Test',
    compensation: 175,
    duration: '90 minutes',
    participantLimit: 15,
    currentApplications: 11,
    requirements: [
      { id: '1', type: 'age', description: '21+ years old', required: true },
      { id: '2', type: 'custom', description: 'Has used online healthcare services', required: true },
      { id: '3', type: 'location', description: 'US residents only', required: true }
    ],
    location: 'hybrid',
    status: 'active',
    researcherId: 'r1',
    createdAt: '2024-01-12T09:15:00Z',
    deadline: '2024-01-28T23:59:59Z',
    tags: ['Healthcare', 'Portal', 'Navigation']
  },
  {
    id: '4',
    title: 'Social Media Platform Survey',
    description: 'Quick survey about your social media usage patterns and preferences. Help shape the future of social platforms.',
    category: 'Survey',
    methodology: 'Survey',
    compensation: 25,
    duration: '15 minutes',
    participantLimit: 100,
    currentApplications: 67,
    requirements: [
      { id: '1', type: 'age', description: '18-35 years old', required: true },
      { id: '2', type: 'custom', description: 'Active on 2+ social media platforms', required: true }
    ],
    location: 'remote',
    status: 'active',
    researcherId: 'r3',
    createdAt: '2024-01-10T11:00:00Z',
    deadline: '2024-01-25T23:59:59Z',
    tags: ['Social Media', 'Survey', 'Quick']
  },
  {
    id: '5',
    title: 'Smart Home Device Focus Group',
    description: 'Join a focus group discussion about smart home technologies, privacy concerns, and future features you\'d like to see.',
    category: 'Focus Group',
    methodology: 'Focus Group',
    compensation: 300,
    duration: '2 hours',
    participantLimit: 6,
    currentApplications: 4,
    requirements: [
      { id: '1', type: 'custom', description: 'Own 2+ smart home devices', required: true },
      { id: '2', type: 'age', description: '25-50 years old', required: true },
      { id: '3', type: 'location', description: 'San Francisco Bay Area', required: true }
    ],
    location: 'in-person',
    status: 'active',
    researcherId: 'r2',
    createdAt: '2024-01-08T16:45:00Z',
    deadline: '2024-01-22T23:59:59Z',
    tags: ['Smart Home', 'IoT', 'Focus Group']
  },
  {
    id: '6',
    title: 'AI-Powered Productivity App Beta Testing',
    description: 'Test our new AI-powered productivity application and provide feedback on features, usability, and overall experience. Help us shape the future of workplace productivity.',
    category: 'Product Testing',
    methodology: 'Usability Test',
    compensation: 125,
    duration: '75 minutes',
    participantLimit: 20,
    currentApplications: 12,
    requirements: [
      { id: '1', type: 'age', description: '22-50 years old', required: true },
      { id: '2', type: 'experience', description: 'Uses productivity apps regularly', required: true },
      { id: '3', type: 'custom', description: 'Works in knowledge-based role', required: false }
    ],
    location: 'remote',
    status: 'active',
    researcherId: 'r1',
    createdAt: '2024-01-18T11:00:00Z',
    deadline: '2024-02-05T23:59:59Z',
    tags: ['AI', 'Productivity', 'Beta Testing', 'Remote']
  },
  {
    id: '7',
    title: 'Sustainable Fashion Shopping Behavior Study',
    description: 'Participate in interviews about sustainable fashion choices, shopping habits, and brand preferences. Help us understand consumer behavior in the eco-friendly fashion space.',
    category: 'Market Research',
    methodology: 'Interview',
    compensation: 180,
    duration: '50 minutes',
    participantLimit: 15,
    currentApplications: 7,
    requirements: [
      { id: '1', type: 'age', description: '25-40 years old', required: true },
      { id: '2', type: 'custom', description: 'Interested in sustainable fashion', required: true },
      { id: '3', type: 'custom', description: 'Shops online regularly', required: false }
    ],
    location: 'hybrid',
    status: 'active',
    researcherId: 'r3',
    createdAt: '2024-01-16T09:30:00Z',
    deadline: '2024-02-02T23:59:59Z',
    tags: ['Fashion', 'Sustainability', 'Consumer Behavior', 'Interviews']
  },
  {
    id: '8',
    title: 'Cryptocurrency Trading Platform Usability',
    description: 'Test our new cryptocurrency trading interface designed for beginners. We\'ll observe how you navigate the platform and complete common trading tasks.',
    category: 'UX Research',
    methodology: 'Usability Test',
    compensation: 220,
    duration: '90 minutes',
    participantLimit: 10,
    currentApplications: 5,
    requirements: [
      { id: '1', type: 'age', description: '21+ years old', required: true },
      { id: '2', type: 'custom', description: 'Basic knowledge of cryptocurrency', required: true },
      { id: '3', type: 'experience', description: 'Has used trading platforms before', required: false }
    ],
    location: 'remote',
    status: 'active',
    researcherId: 'r2',
    createdAt: '2024-01-17T14:15:00Z',
    deadline: '2024-02-03T23:59:59Z',
    tags: ['Cryptocurrency', 'Trading', 'Fintech', 'Usability']
  }
];

export const mockApplications: StudyApplication[] = [
  {
    id: 'a1',
    studyId: '1',
    participantId: 'p1',
    status: 'approved',
    appliedAt: '2024-01-16T10:30:00Z',
    responses: []
  },
  {
    id: 'a2',
    studyId: '2',
    participantId: 'p1',
    status: 'pending',
    appliedAt: '2024-01-15T14:20:00Z',
    responses: []
  }
];