const axios = require("axios");

const analyzeComplaint = async (description) => {
  try {
    const prompt = `
Analyze this complaint and return ONLY valid JSON.

Complaint:
${description}

Format:
{
  "priority":"High/Medium/Low",
  "department":"Department Name",
  "summary":"Short Summary",
  "response":"Professional response"
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
      }
    );

    const text =
      response.data.choices[0].message.content;

    console.log("AI RAW RESPONSE:", text);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanText);

    return {
      priority: parsedData.priority || "Medium",

      department:
        parsedData.department ||
        "General Department",

      summary:
        parsedData.summary ||
        description.substring(0, 80),

      response:
        parsedData.response ||
        "Complaint submitted successfully.",
    };
  } catch (error) {
    console.log(
      "AI ERROR:",
      error.response?.data || error.message
    );

    return {
      priority: "Medium",

      department: "General Department",

      summary: description.substring(0, 80),

      response:
        "Complaint submitted successfully.",
    };
  }
};

module.exports = analyzeComplaint;