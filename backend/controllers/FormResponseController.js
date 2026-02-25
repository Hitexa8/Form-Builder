const FormResponseService = require('../services/FormResponseService');

class FormResponseController {
  // Submit form response
  async submitFormResponse(req, res) {
    try {
      const { id } = req.params;
      const { responses } = req.body;

      if (!responses || typeof responses !== 'object') {
        return res.status(400).json({
          success: false,
          message: 'Valid responses object is required',
        });
      }

      const formResponse = await FormResponseService.submitFormResponse(id, responses);
      res.status(201).json({
        success: true,
        data: formResponse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get form responses
  async getFormResponses(req, res) {
    try {
      const { id } = req.params;
      const responses = await FormResponseService.getFormResponses(id);
      res.json({
        success: true,
        data: responses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new FormResponseController();
