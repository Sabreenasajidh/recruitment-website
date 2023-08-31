import express from 'express'
import recruitmentCandidateController from '../controllers/RecruitmentCandidate.js'
import multer from 'multer'
import path from 'path'

let multerStorage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        console.log("test");
        const ext = path.parse(file.originalname).ext;
        const name = path.parse(file.originalname).name;
        cb(null, `${name}-${Date.now()}${ext}`);
    },
});

const upload = multer({
    storage: multerStorage
});


const router = express.Router();

router.post('/', recruitmentCandidateController.addRecruitmentCandidate)
router.get('/:id',recruitmentCandidateController.getSingleRecruitment)
// get canidates with particular recriymentId and candidateID
router.get('/candidates/:id', recruitmentCandidateController.getCandidates) 

//get canidates with particular recriymentId and candidateID
router.get('/:id1/:id',recruitmentCandidateController.getRecruitmentCandidate)


router.put('/', upload.single('offerLetter'), recruitmentCandidateController.updateRecruitmentCandidates)


export default router;