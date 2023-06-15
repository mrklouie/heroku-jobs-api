const express = require("express");
const router = express.Router();

const {
  deleteJob,
  updateJob,
  createJob,
  getJob,
  getAllJobs,
} = require("../controller/Jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
