import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formAPI } from '../services/apiClient';

const ViewFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      setLoading(true);
      const response = await formAPI.getFormById(id);
      if (response.success) {
        setForm(response.data);
        // Initialize empty responses
        const initialResponses = {};
        response.data.inputs.forEach(input => {
          initialResponses[input.id] = '';
        });
        setResponses(initialResponses);
      } else {
        setError(response.message || 'Failed to fetch form');
      }
    } catch (err) {
      setError('Error fetching form');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (inputId, value) => {
    setResponses(prev => ({
      ...prev,
      [inputId]: value
    }));
  };

  const validateInput = (input, value) => {
    if (!value.trim()) return `${input.title} is required`;

    switch (input.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return `${input.title} must be a valid email`;
        break;
      case 'number':
        if (isNaN(value)) return `${input.title} must be a number`;
        break;
      case 'date':
        if (!value) return `${input.title} is required`;
        break;
      default:
        break;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all inputs
    for (let input of form.inputs) {
      const error = validateInput(input, responses[input.id]);
      if (error) {
        setError(error);
        return;
      }
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await formAPI.submitForm(id, responses);
      if (response.success) {
        setSubmitSuccess(true);
        setResponses({});
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(response.message || 'Failed to submit form');
      }
    } catch (err) {
      setError('Error submitting form');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="p-8 text-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-red-600 mb-6 font-bold text-lg">❌ {error || 'Form not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!form) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="bg-white rounded-2xl shadow-2xl p-10 border-t-4 border-blue-500">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">{form.title}</h1>
          <p className="text-gray-600 text-lg mb-10 font-medium">Complete the form below and submit your response</p>

          {submitSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-xl mb-8 shadow-lg font-bold">
              <p>✅ Form submitted successfully! Redirecting...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl mb-8 shadow-lg font-bold">
              <p>⚠️ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {form.inputs && form.inputs.map((input, index) => (
                <div key={input.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-300">
                  <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                    🔢 {index + 1}. {input.title}
                  </label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    value={responses[input.id] || ''}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm font-medium hover:border-blue-400"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:shadow-xl font-bold transition-all duration-300 shadow-lg disabled:opacity-50 hover:scale-105 transform text-lg"
              >
                {submitting ? '⏳ Submitting...' : '✅ Submit Form'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewFormPage;
