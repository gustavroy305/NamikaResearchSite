import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Namika</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Connecting researchers with study participants for meaningful user research.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">For Researchers</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/researcher/pricing" className="hover:text-blue-600 dark:hover:text-blue-400">Pricing</Link></li>
              <li><Link to="/researcher/features" className="hover:text-blue-600 dark:hover:text-blue-400">Features</Link></li>
              <li><Link to="/researcher/success-stories" className="hover:text-blue-600 dark:hover:text-blue-400">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">For Participants</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/participant/how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400">How It Works</Link></li>
              <li><Link to="/participant/earnings" className="hover:text-blue-600 dark:hover:text-blue-400">Earnings Guide</Link></li>
              <li><Link to="/participant/safety" className="hover:text-blue-600 dark:hover:text-blue-400">Safety & Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/help" className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Namika Research Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}