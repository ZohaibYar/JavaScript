const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const { authenticate, authorize, authorizeAdmin } = require('../middleware/auth');

router.post('/create', authenticate, authorize('clerk'), caseController.createCase);
router.patch('/:id/date', authenticate, authorize('registrar'), caseController.assignDate);
router.patch('/:id/stage', authenticate, authorize('judge'), caseController.updateCaseStage);
router.get('/', authenticate, caseController.getAllCases);
router.get('/report', authenticate, caseController.generateReports);
router.delete('/:id', authenticate, authorizeAdmin, caseController.deleteCase);
router.get('/export/pdf', authenticate, caseController.exportCasesToPDF);
router.get('/search', authenticate, caseController.searchCases);

module.exports = router;