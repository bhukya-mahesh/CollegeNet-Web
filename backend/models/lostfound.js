import mongoose from "mongoose";
const lostfound = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reportType: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    photos: [
      {
        type: String,
      },
    ],

    questions: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],

    contactMethod: {
      type: String,
      enum: ["chat", "phone", "email"],
      default: "chat",
    },

    status: {
      type: String,
      enum: ["active", "claimed", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const LostFoundModel =
  mongoose.models.LostFound ||
  mongoose.model("LostFound", lostfound);

export default LostFoundModel;
