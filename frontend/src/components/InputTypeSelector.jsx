import React, { useState } from 'react';

const InputTypeSelector = ({ onAddInput, onCancel, inputCount }) => {
  const [type, setType] = useState('text');
  const [title, setTitle] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputTypes = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'password', label: 'Password' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date'},
  ];

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      // Wait for the onAddInput callback to complete
      await onAddInput({
        type,
        title: title.trim(),
        placeholder: placeholder.trim(),
      });

      // Reset form only after successful submission
      setType('text');
      setTitle('');
      setPlaceholder('');
      setErrors({});
    } catch (err) {
      console.error('Error adding input:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 border-3 border-blue-400 rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
      <h3 className="text-2xl font-black text-blue-900 mb-8 flex items-center gap-2">Add Input Field #{inputCount + 1}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Input Type */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
            Input Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white font-bold text-gray-800 hover:border-blue-400"
          >
            {inputTypes.map(t => (
              <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
            Field Label
          </label>
          <input
            type="text"
            placeholder="e.g., Full Name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent transition-all duration-300 font-medium hover:border-blue-400"
          />
          {errors.title && <p className="text-red-600 text-sm mt-2 font-bold">{errors.title}</p>}
        </div>

        {/* Placeholder */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
            Placeholder Text (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Enter your full name"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent transition-all duration-300 font-medium hover:border-blue-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all duration-300 disabled:opacity-50 hover:scale-105 transform"
          >
            {loading ? 'Adding...' : '➕ Add Field'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 hover:shadow-lg transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputTypeSelector;
