import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formAPI } from '../services/apiClient';
import InputTypeSelector from './InputTypeSelector.jsx';
import FormInputsList from './FormInputsList.jsx';

const FormBuilder = ({ formId: initialFormId, initialForm, isEditing, onSuccess }) => {
  const navigate = useNavigate();
  const [formId, setFormId] = useState(initialFormId || null);
  const [form, setForm] = useState({
    title: '',
    inputs: []
  });
  const [titleError, setTitleError] = useState('');
  const [showInputSelector, setShowInputSelector] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
    }
  }, [initialForm]);

  const handleTitleChange = (e) => {
    setTitleError('');
    setForm(prev => ({ ...prev, title: e.target.value }));
  };

  const handleAddInput = async (inputData) => {
    if (form.inputs.length >= 20) {
      setError('Maximum 20 inputs allowed');
      return;
    }

    // Require form title before adding inputs
    if (!form.title.trim()) {
      setTitleError('Form title is required before adding inputs');
      return;
    }

    // If no formId, save the form first
    if (!formId) {
      try {
        setSaving(true);
        setError(null);
        const createResponse = await formAPI.createForm(form.title);
        if (!createResponse.success) {
          setError(createResponse.message || 'Failed to create form');
          setSaving(false);
          return;
        }
        
        // Store the new formId
        const newFormId = createResponse.data._id;
        setFormId(newFormId);
        
        // Now add the input to the newly created form
        const addResponse = await formAPI.addInput(newFormId, inputData);
        if (addResponse.success) {
          setForm(addResponse.data);
          setShowInputSelector(false);
        } else {
          setError(addResponse.message || 'Failed to add input');
        }
      } catch (err) {
        setError('Error adding input: ' + err.message);
        console.error('Error adding input:', err);
      } finally {
        setSaving(false);
      }
    } else {
      // Form already exists, just add input
      try {
        setError(null);
        const response = await formAPI.addInput(formId, inputData);
        if (response.success) {
          setForm(response.data);
          setShowInputSelector(false);
        } else {
          setError(response.message || 'Failed to add input');
        }
      } catch (err) {
        setError('Error adding input: ' + err.message);
        console.error('Error adding input:', err);
      }
    }
  };

  const handleDeleteInput = async (inputId) => {
    if (window.confirm('Delete this input?')) {
      try {
        if (!formId) {
          // If form not saved yet, just remove from local state
          setForm(prev => ({
            ...prev,
            inputs: prev.inputs.filter(input => input.id !== inputId)
          }));
        } else {
          const response = await formAPI.deleteInput(formId, inputId);
          if (response.success) {
            setForm(response.data);
          }
        }
      } catch (err) {
        console.error('Error deleting input:', err);
      }
    }
  };

  const handleUpdateInput = async (inputId, inputData) => {
    try {
      if (!formId) {
        // If form not saved yet, update local state
        setForm(prev => ({
          ...prev,
          inputs: prev.inputs.map(input =>
            input.id === inputId ? { ...input, ...inputData } : input
          )
        }));
      } else {
        const response = await formAPI.updateInput(formId, inputId, inputData);
        if (response.success) {
          setForm(response.data);
        }
      }
    } catch (err) {
      console.error('Error updating input:', err);
    }
  };

  const handleReorderInputs = async (newOrder) => {
    try {
      if (formId) {
        const response = await formAPI.reorderInputs(formId, newOrder);
        if (response.success) {
          setForm(response.data);
        }
      }
    } catch (err) {
      console.error('Error reordering inputs:', err);
    }
  };

  const handleSaveForm = async () => {
    if (!form.title.trim()) {
      setTitleError('Form title is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      let response;
      if (isEditing && formId) {
        response = await formAPI.updateFormTitle(formId, form.title);
      } else if (formId) {
        // Form already created (when adding inputs), just update title
        response = await formAPI.updateFormTitle(formId, form.title);
      } else {
        // Create new form
        response = await formAPI.createForm(form.title);
        if (response.success) {
          setFormId(response.data._id);
          setForm(response.data);
        }
      }

      if (response.success) {
        setTimeout(() => onSuccess(), 500);
      } else {
        setError(response.message || 'Error saving form');
      }
    } catch (err) {
      setError('Error saving form: ' + err.message);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 border-t-4 border-blue-500">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            {isEditing ? '✏️ Edit Form' : '➕ Create New Form'}
          </h1>
          <p className="text-gray-600 text-lg mb-10">{isEditing ? 'Update your form title and manage inputs' : 'Build your perfect form by adding fields'}</p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl mb-8 shadow-lg font-bold">
              <p>⚠️ {error}</p>
            </div>
          )}

          {/* Form Title Input */}
          <div className="mb-10">
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
              📋 Form Title
            </label>
            <input
              type="text"
              placeholder="e.g., Customer Feedback Form"
              value={form.title}
              onChange={handleTitleChange}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm font-medium hover:border-blue-400"
            />
            {titleError && <p className="text-red-600 text-sm mt-2 font-bold">❌ {titleError}</p>}
          </div>

          {/* Input Type Selector */}
          {showInputSelector && (
            <InputTypeSelector
              onAddInput={handleAddInput}
              onCancel={() => setShowInputSelector(false)}
              inputCount={form.inputs.length}
            />
          )}

          {/* Add Input Button */}
          {!showInputSelector && form.inputs.length < 20 && (
            <button
              onClick={() => setShowInputSelector(true)}
              className="mb-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-xl font-bold transition-all duration-300 shadow-lg hover:scale-105 transform"
            >
              ➕ Add Input Field
            </button>
          )}

          {/* Form Inputs List */}
          {form.inputs.length > 0 && (
            <FormInputsList
              inputs={form.inputs}
              onDeleteInput={handleDeleteInput}
              onUpdateInput={handleUpdateInput}
              onReorderInputs={handleReorderInputs}
              isEditing={isEditing}
              formId={formId}
            />
          )}

          {/* Save Form Button */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleSaveForm}
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:shadow-xl font-bold transition-all duration-300 shadow-lg disabled:opacity-50 hover:scale-105 transform text-lg"
            >
              {saving ? 'Saving...' : 'Save Form'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
             Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
