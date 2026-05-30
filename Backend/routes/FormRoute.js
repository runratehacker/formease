import express from 'express';
import formController from '../controllers/formController.js';
// import { fillForm } from '../controllers/downloadAdmissionController.js';
import { fillForm } from '../controllers/downloadSBI2Controller.js';


const router = express.Router();

router.get('/fields/:formid', 
    formController.getFormFields);
router.post('/download/:formid', fillForm);

export default router;