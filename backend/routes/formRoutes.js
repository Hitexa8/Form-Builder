const express = require('express');
const router = express.Router();
const FormController = require('../controllers/FormController');
const FormResponseController = require('../controllers/FormResponseController');

// Form routes
router.get('/', FormController.getAllForms);
router.post('/', FormController.createForm);
router.get('/:id', FormController.getFormById);
router.put('/:id/title', FormController.updateFormTitle);
router.post('/:id/input', FormController.addInputToForm);
router.delete('/:id/input/:inputId', FormController.deleteInputFromForm);
router.put('/:id/input/:inputId', FormController.updateInput);
router.put('/:id/reorder', FormController.reorderInputs);
router.delete('/:id', FormController.deleteForm);

// Form response routes
router.post('/:id/submit', FormResponseController.submitFormResponse);
router.get('/:id/responses', FormResponseController.getFormResponses);

module.exports = router;
