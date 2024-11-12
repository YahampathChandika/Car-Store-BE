const carsService = require("../service/cars.service");

// addCar
async function addCar(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const car = req.body;
    const files = req.files;
    const images = files.map((file) => file.path);

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can create Cars.",
      });
    }

    const result = await carsService.createCar(car, images);

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
    console.log("Error creating Car controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

//Get All Cars
async function getAllCars(req, res) {
  try {
    const result = await carsService.getAllCars();

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
    console.log("Error creating Car controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

//Get Car By Id
async function getCarById(req, res) {
  try {
    const { id } = req.params;
    const result = await carsService.getCarById(id);

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
    console.log("Error creating Car controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

//sort cars by brands
async function sortCarByBrands(req, res) {
  try {
    const { id } = req.params;
    const result = await carsService.sortCarByBrands(id);

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
    console.log("Error creating Car controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

// Get All Cars with Pagination
async function getPagination(req, res) {
  try {
    const { page = 1, pageSize = 9 } = req.query;
    const result = await carsService.getPagination(
      Number(page),
      Number(pageSize)
    );

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
    console.log("Error getting Cars with pagination in controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}
// Sort cars by brand with pagination
async function sortCarByBrandsPagination(req, res) {
  try {
    const { id } = req.params; // Brand ID
    const { page = 1, pageSize = 9 } = req.query;

    const result = await carsService.sortCarByBrandsPagination(
      id,
      Number(page),
      Number(pageSize)
    );

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
    console.error(
      "Error sorting cars by brand with pagination in controller:",
      error
    );
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

async function deleteCar(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const { id } = req.params;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can delete car.",
      });
    }

    const result = await carsService.deleteCar(id);

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
    console.log("Error Deleting Car Controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

async function updateCar(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const { id } = req.params;
    const updatedData = req.body;
    const files = req.files;

    if (![1].includes(userRole_id)) {
      return res.status(403).json({
        error: true,
        payload: "Unauthorized. Only Admins can update car details.",
      });
    }

    // Check if files were uploaded and extract their paths
    if (files && files.length > 0) {
      const images = files.map((file) => file.path);
      updatedData.CarPhotos = images;
    }

    const result = await carsService.updateCar(id, updatedData);

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
    console.log("Error updating car controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

// Get the last six cars
async function getLastSixCars(req, res) {
  try {
    const result = await carsService.getLastSixCars();

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
    console.error("Error getting the last six cars in controller:", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

// Get Brands with Car Count
async function getBrandsWithCarCount(req, res) {
  try {
    const result = await carsService.getBrandsWithCarCount();

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
    console.error("Error getting brands with car count:", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

module.exports = {
  addCar,
  getAllCars,
  getCarById,
  sortCarByBrands,
  getPagination,
  sortCarByBrandsPagination,
  deleteCar,
  updateCar,
  getLastSixCars,
  getBrandsWithCarCount,
};
