import express from 'express';
import multer from 'multer';

const fileManagerRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


fileManagerRouter.post('/upload', upload.single('file'), async (req: express.Request, res: express.Response) => {
 const file = req.file;
 const caption = req.body.caption;
 console.log('file', file, caption);
 res.status(200).send({});
});

fileManagerRouter.get('/all', (req: express.Request, res: express.Response) => {
 res.status(200).send({});
});


export { fileManagerRouter };
