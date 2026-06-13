import express from "express";

import {
  getMessages, getConversations
} from "../controllers/messagecontroller.js";

const router =
  express.Router();


router.get(
  "/conversations/:userId",
  getConversations
);
router.get(
  "/:senderId/:receiverId",
  getMessages
);


export default router;