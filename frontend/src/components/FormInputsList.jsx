import React, { useState } from 'react';

const FormInputsList = ({ inputs, onDeleteInput, onUpdateInput, onReorderInputs, isEditing, formId }) => {
  const [editingInputId, setEditingInputId] = useState(null);
  const [editData, setEditData] = useState({});
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const handleEditStart = (input) => {
    setEditingInputId(input.id);
    setEditData({
      type: input.type,
      title: input.title,
      placeholder: input.placeholder,
    });
  };

  const handleEditSave = (inputId) => {
    if (editData.title.trim()) {
      onUpdateInput(inputId, editData);
      setEditingInputId(null);
    }
  };

  const handleEditCancel = () => {
    setEditingInputId(null);
  };

  const inputTypes = ['text', 'email', 'password', 'number', 'date'];

  const handleDragStart = (e, inputId) => {
    setDraggedId(inputId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, inputId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(inputId);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    // Reorder inputs locally
    const draggedIndex = inputs.findIndex(i => i.id === draggedId);
    const targetIndex = inputs.findIndex(i => i.id === targetId);
    
    const newInputs = Array.from(inputs);
    const [removed] = newInputs.splice(draggedIndex, 1);
    newInputs.splice(targetIndex, 0, removed);

    // Update positions
    newInputs.forEach((input, index) => {
      input.position = index;
    });

    // Call the parent's callback to handle reordering
    if (onReorderInputs && formId) {
      const newOrder = newInputs.map(input => input.id);
      await onReorderInputs(newOrder);
    }

    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <div className="mb-10">
      <h3 className="text-2xl font-black text-blue-900 mb-3">Form Fields ({inputs.length}/20)</h3>
      <p className="text-sm text-gray-600 mb-6 font-semibold">💡Drag fields to reorder them</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputs.map((input, index) => (
          <div
            key={input.id}
            draggable
            onDragStart={(e) => handleDragStart(e, input.id)}
            onDragOver={(e) => handleDragOver(e, input.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, input.id)}
            className={`border-2 rounded-2xl p-6 bg-gradient-to-br transition-all duration-300 cursor-move ${
              dragOverId === input.id
                ? 'border-yellow-400 from-yellow-50 to-yellow-100 shadow-2xl scale-105 bg-yellow-50'
                : 'from-white to-blue-50 border-blue-300 shadow-lg hover:shadow-2xl hover:scale-102'
            } ${draggedId === input.id ? 'opacity-60 border-dashed' : ''}`}
          >
            {/* Drag Handle */}
            

            {editingInputId === input.id ? (
              // Edit Mode
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider">Type</label>
                  <select
                    value={editData.type}
                    onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent font-bold hover:border-blue-400 transition-all"
                  >
                    {inputTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider">Label</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent font-medium hover:border-blue-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider">Placeholder</label>
                  <input
                    type="text"
                    value={editData.placeholder}
                    onChange={(e) => setEditData({ ...editData, placeholder: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent font-medium hover:border-blue-400 transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => handleEditSave(input.id)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="mb-5">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">🔢 Field #{index + 1}</p>
                  <p className="font-black text-gray-900 text-xl mb-3">{input.title}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-bold">{input.type}</span>
                    {input.placeholder && (
                      <span className="text-xs text-gray-600 font-medium">💬 {input.placeholder}</span>
                    )}
                  </div>
                </div>
                
                {/* Input Preview (Read-only) */}
                <input
                  type={input.type === 'password' ? 'password' : input.type}
                  placeholder={input.placeholder}
                  disabled
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl text-sm bg-gray-100 mb-5 cursor-not-allowed font-medium"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditStart(input)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteInput(input.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormInputsList;
