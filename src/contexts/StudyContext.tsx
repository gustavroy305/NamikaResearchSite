import React, { createContext, useContext, useState } from 'react';
import { Study, StudyApplication } from '../types';
import { mockStudies, mockApplications } from '../data/mockData';

interface StudyContextType {
  studies: Study[];
  applications: StudyApplication[];
  createStudy: (study: Omit<Study, 'id' | 'createdAt' | 'currentApplications'>) => void;
  applyToStudy: (studyId: string, participantId: string, responses: any[]) => void;
  updateApplicationStatus: (applicationId: string, status: StudyApplication['status']) => void;
  getStudiesByResearcher: (researcherId: string) => Study[];
  getApplicationsByParticipant: (participantId: string) => StudyApplication[];
  getApplicationsForStudy: (studyId: string) => StudyApplication[];
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function useStudies() {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudies must be used within a StudyProvider');
  }
  return context;
}

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [studies, setStudies] = useState<Study[]>(mockStudies);
  const [applications, setApplications] = useState<StudyApplication[]>(mockApplications);

  const createStudy = (studyData: Omit<Study, 'id' | 'createdAt' | 'currentApplications'>) => {
    const newStudy: Study = {
      ...studyData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      currentApplications: 0
    };
    setStudies(prev => [newStudy, ...prev]);
  };

  const applyToStudy = (studyId: string, participantId: string, responses: any[]) => {
    const newApplication: StudyApplication = {
      id: Math.random().toString(36).substr(2, 9),
      studyId,
      participantId,
      status: 'pending',
      appliedAt: new Date().toISOString(),
      responses
    };
    setApplications(prev => [...prev, newApplication]);
    
    // Update study application count
    setStudies(prev => prev.map(study => 
      study.id === studyId 
        ? { ...study, currentApplications: study.currentApplications + 1 }
        : study
    ));
  };

  const updateApplicationStatus = (applicationId: string, status: StudyApplication['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  const getStudiesByResearcher = (researcherId: string) => {
    return studies.filter(study => study.researcherId === researcherId);
  };

  const getApplicationsByParticipant = (participantId: string) => {
    return applications.filter(app => app.participantId === participantId);
  };

  const getApplicationsForStudy = (studyId: string) => {
    return applications.filter(app => app.studyId === studyId);
  };
  const value = {
    studies,
    applications,
    createStudy,
    applyToStudy,
    updateApplicationStatus,
    getStudiesByResearcher,
    getApplicationsByParticipant,
    getApplicationsForStudy
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}