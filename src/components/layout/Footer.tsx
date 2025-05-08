
import React from "react";
import { BookOpen } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <BookOpen className="h-6 w-6 text-studyvault-primary mr-2" />
            <span className="text-xl font-semibold text-studyvault-dark">Study Vault</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-studyvault-primary text-sm">
                    All Subjects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-studyvault-primary text-sm">
                    Recent Uploads
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-studyvault-primary text-sm">
                    How to Contribute
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Support</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-studyvault-primary text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-studyvault-primary text-sm">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-studyvault-primary text-sm">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Stay Connected</h3>
              <p className="mt-4 text-sm text-gray-500">
                Get updates on new study materials and features.
              </p>
              <form className="mt-4 sm:flex">
                <input
                  aria-label="Email address"
                  type="email"
                  required
                  className="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-studyvault-primary focus:border-studyvault-primary"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 w-full md:mt-0 md:ml-3 md:w-auto flex-shrink-0 px-4 py-2 bg-studyvault-primary text-white text-base font-medium rounded-md hover:bg-studyvault-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-studyvault-primary"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Study Vault. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-studyvault-primary">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-studyvault-primary">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
