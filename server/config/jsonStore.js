import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../db.json');

// Read the full JSON store
export const readStore = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { departments: [], categories: [], locations: [], staff: [], problems: [], feedback: [], notifications: [], users: [] };
  }
};

// Write the full JSON store
export const writeStore = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// Helper to get a specific collection
export const getCollection = (collection) => {
  return readStore()[collection] || [];
};

// Helper to save a specific collection
export const saveCollection = (collection, items) => {
  const store = readStore();
  store[collection] = items;
  writeStore(store);
};
