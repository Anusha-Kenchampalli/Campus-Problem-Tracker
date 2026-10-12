import { getCollection, saveCollection } from '../config/jsonStore.js';

export const getLocations = async (req, res) => {
  try {
    const locations = getCollection('locations');
    return res.json({ success: true, locations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createLocation = async (req, res) => {
  try {
    const locData = req.body;
    const locations = getCollection('locations');

    const newLocation = {
      id: `loc_${Date.now()}`,
      name: locData.name || '',
      building: locData.building || '',
      floor: locData.floor || '',
      rooms: locData.rooms || '',
      active_issues: 0,
      status: 'ACTIVE'
    };

    locations.push(newLocation);
    saveCollection('locations', locations);

    return res.status(201).json({ success: true, location: newLocation, message: 'Location added' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const locations = getCollection('locations');
    const idx = locations.findIndex(l => l.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Location not found' });

    locations[idx] = { ...locations[idx], ...req.body };
    saveCollection('locations', locations);

    return res.json({ success: true, location: locations[idx], message: 'Location updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
