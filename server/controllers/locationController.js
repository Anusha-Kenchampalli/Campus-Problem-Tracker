import Location from '../models/Location.js';

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    return res.json({ success: true, locations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createLocation = async (req, res) => {
  try {
    const locData = req.body;
    const newLocation = await Location.create({
      loc_id: `loc_${Date.now()}`,
      ...locData,
      active_issues: 0,
      status: 'ACTIVE'
    });
    return res.status(201).json({ success: true, location: newLocation, message: 'Location added' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndUpdate(
      { loc_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!location) return res.status(404).json({ success: false, message: 'Location not found' });
    return res.json({ success: true, location, message: 'Location updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
