import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, DollarSign, Award, TrendingUp, Calendar, Star, Clock, CircleCheck as CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStudies } from '../../contexts/StudyContext';

export function ParticipantDashboard() {
  const { user } = useAuth();
  const { studies, getApplicationsByParticipant } = useStudies();
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'earnings'>('overview');

  if (!user) return null;

  const participantProfile = user.profile as any;
  const userApplications = getApplicationsByParticipant(user.id);
  const approvedApplications = userApplications.filter(app => app.status === 'approved');
  const completedApplications = userApplications.filter(app => app.status === 'completed');

  const stats = [
    {
      label: 'Total Earnings',
      value: `$${participantProfile.totalEarnings?.toLocaleString() || '0'}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-[#b6eb54] dark:text-[#b6eb54]'
    },
    {
      label: 'Studies Completed',
      value: participantProfile.studiesCompleted?.toString() || '0',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Success Rate',
      value: '96%',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Rating',
      value: `${participantProfile.rating}/5`,
      icon: <Star className="h-6 w-6" />,
      color: 'text-yellow-600 dark:text-yellow-400'
    }
  ];

  const availableStudies = studies.filter(s => s.status === 'active').slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {participantProfile.firstName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {participantProfile.occupation} • {participantProfile.location}
            </p>
          </div>
          <Link
            to="/participant/browse"
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Search size={20} />
            <span>Browse Studies</span>
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
            { id: 'applications', label: 'My Applications' },
            { id: 'earnings', label: 'Earnings' }
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
          {/* Available Studies */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recommended Studies
              </h3>
              <Link
                to="/participant/browse"
                className="flex items-center space-x-3 p-3 bg-[#b6eb54]/20 dark:bg-[#b6eb54]/20 hover:bg-[#b6eb54] hover:text-black dark:hover:bg-[#b6eb54] dark:hover:text-black rounded-lg transition-colors"
              >
                View All →
                <span className="text-black dark:text-white font-medium group-hover:text-black">Browse Participants</span>
              </Link>
            </div>
            <div className="space-y-4">
              {availableStudies.map((study) => (
                <div key={study.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {study.title}
                    </h4>
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      ${study.compensation}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
                    {study.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {study.duration}
                      </span>
                      <span>•</span>
                      <span>{study.methodology}</span>
                    </div>
                    <Link
                      to={`/participant/study/${study.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-xs"
                    >
                      Apply →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: 'Application approved', study: 'E-commerce Mobile App Study', time: '2 hours ago', type: 'approved' },
                { action: 'Study completed', study: 'Healthcare Portal Navigation', time: '1 day ago', type: 'completed' },
                { action: 'Payment received', study: 'Financial Planning Tool', time: '2 days ago', type: 'payment' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'approved' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {activity.type === 'approved' ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : activity.type === 'completed' ? (
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.study} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                My Applications
              </h3>
              <div className="flex space-x-2">
                <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                  {userApplications.filter(app => app.status === 'pending').length} Pending
                </span>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  {approvedApplications.length} Approved
                </span>
              </div>
            </div>
            
            {userApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Browse available studies and start applying to earn money.
                </p>
                <Link
                  to="/participant/browse"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Browse Studies
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userApplications.map((application) => {
                  const study = studies.find(s => s.id === application.studyId);
                  if (!study) return null;
                  
                  return (
                    <div key={application.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {study.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            ${study.compensation}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {study.duration}
                          </span>
                          <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          application.status === 'approved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : application.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : application.status === 'completed'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="space-y-6">
          {/* Earnings Overview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Earnings Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  ${participantProfile.totalEarnings?.toLocaleString() || '0'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  $425
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  $133
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Average per Study</div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Payment History
            </h3>
            <div className="space-y-4">
              {[
                { study: 'Healthcare Portal Navigation Study', amount: 175, date: '2024-01-10', status: 'completed' },
                { study: 'E-commerce Mobile App Usability', amount: 150, date: '2024-01-08', status: 'completed' },
                { study: 'Financial Planning Tool Interviews', amount: 200, date: '2024-01-05', status: 'pending' }
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {payment.study}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {payment.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${payment.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}