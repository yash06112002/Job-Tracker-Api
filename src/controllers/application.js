const Application = require('../models/application');

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user._id });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application || application.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createApplication = async (req, res) => {
    const { company, role, status, notes } = req.body;

    try {
        const application = await Application.create({
            user: req.user._id,
            company,
            role,
            status,
            notes,
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateApplication = async (req, res) => {
    try {     
        const application = await Application.findById(req.params.id);

        if (!application || application.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Application not found' });
        }

        Object.assign(application, req.body);
        const updatedApplication = await application.save();
        res.json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application || application.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Application not found' });
        }

        await application.deleteOne();
        res.json({ message: 'Application removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
