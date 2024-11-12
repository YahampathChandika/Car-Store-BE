const inquiryService = require("../service/inquiry.service");

//add inquiry
async function addInquiry(req, res) {
  try {
    const inquiry = req.body;

    const result = await inquiryService.addInquiry(inquiry);

    if (result.error) {
      return res.status(result.status).json({
        error: true,
        payload: result.payload,
      });
    } else {
      return res.status(result.status).json({
        error: false,
        payload: result.payload,
      });
    }
  } catch (error) {
    console.log("Error creating inquiry controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

// Get All Inquiries
async function getAllInquiry(req, res) {
  try {
    const userRole_id = req.user.roleId;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can Views Inquiries.",
      });
    }
    const result = await inquiryService.getAllInquiry();

    return res.status(result.status).json({
      error: result.error,
      payload: result.payload,
    });
  } catch (error) {
    console.log("Error getting all inquiries controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

// Mark as Response
async function markAsResponse(req, res) {
  try {
    const { id } = req.params;

    const result = await inquiryService.markAsResponse(id);

    return res.status(result.status).json({
      error: result.error,
      payload: result.payload,
    });
  } catch (error) {
    console.log("Error marking inquiry as responded controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

// Get All Inquiries (last 20)
async function getRecentInquiry(req, res) {
  try {
    const userRole_id = req.user.roleId;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can view inquiries.",
      });
    }

    const result = await inquiryService.getRecentInquiry();

    return res.status(result.status).json({
      error: result.error,
      payload: result.payload,
    });
  } catch (error) {
    console.log("Error getting all inquiries controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

//get Inquiry by Id
async function getInquirtById(req, res) {
  try {
    const { id } = req.params;
    const result = await inquiryService.getInquiryByID(id);

    if (result.error) {
      return res.status(result.status).json({
        error: true,
        payload: result.payload,
      });
    } else {
      return res.status(result.status).json({
        error: false,
        payload: result.payload,
      });
    }
  } catch (error) {
    console.log("Error creating Inquiry controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}


module.exports = {
  addInquiry,
  getAllInquiry,
  markAsResponse,
  getRecentInquiry,
  getInquirtById
};