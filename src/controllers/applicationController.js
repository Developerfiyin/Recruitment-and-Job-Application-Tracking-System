
const {
    applyForJobService,
    getMyApplicationsService,
    getApplicationByIdService,
    updateApplicationStatusService,
    deleteApplicationService
} = require("../services/applicationService.js");


// Apply for job
const applyForJob = async (req, res) => {

    try {

        const application = await applyForJobService(
            req.user.id,
            req.body.jobId,
            req.body
        );

        res.status(201).json({
            success: true,
            application
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get all applications
const getMyApplications = async (req, res) => {

    try {

        const applications = await getMyApplicationsService();

        res.status(200).json(applications);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get single application
const getApplicationById = async (req, res) => {

    try {

        const application = await getApplicationByIdService(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json(application);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Update application status
const updateApplicationStatus = async (req, res) => {

    try {

        const application = await updateApplicationStatusService(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            message: "Status updated successfully",
            application
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Delete application
const deleteApplication = async (req, res) => {

    try {

        await deleteApplicationService(req.params.id);

        res.status(200).json({
            message: "Application deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    applyForJob,
    getMyApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
};
