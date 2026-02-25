const FormService = require('../services/FormService');

class FormController {
  // Get all forms
  async getAllForms(req, res) {
    try {
      const forms = await FormService.getAllForms();
      res.json({
        success: true,
        data: forms,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get form by ID
  async getFormById(req, res) {
    try {
      const { id } = req.params;
      const form = await FormService.getFormById(id);
      res.json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Create new form
  async createForm(req, res) {
    try {
      const { title } = req.body;
      
      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Form title is required',
        });
      }

      const form = await FormService.createForm(title);
      res.status(201).json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update form title
  async updateFormTitle(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Form title is required',
        });
      }

      const form = await FormService.updateFormTitle(id, title);
      res.json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Add input to form
  async addInputToForm(req, res) {
    try {
      const { id } = req.params;
      const { type, title, placeholder } = req.body;

      if (!type || !title) {
        return res.status(400).json({
          success: false,
          message: 'Input type and title are required',
        });
      }

      const validTypes = ['text', 'email', 'password', 'number', 'date'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input type',
        });
      }

      const form = await FormService.addInputToForm(id, {
        type,
        title,
        placeholder: placeholder || '',
      });

      res.json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete input from form
  async deleteInputFromForm(req, res) {
    try {
      const { id, inputId } = req.params;
      const form = await FormService.deleteInputFromForm(id, inputId);
      res.json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update input
  async updateInput(req, res) {
    try {
      const { id, inputId } = req.params;
      const { type, title, placeholder } = req.body;

      if (!type || !title) {
        return res.status(400).json({
          success: false,
          message: 'Input type and title are required',
        });
      }

      const form = await FormService.updateInput(id, inputId, {
        type,
        title,
        placeholder: placeholder || '',
      });

      res.json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Reorder inputs
  async reorderInputs(req, res) {
    try {
      const { id } = req.params;
      const { newOrder } = req.body;

      if (!Array.isArray(newOrder)) {
        return res.status(400).json({
          success: false,
          message: 'newOrder must be an array of input IDs',
        });
      }

      const form = await FormService.reorderInputs(id, newOrder);
      res.json({
        success: true,
        data: form,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete form
  async deleteForm(req, res) {
    try {
      const { id } = req.params;
      await FormService.deleteForm(id);
      res.json({
        success: true,
        message: 'Form deleted successfully',
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new FormController();
