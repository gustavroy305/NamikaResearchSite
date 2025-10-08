export interface User {
  id: string;
  email: string;
  type: 'researcher' | 'participant';
  profile: ResearcherProfile | ParticipantProfile;
  createdAt: string;
}

export interface ResearcherProfile {
  companyName: string;
  firstName: string;
  lastName: string;
  title: string;
  website?: string;
  description: string;
  verified: boolean;
  studiesPosted: number;
  totalSpent: number;
  rating: number;
}

export interface ParticipantProfile {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
  occupation: string;
  experience: string[];
  interests: string[];
  totalEarnings: number;
  studiesCompleted: number;
  rating: number;
  verified: boolean;
}

export interface Study {
  id: string;
  title: string;
  description: string;
  category: StudyCategory;
  methodology: StudyMethodology;
  compensation: number;
  duration: string;
  participantLimit: number;
  currentApplications: number;
  requirements: StudyRequirement[];
  location: 'remote' | 'in-person' | 'hybrid';
  status: 'active' | 'closed' | 'completed';
  researcherId: string;
  createdAt: string;
  deadline: string;
  tags: string[];
}

export interface StudyApplication {
  id: string;
  studyId: string;
  participantId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  appliedAt: string;
  responses: ScreeningResponse[];
}

export interface StudyRequirement {
  id: string;
  type: 'age' | 'location' | 'experience' | 'custom';
  description: string;
  required: boolean;
}

export interface ScreeningResponse {
  questionId: string;
  question: string;
  answer: string;
}

export type StudyCategory = 'UX Research' | 'Market Research' | 'Product Testing' | 'User Interviews' | 'Survey' | 'Focus Group';
export type StudyMethodology = 'Interview' | 'Survey' | 'Usability Test' | 'Focus Group' | 'Diary Study' | 'A/B Test';