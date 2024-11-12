const { BOOLEAN } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Inquiry = sequelize.define("Inquiry", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    massage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  

  return Inquiry;
};
