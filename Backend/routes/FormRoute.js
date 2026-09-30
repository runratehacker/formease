import express from 'express';
import { getFormFields } from '../controllers/formController.js';
import { getFormController, getAllForms } from '../controllers/formController.js';


const router = express.Router();

router.get('/forms', getAllForms);
router.get('/fields/:formid', getFormFields);
router.post('/download/:formid', getFormController);

export default router;