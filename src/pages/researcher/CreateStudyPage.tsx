import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useStudies } from '../../contexts/StudyContext';
import { useAuth } from '../../contexts/AuthContext';
import { StudyCategory, StudyMethodology, StudyRequirement } from '../../types';

export function CreateStudyPage() {
  const navigate = useNavigate();
  const { createStudy } = useStudies();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'UX Research' as StudyCategory,
    methodology: 'Interview' as StudyMethodology,
    compensation: 100,
    duration: '60 minutes',
    participantLimit: 10,
    location: 'remote' as 'remote' | 'in-person' | 'hybrid',
    deadline: '',
    tags: [] as string[]
  });
  const [requirements, setRequirements] = useState<Omit<StudyRequirement, 'id'>[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState({
    type: 'custom' as StudyRequirement['type'],
    description: '',
    required: true
  });

  const categories: StudyCategory[] = ['UX Research', 'Market Research', 'Product Testing', 'User Interviews', 'Survey', 'Focus Group'];
  const methodologies: StudyMethodology[] = ['Interview', 'Survey', 'Usability Test', 'Focus Group', 'Diary Study', 'A/B Test'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'compensation' || name === 'participantLimit' ? Number(value) : value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.description.trim()) {
      setRequirements(prev => [...prev, { ...newRequirement }]);
      setNewRequirement({
        type: 'custom',
        description: '',
        required: true
      });
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const studyRequirements: StudyRequirement[] = requirements.map((req, index) => ({
        ...req,
        id: (index + 1).toString()
      }));

      createStudy({
        ...formData,
        requirements: studyRequirements,
        status: 'active',
        researcherId: user.id
      });

      navigate('/researcher/dashboard');
    } catch (error) {
      console.error('Error creating study:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/researcher/dashboard')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Study
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Set up your research study and start recruiting participants
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Study Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mobile App Usability Study"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="methodology" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Methodology *
              </label>
              <select
                id="methodology"
                name="methodology"
                value={formData.methodology}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {methodologies.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe what participants will do in this study..."
              />
            </div>
          </div>
        </div>

        {/* Study Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Study Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="compensation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Compensation ($) *
              </label>
              <input
                type="number"
                id="compensation"
                name="compensation"
                required
                min="1"
                value={formData.compensation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                required
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 60 minutes"
              />
            </div>

            <div>
              <label htmlFor="participantLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Participant Limit *
              </label>
              <input
                type="number"
                id="participantLimit"
                name="participantLimit"
                required
                min="1"
                value={formData.participantLimit}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location *
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="remote">Remote</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Application Deadline *
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Tags
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-[#b6eb54] hover:bg-[#a3e635] text-black font-medium rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Participant Requirements
          </h2>
          
          <div className="space-y-4 mb-6">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      requirement.required 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {requirement.required ? 'Required' : 'Optional'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      {requirement.type}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white mt-1">
                    {requirement.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={newRequirement.type}
              onChange={(e) => setNewRequirement(prev => ({ ...prev, type: e.target.value as any }))}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="age">Age</option>
              <option value="location">Location</option>
              <option value="experience">Experience</option>
              <option value="custom">Custom</option>
            </select>
            
            <input
              type="text"
              value={newRequirement.description}
              onChange={(e) => setNewRequirement(prev => ({ ...prev, description: e.target.value }))}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Requirement description..."
            />
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newRequirement.required}
                  onChange={(e) => setNewRequirement(prev => ({ ...prev, required: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Required</span>
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="px-4 py-2 bg-[#b6eb54] hover:bg-[#a3e635] text-black font-medium rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/researcher/dashboard')}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Study...' : 'Create Study'}
          </button>
        </div>
      </form>
    </div>
  );
}