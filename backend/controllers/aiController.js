const analyzeComplaint = require("../utils/aiHelper");

const analyze = async (req, res) => {
  try {
    const { text } = req.body;

    const result = await analyzeComplaint(text);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyze,
};