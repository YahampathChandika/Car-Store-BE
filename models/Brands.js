module.exports = (sequelize, DataTypes) => {
  const Brands = sequelize.define(
    "Brands",
    {
      brandName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brandImage: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Brands.associate = function (models) {
    Brands.hasMany(models.Cars, {
      as: "cars",
      foreignKey: "brandId",
    });
  };

  return Brands;
};
