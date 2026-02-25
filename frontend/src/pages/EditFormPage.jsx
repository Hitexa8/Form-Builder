import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formAPI } from '../services/apiClient';
import FormBuilder from '../components/FormBuilder.jsx';

const EditFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      setLoading(true);
      const response = await formAPI.getFormById(id);
      if (response.success) {
        setForm(response.data);
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

  if (loading) return <div className="flex items-center justify-center min-h-[calc(100vh-200px)]"><p className="text-gray-600 text-lg">⏳ Loading form...</p></div>;

  if (error || !form) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-red-500 max-w-md">
          <p className="text-red-600 text-lg mb-6 font-semibold">{error || 'Form not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg font-semibold transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[calc(100vh-200px)]">
      <FormBuilder
        formId={id}
        initialForm={form}
        isEditing={true}
        onSuccess={() => navigate('/')}
      />
    </div>
  );
};

export default EditFormPage;
