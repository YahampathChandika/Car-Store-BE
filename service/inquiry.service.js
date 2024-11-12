const { Inquiry } = require("../models");

//add Inquiry
async function addInquiry(inquiry) {
  try {
    await Inquiry.create(inquiry);

    return {
      error: false,
      status: 201,
      payload: "inquiry successfully created!",
    };
  } catch (error) {
    console.error("Error creating inquiry service:", error);
    throw error;
  }
}

async function getAllInquiry() {
  try {
    const inquiries = await Inquiry.findAll({
      order: [["createdAt", "DESC"]],
      raw: true,
      nest: true,
    });
    
    if (!inquiries || inquiries.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No inquiries available",
      };
    }

    return {
      error: false,
      status: 200,
      payload: inquiries,
    };
  } catch (error) {
    console.error("Error getting inquiries service:", error);
    return {
      error: true,
      status: 500,
      payload: error.message || "Internal Server Error",
    };
  }
}

//mark as Responce
async function markAsResponse(id) {
  try {
    const inquiry = await Inquiry.findByPk(id);

    if (!inquiry) {
      return {
        error: true,
        status: 404,
        payload: "Inquiry not found",
      };
    }

    await inquiry.update({ responsed: true });

    return {
      error: false,
      status: 200,
      payload: "Inquiry marked as responded",
    };
  } catch (error) {
    console.error("Error marking inquiry as responded:", error);
    return {
      error: true,
      status: 500,
      payload: error.message || "Internal Server Error",
    };
  }
}

//Last 20 inquiry
async function getRecentInquiry() {
  try {
    const inquiries = await Inquiry.findAll({
      limit: 20,
      order: [["createdAt", "DESC"]],
    });

    if (!inquiries || inquiries.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No inquiries available",
      };
    }

    return {
      error: false,
      status: 200,
      payload: inquiries,
    };
  } catch (error) {
    console.error("Error getting inquiries service:", error);
    return {
      error: true,
      status: 500,
      payload: error.message || "Internal Server Error",
    };
  }
}

//get inquiryById
async function getInquiryByID(id) {
  try {
    const inquiry = await Inquiry.findOne({
      where: {
        id: id,
      },
    });

    if (!inquiry || inquiry.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No inquiry Data Found",
      };
    }

    return {
      error: false,
      status: 200,
      payload: inquiry,
    };
  } catch (error) {
    console.error("Error getting inquiry by ID service:", error);
    throw error;
  }
}

module.exports = {
  addInquiry,
  getAllInquiry,
  markAsResponse,
  getRecentInquiry,
  getInquiryByID,
};