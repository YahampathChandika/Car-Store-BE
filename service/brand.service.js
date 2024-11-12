const { Brands } = require("../models");

//add Inquiry
async function addBrand(brand) {
  try {
    await Brands.create(brand);

    return {
      error: false,
      status: 201,
      payload: "Brand successfully created!",
    };
  } catch (error) {
    console.error("Error creating Brand service:", error);
    throw error;
  }
}

//Get All Cars
async function getAllBrands() {
  try {
    const brands = await Brands.findAll();

    if (!brands || brands.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No brands Available",
      };
    }

    return {
      error: false,
      status: 200,
      payload: brands,
    };
  } catch (error) {
    console.error("Error getting brands service:", error);
    throw error;
  }
}

//Get brand by id
async function getBrandById(id) {
  try {
    const brads = await Brands.findOne({
      where: {
        id: id,
      },
    });

    if (!brads || brads.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No brads Data Found",
      };
    }

    return {
      error: false,
      status: 200,
      payload: brads,
    };
  } catch (error) {
    console.error("Error getting brands by ID service:", error);
    throw error;
  }
}

//delete Brand
async function deleteBrand(id) {
  try {
    const brand = await Brands.findByPk(id);

    if (!brand) {
      return {
        error: true,
        status: 404,
        payload: "Brand not found",
      };
    }

    await Brands.destroy({
      where: {
        id: id,
      },
    });

    return {
      error: false,
      status: 200,
      payload: "Brand successfully deleted!",
    };
  } catch (error) {
    console.error("Error deleting Brand service: ", error);
    throw error;
  }
}

// Update Brand including image
async function updateBrand(id, updatedData, image) {
  try {
    const brand = await Brands.findByPk(id);

    if (!brand) {
      return {
        error: true,
        status: 404,
        payload: "Brand not found!",
      };
    }

    // If an image is provided, update the image path
    if (image) {
      updatedData.brandImage = image; // Add/overwrite the image field in the updated data
    }

    await Brands.update(updatedData, {
      where: { id },
    });

    return {
      error: false,
      status: 200,
      payload: "Brand updated successfully!",
      updatedBrand: updatedData,
    };
  } catch (error) {
    console.error("Error updating Brand service: ", error);
    throw error;
  }
}

module.exports = {
  addBrand,
  getAllBrands,
  getBrandById,
  deleteBrand,
  updateBrand,
};