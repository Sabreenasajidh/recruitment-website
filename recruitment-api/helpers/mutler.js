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
export default upload