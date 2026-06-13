import Message from "../models/messagemodel.js"
import User from "../models/userModel.js"

export const getMessages = async (
  req,
  res
) => {
  try {

    const {
      senderId,
      receiverId,
    } = req.params;

    const messages =
      await Message.find({
        $or: [
          {
            senderId,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      }).sort({
        createdAt: 1,
      });

    res.json({
      success: true,
      messages,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getConversations = async (
  req,
  res
) => {
  try {

    const userId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({
      createdAt: -1
    });

    const conversations = {};

    for (const msg of messages) {

      const otherUser =
        msg.senderId === userId
          ? msg.receiverId
          : msg.senderId;

      if (!conversations[otherUser]) {

        const user =
          await User.findById(otherUser);

        conversations[otherUser] = {
          userId: otherUser,
          userName: user?.name || "User",
          lastMessage: msg.text,
          createdAt: msg.createdAt,
        };

      }

    }
    console.log("CONVERSATIONS:", Object.values(conversations));
    
    res.json({
      success: true,
      conversations:
        Object.values(conversations),
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};