module.exports = (sequelize, DataTypes) => {
  const Cars = sequelize.define("Cars", {
    carName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturingYear: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    exteriorColour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    interiorColour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driverPosition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bodyType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fuelType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    CarPhotos: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  Cars.associate = function (models) {
    Cars.belongsTo(models.Brands, {
      as: "brand",
      foreignKey: "brandId",
      onDelete: "CASCADE",
    });
  };

  return Cars;
};
