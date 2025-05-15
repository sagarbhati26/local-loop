import Service from '../models/Service.js';


export const createService = async (req, res) => {
  try {
    const { title, category, description, price, location } = req.body;

    const service = new Service({
      title,
      category,
      description,
      price,
      location,
      provider: req.user._id,
    });

    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error });
  }
};


export const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user._id });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error });
  }
};


export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, category, description, price, location } = req.body;
    service.title = title || service.title;
    service.category = category || service.category;
    service.description = description || service.description;
    service.price = price || service.price;
    service.location = location || service.location;

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error });
  }
};


export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await service.deleteOne();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error });
  }
};