import express from "express";
import upload from "../middleware/multer.js";
import {userAuth} from "../middleware/userAuth.js";
import { createReport,getReports,getReportById} from "../controllers/lostfoundcontroller.js";

const lostfoundRouter = express.Router();

lostfoundRouter.post("/reports",userAuth, upload.array("photos"), createReport);
lostfoundRouter.get("/reports",userAuth, getReports);
lostfoundRouter.get("/reports-card-details/:id", userAuth, getReportById);

export default lostfoundRouter;