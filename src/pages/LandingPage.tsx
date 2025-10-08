import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, DollarSign, Shield, Search, MessageSquare, Star, Quote } from 'lucide-react';
import { mockStudies } from '../data/mockData';

export function LandingPage() {
  // Get featured studies (first 3 active studies)
  const featuredStudies = mockStudies.filter(study => study.status === 'active').slice(0, 3);

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Quality Participants',
      description: 'Access verified participants with diverse backgrounds and expertise'
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Professional Studies',
      description: 'Create comprehensive studies with screening questions and requirements'
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Fair Compensation',
      description: 'Transparent payment system with secure transactions'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Platform',
      description: 'Privacy-first approach with data protection and NDA management'
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Smart Matching',
      description: 'Advanced filtering to find the perfect participants for your research'
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Direct Communication',
      description: 'Built-in messaging system for seamless collaboration'
    }
  ];

  const stats = [
    { label: 'Active Studies', value: '2,500+' },
    { label: 'Verified Participants', value: '50,000+' },
    { label: 'Successful Projects', value: '15,000+' },
    { label: 'Average Rating', value: '4.9/5' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'UX Research Lead at TechFlow',
      content: 'Namika has transformed how we recruit participants. The quality of candidates and the streamlined process has cut our research timeline in half.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Participant',
      content: 'I\'ve earned over $2,400 participating in studies through Namika. The platform is easy to use and researchers are always professional.',
      rating: 5,
      avatar: 'MR'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Product Manager at HealthTech Solutions',
      content: 'The participant verification system gives us confidence in our research quality. We\'ve run 15+ successful studies with amazing results.',
      rating: 5,
      avatar: 'EW'
    }
  ];

  const getLocationIcon = (location: string) => {
    return location === 'remote' ? '🌐' : location === 'in-person' ? '🏢' : '🔄';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Connect with the Right
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {' '}Research Participants
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Namika Research Portal bridges the gap between researchers and participants, 
              making user research more accessible, efficient, and rewarding for everyone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register?type=researcher"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Start Recruiting Participants
              </Link>
              <Link
                to="/login?type=participant"
                className="bg-[#b6eb54] hover:bg-[#a3e635] text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Join as Participant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Studies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Research Opportunities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join these active studies and start earning money while contributing to meaningful research
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredStudies.map((study) => (
              <div key={study.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
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

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {study.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{study.currentApplications}/{study.participantLimit} spots</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 capitalize">
                      {study.methodology}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((study.currentApplications / study.participantLimit) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/participant/study/${study.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors block"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/login?type=participant"
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse All Studies
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Successful Research
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides comprehensive tools for both researchers and participants
              to ensure high-quality, meaningful research outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Researchers and Participants
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our community has to say about their experience with Namika
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Namika Works
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Researchers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                For Researchers
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full p-2 text-sm font-bold min-w-[32px] text-center">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Create Your Study</h4>
                    <p className="text-gray-600 dark:text-gray-400">Post detailed study requirements and set compensation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full p-2 text-sm font-bold min-w-[32px] text-center">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Review Applications</h4>
                    <p className="text-gray-600 dark:text-gray-400">Screen participants based on your criteria</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full p-2 text-sm font-bold min-w-[32px] text-center">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Conduct Research</h4>
                    <p className="text-gray-600 dark:text-gray-400">Use our platform tools to manage your study</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Participants */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                For Participants
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-2 text-sm font-bold min-w-[32px] text-center">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Browse Studies</h4>
                    <p className="text-gray-600 dark:text-gray-400">Find research opportunities that match your profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-2 text-sm font-bold min-w-[32px] text-center">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Apply & Get Selected</h4>
                    <p className="text-gray-600 dark:text-gray-400">Submit applications and wait for approval</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-2 text-sm font-bold min-w-[32px] text-center">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Participate & Earn</h4>
                    <p className="text-gray-600 dark:text-gray-400">Complete studies and receive compensation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-[#b6eb54]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Research?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of researchers and participants already using Namika to create meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              to="/demo"
              className="border-2 border-white text-white hover:bg-[#b6eb54] hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}