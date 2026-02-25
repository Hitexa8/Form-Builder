import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl border-b-4 border-blue-700">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-3 hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-white rounded-xl p-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <span className="text-3xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">Form Builder</h1>
              <p className="text-blue-100 text-xs font-semibold">Pro Edition</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-blue-100 font-bold transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/form/create')}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              ➕ Create Form
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
