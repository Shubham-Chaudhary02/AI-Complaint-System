const Complaint = require("../models/Complaint");

const analyzeComplaint = require("../utils/aiHelper");

const addComplaint = async (req, res) => {
  try {
    const {
      name,
      email,
      title,
      description,
      category,
      location,
    } = req.body;

    const aiData = await analyzeComplaint(
      description
    );

    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
      priority: aiData.priority,
      department: aiData.department,
      summary: aiData.summary,
      aiResponse: aiData.response,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getComplaints = async (req, res) => {
  const complaints = await Complaint.find();

  res.json(complaints);
};

const updateComplaintStatus = async (
  req,
  res
) => {
  const complaint = await Complaint.findById(
    req.params.id
  );

  if (!complaint) {
    return res.status(404).json({
      message: "Complaint not found",
    });
  }

  complaint.status =
    req.body.status || complaint.status;

  const updatedComplaint =
    await complaint.save();

  res.json(updatedComplaint);
};

const deleteComplaint = async (req, res) => {
  const complaint = await Complaint.findById(
    req.params.id
  );

  if (!complaint) {
    return res.status(404).json({
      message: "Complaint not found",
    });
  }

  await complaint.deleteOne();

  res.json({
    message: "Complaint deleted",
  });
};

const searchComplaintByLocation = async (
  req,
  res
) => {
  const complaints = await Complaint.find({
    location: {
      $regex: req.query.location,
      $options: "i",
    },
  });

  res.json(complaints);
};

module.exports = {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
  searchComplaintByLocation,
};