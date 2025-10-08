import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Calendar, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { useStudies } from '../../contexts/StudyContext';
import { useAuth } from '../../contexts/AuthContext';

export function StudyDetailPage() {
  const { studyId } = useParams<{ studyId: string }>();
  const navigate = useNavigate();
  const { studies, applyToStudy, getApplicationsByParticipant } = useStudies();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    motivation: '',
    experience: '',
    availability: ''
  });

  const study = studies.find(s => s.id === studyId);
  const userApplications = user ? getApplicationsByParticipant(user.id) : [];
  const hasApplied = userApplications.some(app => app.studyId === studyId);

  if (!study) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Study Not Found
          </h1>
          <button
            onClick={() => navigate('/participant/browse')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            ← Back to Browse Studies
          </button>
        </div>
      </div>
    );
  }

  const getLocationIcon = (location: string) => {
    return location === 'remote' ? '🌐' : location === 'in-person' ? '🏢' : '🔄';
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login?type=participant');
      return;
    }

    setLoading(true);
    try {
      const responses = [
        { questionId: '1', question: 'Why are you interested in this study?', answer: applicationData.motivation },
        { questionId: '2', question: 'Relevant experience', answer: applicationData.experience },
        { questionId: '3', question: 'Availability', answer: applicationData.availability }
      ];

      applyToStudy(study.id, user.id, responses);
      setShowApplicationForm(false);
      // Show success message or redirect
    } catch (error) {
      console.error('Error applying to study:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/participant/browse')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Browse Studies
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Header */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getLocationIcon(study.location)}</span>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {study.category}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {study.title}
                  </h1>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${study.compensation}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {study.duration}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="font-medium">{study.methodology}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="capitalize">{study.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Deadline: {new Date(study.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{study.currentApplications} of {study.participantLimit} spots filled</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Study Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {study.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Participant Requirements
            </h2>
            <div className="space-y-3">
              {study.requirements.map((requirement) => (
                <div key={requirement.id} className="flex items-start space-x-3">
                  <div className="mt-1">
                    {requirement.required ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      requirement.required 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {requirement.required ? 'Required' : 'Preferred'}
                    </span>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {requirement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          {showApplicationForm && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Application Form
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why are you interested in this study? *
                  </label>
                  <textarea
                    rows={3}
                    value={applicationData.motivation}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, motivation: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your motivation..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relevant experience
                  </label>
                  <textarea
                    rows={3}
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe any relevant experience..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Availability *
                  </label>
                  <input
                    type="text"
                    value={applicationData.availability}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, availability: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="When are you available?"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={loading || !applicationData.motivation || !applicationData.availability}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Status */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Application Status
            </h3>
            
            {hasApplied ? (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-[#b6eb54] mx-auto mb-3" />
                <p className="text-[#b6eb54] dark:text-[#b6eb54] font-medium mb-2">
                  Application Submitted
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The researcher will review your application and get back to you soon.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Applications: {study.currentApplications} / {study.participantLimit}
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
                
                <button
                  onClick={() => setShowApplicationForm(true)}
                  disabled={study.currentApplications >= study.participantLimit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {study.currentApplications >= study.participantLimit ? 'Study Full' : 'Apply Now'}
                </button>
              </div>
            )}
          </div>

          {/* Study Stats */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Study Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Compensation</span>
                <span className="font-semibold text-gray-900 dark:text-white">${study.compensation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Duration</span>
                <span className="font-semibold text-gray-900 dark:text-white">{study.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Location</span>
                <span className="font-semibold text-gray-900 dark:text-white capitalize">{study.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Methodology</span>
                <span className="font-semibold text-gray-900 dark:text-white">{study.methodology}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Posted</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {new Date(study.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}