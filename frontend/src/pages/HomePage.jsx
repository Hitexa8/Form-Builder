import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formAPI } from '../services/apiClient';

const HomePage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const response = await formAPI.getAllForms();
      if (response.success) {
        setForms(response.data);
      } else {
        setError(response.message || 'Failed to fetch forms');
      }
    } catch (err) {
      setError('Error fetching forms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        const response = await formAPI.deleteForm(formId);
        if (response.success) {
          setForms(forms.filter(form => form._id !== formId));
        }
      } catch (err) {
        console.error('Error deleting form:', err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-block mb-4">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">Your Forms</span>
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">My Forms</h2>
              <p className="text-gray-600 text-lg">Create, manage, and share your forms with ease</p>
            </div>
            <button
              onClick={() => navigate('/form/create')}
              className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:shadow-xl font-bold transition-all duration-300 shadow-lg hover:scale-105 transform text-lg w-full md:w-auto"
            >
              ✨ Create Form
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl mb-8 shadow-lg font-semibold">
            <p className="mb-1">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Loading your forms...</p>
            </div>
          </div>
        )}

        {/* Forms Grid */}
        {!loading && forms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div key={form._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border-t-4 border-blue-500 hover:scale-105 transform hover:border-indigo-500 group">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{form.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">📝 {form.inputs.length} field{form.inputs.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => navigate(`/form/${form._id}/edit`)}
                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-100 font-bold transition-all duration-300 hover:shadow-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => navigate(`/form/${form._id}`)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:shadow-xl font-bold transition-all duration-300 hover:scale-105"
                  >
                    👁️ View
                  </button>
                  <button
                    onClick={() => handleDelete(form._id)}
                    className="bg-red-100 text-red-600 px-4 py-3 rounded-xl hover:bg-red-200 font-bold transition-all duration-300 hover:shadow-md"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Forms Message */}
        {!loading && forms.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-4 border-dashed border-blue-300 hover:shadow-2xl transition-shadow duration-300">
            <p className="text-6xl mb-6 animate-bounce">📝</p>
            <p className="text-gray-700 text-xl mb-2 font-black">No forms created yet</p>
            <p className="text-gray-600 text-lg mb-8">Start building your first form today and manage responses with ease</p>
            <button
              onClick={() => navigate('/form/create')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl hover:shadow-xl font-bold transition-all duration-300 shadow-lg hover:scale-105 transform text-lg"
            >
              ✨ Create Your First Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
