const Form = require('../models/Form');

class FormService {
  // Get all forms
  async getAllForms() {
    try {
      const forms = await Form.find().sort({ createdAt: -1 });
      return forms;
    } catch (error) {
      throw new Error(`Error fetching forms: ${error.message}`);
    }
  }

  // Get form by ID
  async getFormById(formId) {
    try {
      const form = await Form.findById(formId);
      if (!form) {
        throw new Error('Form not found');
      }
      return form;
    } catch (error) {
      throw new Error(`Error fetching form: ${error.message}`);
    }
  }

  // Create new form
  async createForm(title) {
    try {
      const form = new Form({
        title,
        inputs: [],
      });
      await form.save();
      return form;
    } catch (error) {
      throw new Error(`Error creating form: ${error.message}`);
    }
  }

  // Update form title
  async updateFormTitle(formId, title) {
    try {
      const form = await Form.findByIdAndUpdate(
        formId,
        { title, updatedAt: Date.now() },
        { new: true }
      );
      if (!form) {
        throw new Error('Form not found');
      }
      return form;
    } catch (error) {
      throw new Error(`Error updating form: ${error.message}`);
    }
  }

  // Add input to form
  async addInputToForm(formId, inputData) {
    try {
      const form = await Form.findById(formId);
      if (!form) {
        throw new Error('Form not found');
      }

      // Check if form already has 20 inputs
      if (form.inputs.length >= 20) {
        throw new Error('Maximum 20 inputs allowed per form');
      }

      const newInput = {
        id: Date.now().toString(),
        type: inputData.type,
        title: inputData.title,
        placeholder: inputData.placeholder || '',
        position: form.inputs.length,
      };

      form.inputs.push(newInput);
      form.updatedAt = Date.now();
      await form.save();
      return form;
    } catch (error) {
      throw new Error(`Error adding input: ${error.message}`);
    }
  }

  // Delete input from form
  async deleteInputFromForm(formId, inputId) {
    try {
      const form = await Form.findById(formId);
      if (!form) {
        throw new Error('Form not found');
      }

      form.inputs = form.inputs.filter(input => input.id !== inputId);
      
      // Reorder positions
      form.inputs.forEach((input, index) => {
        input.position = index;
      });

      form.updatedAt = Date.now();
      await form.save();
      return form;
    } catch (error) {
      throw new Error(`Error deleting input: ${error.message}`);
    }
  }

  // Update input
  async updateInput(formId, inputId, updatedData) {
    try {
      const form = await Form.findById(formId);
      if (!form) {
        throw new Error('Form not found');
      }

      const inputIndex = form.inputs.findIndex(input => input.id === inputId);
      if (inputIndex === -1) {
        throw new Error('Input not found');
      }

      form.inputs[inputIndex] = {
        id: form.inputs[inputIndex].id,
        type: updatedData.type,
        title: updatedData.title,
        placeholder: updatedData.placeholder,
        position: form.inputs[inputIndex].position,
      };

      form.updatedAt = Date.now();
      await form.save();
      return form;
    } catch (error) {
      throw new Error(`Error updating input: ${error.message}`);
    }
  }

  // Reorder inputs
  async  reorderInputs(formId, newOrder) {
    try {
      const form = await Form.findById(formId);
      if (!form) {
        throw new Error('Form not found');
      }

      // Create a map of id to input
      const inputMap = {};
      form.inputs.forEach(input => {
        inputMap[input.id] = input;
      });

      // Reorder based on newOrder array
      form.inputs = newOrder.map((inputId, index) => {
        const input = inputMap[inputId];
        input.position = index;
        return input;
      });

      form.updatedAt = Date.now();
      await form.save();
      return form;
    } catch (error) {
      throw new Error(`Error reordering inputs: ${error.message}`);
    }
  }

  // Delete form
  async deleteForm(formId) {
    try {
      const form = await Form.findByIdAndDelete(formId);
      if (!form) {
        throw new Error('Form not found');
      }
      return form;
    } catch (error) {
      throw new Error(`Error deleting form: ${error.message}`);
    }
  }
}

module.exports = new FormService();
