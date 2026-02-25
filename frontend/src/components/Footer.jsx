import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 mt-20 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">📋 Form Builder</h3>
            <p className="text-sm leading-relaxed">
              Create, customize, and manage your forms with ease. A simple yet powerful form building solution for your business needs.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Features</h3>
            <ul className="text-sm space-y-2">
              <li className="hover:text-blue-400 transition-colors duration-200">Easy Form Creation</li>
              <li className="hover:text-blue-400 transition-colors duration-200">Customizable Inputs</li>
              <li className="hover:text-blue-400 transition-colors duration-200">Instant Save</li>
              <li className="hover:text-blue-400 transition-colors duration-200">Form Validation</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="text-sm space-y-2">
              <li className="hover:text-blue-400 transition-colors duration-200">Email: support@formbuilder.com</li>
              <li className="hover:text-blue-400 transition-colors duration-200">Chat Support</li>
              <li className="hover:text-blue-400 transition-colors duration-200">Documentation</li>
              <li className="hover:text-blue-400 transition-colors duration-200">Report Bug</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-sm">
              © {currentYear} <span className="font-bold text-blue-400">hitexa</span>. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-200">Contact Us</a>
            </div>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="text-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Built with 💙 by <span className="text-blue-400 font-semibold">hitexa</span> • Made to create beautiful forms
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
