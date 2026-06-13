import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    mode: { type: String, required: true },
    price: { type: Number, default: 0 },
    condition: { type: String, default: 'New' },
    images: { type: [String], default: [] },
}, { timestamps: true });

const itemModel = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default itemModel;
