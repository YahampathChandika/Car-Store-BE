const brandService = require("../service/brand.service");

async function addBrand(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const brand = req.body;
    const brandImage = req.file?.path;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can create Cars.",
      });
    }

    if (!brandImage) {
      return res.status(400).json({
        error: true,
        payload: "Brand image is required.",
      });
    }

    // Include brandImage in the brand object
    brand.brandImage = brandImage;

    const result = await brandService.addBrand(brand);

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
    console.log("Error creating brand controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

//get All brands
async function getAllBrands(req, res) {
  try {
    const result = await brandService.getAllBrands();

    return res.status(result.status).json({
      error: result.error,
      payload: result.payload,
    });
  } catch (error) {
    console.log("Error getting all brands: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

// get brand by id
async function getBrandById(req, res) {
  try {
    const { id } = req.params;
    const result = await brandService.getBrandById(id);

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
    console.log("Error creating brand controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

//delete Brand
async function deleteBrand(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const { id } = req.params;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can delete a brand.",
      });
    }

    const result = await brandService.deleteBrand(id);

    return res.status(result.status).json({
      error: result.error,
      payload: result.payload,
    });
  } catch (error) {
    console.log("Error Deleting Brand Controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

// Update Brand
async function updateBrand(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const image = req.file ? req.file.path : null; // Handle image if it's uploaded

    // Call the service to update brand including the image
    const result = await brandService.updateBrand(id, updatedData, image);

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
    console.error("Error updating brand controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message,
    });
  }
}

module.exports = {
  addBrand,
  getAllBrands,
  getBrandById,
  deleteBrand,
  updateBrand,
};