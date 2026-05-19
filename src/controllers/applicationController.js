
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

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    if (!req.body.coverLetter) {
      return res.status(400).json({
        success: false,
        message: "Cover letter is required",
      });
    }

    const applicationData = {
      ...req.body,
      coverLetter: req.body.coverLetter,
      resume: req.file.path,
    };

    const application = await applyForJobService(
      req.user.id,
      req.body.jobId,
      applicationData
    );

    res.status(201).json({
      success: true,
      application,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get all applications
const getMyApplications = async (req, res) => {
  try {

    const applications = await getMyApplicationsService(req.user.id);

    res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get single application
const getApplicationById = async (req, res) => {

    try {

        const application = await getApplicationByIdService(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json(application);

    } catch (error) {

        res.status(500).json({
        success: false,
        message: error.message,
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
            success: false,
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
            success: false,
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
