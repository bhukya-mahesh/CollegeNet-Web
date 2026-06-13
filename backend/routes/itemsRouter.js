import  express from 'express';
import { addItem, getItems, getItemById } from '../controllers/itemcontroller.js';
import upload from '../middleware/multer.js';
import { userAuth } from "../middleware/userAuth.js";

const itemRouter = express.Router();

itemRouter.post('/add',userAuth, upload.single('image'), addItem);
itemRouter.get('/all', getItems);
itemRouter.get('/:id', getItemById);

export default itemRouter;