import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, DollarSign, TrendingUp, Eye, Calendar, MessageSquare, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStudies } from '../../contexts/StudyContext';

export function ResearcherDashboard() {
  const { user } = useAuth();
  const { studies, getStudiesByResearcher, getApplicationsForStudy } = useStudies();
  const [activeTab, setActiveTab] = useState<'overview' | 'studies' | 'applications'>('overview');

  if (!user) return null;

  const researcherProfile = user.profile as any;
  const userStudies = getStudiesByResearcher(user.id);
  const activeStudies = userStudies.filter(s => s.status === 'active');
  const totalApplications = userStudies.reduce((sum, study) => sum + study.currentApplications, 0);

  // Get all applications for researcher's studies
  const allApplications = userStudies.flatMap(study => 
    getApplicationsForStudy(study.id).map(app => ({
      ...app,
      studyTitle: study.title
    }))
  ).sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
  const stats = [
    {
      label: 'Active Studies',
      value: activeStudies.length.toString(),
      icon: <Eye className="h-6 w-6" />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Total Applications',
      value: totalApplications.toString(),
      icon: <Users className="h-6 w-6" />,
      color: 'text-[#b6eb54] dark:text-[#b6eb54]'
    },
    {
      label: 'Budget Spent',
      value: `$${researcherProfile.totalSpent?.toLocaleString() || '0'}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {researcherProfile.firstName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {researcherProfile.companyName} • {researcherProfile.title}
            </p>
          </div>
          <Link
            to="/researcher/create-study"
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Create New Study</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'studies', label: 'My Studies' },
            { id: 'applications', label: 'Applications' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {allApplications.slice(0, 5).map((application, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      New application received
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {application.studyTitle} • {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {allApplications.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No recent activity. Create your first study to start receiving applications.
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/researcher/create-study"
                className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-900 dark:text-white font-medium">Create New Study</span>
              </Link>
              <Link
                to="/researcher/participants"
                className="flex items-center space-x-3 p-3 bg-[#b6eb54]/20 dark:bg-[#b6eb54]/20 hover:bg-[#b6eb54]/30 dark:hover:bg-[#b6eb54]/30 rounded-lg transition-colors"
              >
                <Users className="h-5 w-5 text-[#b6eb54] dark:text-[#b6eb54]" />
                <span className="text-black dark:text-white font-medium">Browse Participants</span>
              </Link>
              <Link
                to="/researcher/messages"
                className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-900 dark:text-white font-medium">View Messages</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'studies' && (
        <div className="space-y-6">
          {userStudies.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No studies yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first study to start recruiting participants.
              </p>
              <Link
                to="/researcher/create-study"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Create Your First Study
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userStudies.map((study) => (
                <div key={study.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {study.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {study.currentApplications}/{study.participantLimit}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${study.compensation}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      study.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : study.status === 'completed'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {study.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {study.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Applications</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {Math.round((study.currentApplications / study.participantLimit) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((study.currentApplications / study.participantLimit) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {study.methodology} • {study.duration}
                    </div>
                    <Link
                      to={`/researcher/study/${study.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                    >
                      Manage →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Applications
            </h3>
            {allApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Applications will appear here once participants start applying to your studies.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {allApplications.slice(0, 10).map((application, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          P{application.participantId.slice(-2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Participant {application.participantId.slice(-4)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Applied to {application.studyTitle} • {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          4.8
                        </span>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        application.status === 'approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {application.status}
                      </span>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}