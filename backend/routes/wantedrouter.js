import express from "express";
import upload from "../middleware/multer.js";

import {
  createWanted,
  getWantedPosts,
  getWantedById,
} from "../controllers/wantedcontroller.js";
import { userAuth } from "../middleware/userAuth.js";

const wantedRouter = express.Router();

wantedRouter.post( "/",userAuth, upload.single("image"), createWanted );
wantedRouter.get( "/all",  getWantedPosts );
wantedRouter.get( "/:id",  getWantedById  );

export default wantedRouter;
