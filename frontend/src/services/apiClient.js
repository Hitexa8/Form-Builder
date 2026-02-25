const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const formAPI = {
  // Get all forms
  getAllForms: async () => {
    const response = await fetch(`${API_URL}/forms`);
    return response.json();
  },

  // Create form
  createForm: async (title) => {
    const response = await fetch(`${API_URL}/forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  // Get form by ID
  getFormById: async (id) => {
    const response = await fetch(`${API_URL}/forms/${id}`);
    return response.json();
  },

  // Update form title
  updateFormTitle: async (id, title) => {
    const response = await fetch(`${API_URL}/forms/${id}/title`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  // Add input
  addInput: async (formId, inputData) => {
    const response = await fetch(`${API_URL}/forms/${formId}/input`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });
    return response.json();
  },

  // Delete input
  deleteInput: async (formId, inputId) => {
    const response = await fetch(`${API_URL}/forms/${formId}/input/${inputId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Update input
  updateInput: async (formId, inputId, inputData) => {
    const response = await fetch(`${API_URL}/forms/${formId}/input/${inputId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });
    return response.json();
  },

  // Reorder inputs
  reorderInputs: async (formId, newOrder) => {
    const response = await fetch(`${API_URL}/forms/${formId}/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newOrder }),
    });
    return response.json();
  },

  // Delete form
  deleteForm: async (id) => {
    const response = await fetch(`${API_URL}/forms/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Submit form response
  submitForm: async (formId, responses) => {
    const response = await fetch(`${API_URL}/forms/${formId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responses }),
    });
    return response.json();
  },

  // Get form responses
  getFormResponses: async (formId) => {
    const response = await fetch(`${API_URL}/forms/${formId}/responses`);
    return response.json();
  },
};
