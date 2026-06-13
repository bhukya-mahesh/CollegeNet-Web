import express from "express";

import {
  getMessages, getConversations
} from "../controllers/messageController.js";

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