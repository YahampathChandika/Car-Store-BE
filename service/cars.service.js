const Sequelize = require("sequelize");
const { Cars, Brands } = require("../models");

//addCar Service
async function createCar(car, images) {
  try {
    car.CarPhotos = images;

    const data = await Cars.create(car);
    return {
      error: false,
      status: 201,
      payload: "Car successfully created!",
      data: data,
    };
  } catch (error) {
    console.error("Error creating Car service:", error);
    throw error;
  }
}

//get All Cars
async function getAllCars() {
  try {
    const cars = await Cars.findAll({
      attributes: [
        "id",
        "carName",
        "CarPhotos",
        "price",
        "manufacturingYear",
        "fuelType",
        "engine",
        "exteriorColour",
      ],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id", "brandImage"],
        },
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No Cars Available",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price: car.price,
      manufacturingYear: car.manufacturingYear,
      fuelType: car.fuelType,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      engine: car.engine,
      exteriorColour: car.exteriorColour,
      brandId: car.brand.id,
      brandImage: car.brand.brandImage,
    }));

    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting Cars service:", error);
    throw error;
  }
}

async function getCarById(id) {
  try {
    const car = await Cars.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
    });

    if (!car) {
      return {
        error: true,
        status: 204,
        payload: "No car data available!",
      };
    }

    const formattedData = {
      id: car.id,
      carName: car.carName,
      manufacturingYear: car.manufacturingYear,
      exteriorColour: car.exteriorColour,
      interiorColour: car.interiorColour,
      driverPosition: car.driverPosition,
      engine: car.engine,
      bodyType: car.bodyType,
      transmission: car.transmission,
      fuelType: car.fuelType,
      price: car.price,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
    };
    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting Car by ID service:", error);
    throw error;
  }
}

async function sortCarByBrands(brandId) {
  try {
    const cars = await Cars.findAll({
      where: {
        brandId: brandId,
      },
      attributes: ["id", "carName", "CarPhotos", "price", "manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No car data available!",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price: car.price,
      manufacturingYear: car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
    }));

    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting cars by brand ID:", error);
    throw error;
  }
}

// getPagination Service
async function getPagination(page = 1, pageSize = 9) {
  try {
    const offset = (page - 1) * pageSize;
    const { rows: cars, count: totalCars } = await Cars.findAndCountAll({
      attributes: ["id", "carName", "CarPhotos", "price", "manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id" , "brandImage"],
        },
      ],
      limit: pageSize,
      offset: offset,
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No Cars Available",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price: car.price,
      manufacturingYear: car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
      brandImage:car.brand.brandImage
    }));

    return {
      error: false,
      status: 200,
      payload: {
        cars: formattedData,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalCars: totalCars,
          totalPages: Math.ceil(totalCars / pageSize),
        },
      },
    };
  } catch (error) {
    console.error("Error getting Cars with pagination:", error);
    throw error;
  }
}

async function sortCarByBrandsPagination(brandId, page = 1, pageSize = 9) {
  try {
    const offset = (page - 1) * pageSize;
    const { rows: cars, count: totalCars } = await Cars.findAndCountAll({
      where: {
        brandId: brandId,
      },
      attributes: ["id", "carName", "CarPhotos", "price", "manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id","brandImage"],
        },
      ],
      limit: pageSize,
      offset: offset,
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No cars found for the selected brand!",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price: car.price,
      manufacturingYear: car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
      brandImage:car.brand.brandImage,
    }));

    return {
      error: false,
      status: 200,
      payload: {
        cars: formattedData,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalCars: totalCars,
          totalPages: Math.ceil(totalCars / pageSize),
        },
      },
    };
  } catch (error) {
    console.error("Error sorting cars by brand with pagination:", error);
    throw error;
  }
}

//Delete a Car
async function deleteCar(id) {
  try {
    const car = await Cars.findByPk(id);

    if (!car) {
      return {
        error: true,
        status: 404,
        payload: "Car not found",
      };
    } else {
      await Cars.destroy({
        where: {
          id: id,
        },
      });

      return {
        error: false,
        status: 200,
        payload: "Car successfully deleted!",
      };
    }
  } catch (error) {
    console.error("Error deleteing Car service: ", error);
    throw error;
  }
}

// Update Car
async function updateCar(id, updatedData, images) {
  try {
    const car = await Cars.findByPk(id);

    if (!car) {
      return {
        error: true,
        status: 404,
        payload: "Car not found!",
      };
    } else {
      // If images are provided, update CarPhotos
      if (images && images.length > 0) {
        updatedData.CarPhotos = images;
      }

      // Update car with the new data
      await car.update(updatedData);

      return {
        error: false,
        status: 200,
        payload: "Car updated successfully!",
        updatedCar: car,
      };
    }
  } catch (error) {
    console.error("Error Updating Car Service : ", error);
    throw error;
  }
}

// Get the last six cars
async function getLastSixCars() {
  try {
    const cars = await Cars.findAll({
      attributes: ["id", "carName", "CarPhotos", "price", "manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id","brandImage"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 6,
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No Cars Available",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price: car.price,
      manufacturingYear: car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
      brandImage:car.brand.brandImage
    }));

    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting the last six cars:", error);
    throw error;
  }
}

//cars count with barnds

async function getBrandsWithCarCount() {
  try {
    const brands = await Brands.findAll({
      attributes: [
        "id",
        "brandName",
        [Sequelize.fn("COUNT", Sequelize.col("cars.id")), "carCount"], // Count cars
      ],
      include: [
        {
          model: Cars,
          as: "cars", // Make sure this matches the alias defined in the association
          attributes: [], // We only want the count, not the car details
        },
      ],
      group: ["Brands.id"], // Group by Brand ID
      raw: true,
      nest: true,
    });

    if (!brands || brands.length === 0) {
      return {
        error: true,
        status: 204,
        payload: "No Brands Available",
      };
    }

    return {
      error: false,
      status: 200,
      payload: brands,
    };
  } catch (error) {
    console.error("Error getting brands with car count:", error);
    throw error;
  }
}

module.exports = {
  createCar,
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
