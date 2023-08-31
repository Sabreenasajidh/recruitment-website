import express from 'express'
import agreementController from '../controllers/Agreement.js'

const router = express.Router();
router.post('/',agreementController.addAgreement)
router.get('/',agreementController.listAgreements)
router.get('/:id',agreementController.getAgreement)
router.put('/',agreementController.updateAgreement)

export default router;
