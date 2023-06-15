const JobsModel = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const {
  NotFound,
  Unauthenticated,
  BadRequest,
  CustomAPIError,
} = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await JobsModel.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );

  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await JobsModel.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobsModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequest(`Company or Position fields cannot be empty`);
  }

  const job = await JobsModel.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await JobsModel.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { deleteJob, updateJob, createJob, getJob, getAllJobs };
