import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormBuilder from '../components/FormBuilder.jsx';

const CreateFormPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[calc(100vh-200px)]">
      <FormBuilder
        isEditing={false}
        onSuccess={() => navigate('/')}
      />
    </div>
  );
};

export default CreateFormPage;
