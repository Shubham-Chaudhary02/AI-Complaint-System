const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
  searchComplaintByLocation,
} = require("../controllers/complaintController");

router.post("/", protect, addComplaint);

router.get("/", protect, getComplaints);

router.get(
  "/search/location",
  protect,
  searchComplaintByLocation
);

router.put("/:id", protect, updateComplaintStatus);

router.delete("/:id", protect, deleteComplaint);

module.exports = router;