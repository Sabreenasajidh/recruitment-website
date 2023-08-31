import express from 'express'
import candidateController from '../controllers/Candidate.js'
import multer from 'multer'
import path from 'path'

var router = express.Router();

let multerStorage = multer.diskStorage({
	destination: 'public/uploads',
	filename: (req, file, cb) => {
		const ext = path.parse(file.originalname).ext;
		const name = path.parse(file.originalname).name;
		cb(null, `${name}-${Date.now()}${ext}`);
	},
});

const upload = multer({
	storage: multerStorage
});

router.post('/', upload.single('file') ,candidateController.addCandidate)
router.get('/' ,candidateController.listCandidate)
router.get('/:id' ,candidateController.getCandidate)
router.put('/:id', upload.single('file') ,candidateController.editCandidate)
export default router;