import express from 'express'
import recruitmentController from '../controllers/Recruitment.js'
import Candidate from '../controllers/Candidate.js';
// import upload from '../helpers/mutler.js';



const router = express.Router();




router.post('/', recruitmentController.addRecruitment)
router.get('/', recruitmentController.getRecruitments)
router.get('/:id', recruitmentController.getSingleRecruitment)
router.put('/',recruitmentController.updateRecruitment)

// router.put('/', Candidate.updateCandidates)



export default router;
