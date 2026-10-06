import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const catData = req.body;
    const newCategory = await Category.create({
      cat_id: `cat_${Date.now()}`,
      ...catData,
      active_count: 0
    });
    return res.status(201).json({ success: true, category: newCategory, message: 'Category created' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { cat_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    return res.json({ success: true, category, message: 'Category updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
