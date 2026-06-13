import mongoose from "mongoose";

const wantedSchema = new mongoose.Schema(
  { 
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
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
      enum: [
        "Electronics",
        "Furniture",
        "Clothing",
        "Books",
        "Sports",
        "Kitchen",
        "Tools",
        "Other",
      ],
    },

    image: {
      type: String,
      default: "",
    },

    budget: {
      type: String,
      enum: ["any", "free", "max"],
      default: "any",
    },

    maxPrice: {
      type: Number,
      default: null,
    },

    urgency: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    condition: {
      type: String,
      enum: [
        "Any Condition",
        "New",
        "Like New",
        "Used",
      ],
      default: "Any Condition",
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "active",
        "fulfilled",
        "expired",
        "closed",
      ],
      default: "active",
    },

    // Later when authentication is added
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const WantedModel =
  mongoose.models.Wanted ||
  mongoose.model("Wanted", wantedSchema);

export default WantedModel;