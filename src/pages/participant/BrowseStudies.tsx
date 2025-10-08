import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ListFilter as Filter, MapPin, Clock, DollarSign, Users, Calendar } from 'lucide-react';
import { useStudies } from '../../contexts/StudyContext';
import { Study, StudyCategory, StudyMethodology } from '../../types';

export function BrowseStudies() {
  const { studies } = useStudies();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StudyCategory | 'all'>('all');
  const [selectedMethodology, setSelectedMethodology] = useState<StudyMethodology | 'all'>('all');
  const [location, setLocation] = useState<'all' | 'remote' | 'in-person' | 'hybrid'>('all');
  const [minCompensation, setMinCompensation] = useState<number>(0);

  const categories: StudyCategory[] = ['UX Research', 'Market Research', 'Product Testing', 'User Interviews', 'Survey', 'Focus Group'];
  const methodologies: StudyMethodology[] = ['Interview', 'Survey', 'Usability Test', 'Focus Group', 'Diary Study', 'A/B Test'];

  const filteredStudies = studies
    .filter(study => study.status === 'active')
    .filter(study => 
      searchTerm === '' || 
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(study => selectedCategory === 'all' || study.category === selectedCategory)
    .filter(study => selectedMethodology === 'all' || study.methodology === selectedMethodology)
    .filter(study => location === 'all' || study.location === location)
    .filter(study => study.compensation >= minCompensation)
    .sort((a, b) => b.compensation - a.compensation);

  const getLocationIcon = (location: Study['location']) => {
    return location === 'remote' ? '🌐' : location === 'in-person' ? '🏢' : '🔄';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Browse Research Studies
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find research opportunities that match your interests and availability
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as StudyCategory | 'all')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Methodology
            </label>
            <select
              value={selectedMethodology}
              onChange={(e) => setSelectedMethodology(e.target.value as StudyMethodology | 'all')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Methods</option>
              {methodologies.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Compensation ($)
            </label>
            <input
              type="number"
              min="0"
              step="25"
              value={minCompensation}
              onChange={(e) => setMinCompensation(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredStudies.length} studies found
        </p>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Sorted by compensation (high to low)
          </span>
        </div>
      </div>

      {/* Studies Grid */}
      {filteredStudies.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No studies found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters to see more results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <div key={study.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{getLocationIcon(study.location)}</span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {study.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {study.title}
                    </h3>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${study.compensation}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {study.duration}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {study.description}
                </p>

                {/* Study Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">{study.methodology}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{study.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{study.currentApplications} of {study.participantLimit} spots filled</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Deadline: {new Date(study.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
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

                {/* Action Button */}
                <Link
                  to={`/participant/study/${study.id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors block"
                >
                  View All Studies
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}