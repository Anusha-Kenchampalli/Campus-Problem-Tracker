import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    cat_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true, uppercase: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'HelpCircle' },
    active_count: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
