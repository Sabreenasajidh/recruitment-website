import express from 'express'
import clientController from '../controllers/Client.js'  

var router = express.Router();


router.get('/names',clientController.getClientNames)
router.post('/' ,clientController.addClient)
router.get('/' ,clientController.listClient)
router.get('/:id' ,clientController.getClient)
router.put('/:id', clientController.editClient)

//clientController.getClientNames)
export default router;