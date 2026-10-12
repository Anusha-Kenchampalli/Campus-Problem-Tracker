import { getCollection, saveCollection } from '../config/jsonStore.js';

export const getCategories = async (req, res) => {
  try {
    const categories = getCollection('categories');
    return res.json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const catData = req.body;
    const categories = getCollection('categories');

    const newCategory = {
      id: `cat_${Date.now()}`,
      name: catData.name || '',
      code: (catData.code || '').toUpperCase(),
      description: catData.description || '',
      icon: catData.icon || 'HelpCircle',
      active_count: 0
    };

    categories.push(newCategory);
    saveCollection('categories', categories);

    return res.status(201).json({ success: true, category: newCategory, message: 'Category created' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categories = getCollection('categories');
    const idx = categories.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found' });

    categories[idx] = { ...categories[idx], ...req.body };
    saveCollection('categories', categories);

    return res.json({ success: true, category: categories[idx], message: 'Category updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
