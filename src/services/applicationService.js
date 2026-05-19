
const Application = require("../models/Application.js");

// Apply for job
const applyForJobService = async (userId, jobId, body) => {

    const existingApplication = await Application.findOne({
        applicant: userId,
        job: jobId
    });

    if (existingApplication) {
        throw new Error("You already applied for this job");
    }

    const application = await Application.create({
        applicant: userId,
        job: jobId,
        coverLetter: body.coverLetter,
        resume: body.resume
    });

    return application;
};


// Get all applications
const getMyApplicationsService = async () => {

    const applications = await Application.find()
        .populate("applicant")
        .populate("job");

    return applications;
};


// Get single application
const getApplicationByIdService = async (id) => {

    const application = await Application.findById(id)
        .populate("applicant")
        .populate("job");

    return application;
};


// Update application status
const updateApplicationStatusService = async (id, status) => {

    const application = await Application.findById(id);

    if (!application) {
        throw new Error("Application not found");
    }

    application.status = status;

    await application.save();

    return application;
};


// Delete application
const deleteApplicationService = async (id) => {

    const application = await Application.findById(id);

    if (!application) {
        throw new Error("Application not found");
    }

    await application.deleteOne();

};


module.exports = {
    applyForJobService,
    getMyApplicationsService,
    getApplicationByIdService,
    updateApplicationStatusService,
    deleteApplicationService
};
