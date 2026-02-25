const FormResponse = require('../models/FormResponse');

class FormResponseService {
  // Submit form response
  async submitFormResponse(formId, responses) {
    try {
      const formResponse = new FormResponse({
        formId,
        responses,
      });
      await formResponse.save();
      return formResponse;
    } catch (error) {
      throw new Error(`Error submitting form response: ${error.message}`);
    }
  }

  // Get all responses for a form
  async getFormResponses(formId) {
    try {
      const responses = await FormResponse.find({ formId }).sort({ submittedAt: -1 });
      return responses;
    } catch (error) {
      throw new Error(`Error fetching form responses: ${error.message}`);
    }
  }
}

module.exports = new FormResponseService();
