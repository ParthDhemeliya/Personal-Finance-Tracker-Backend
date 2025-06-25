import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      requied: false,
      type: String,
      default: '#3b82f6',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);
const Category = mongoose.model('Category', categorySchema);
export default Category;
