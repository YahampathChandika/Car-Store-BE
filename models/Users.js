module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    image: {
      type: DataTypes.JSON,
    },
    name: {
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
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define association here
  Users.associate = function (models) {
    Users.belongsTo(models.Roles, {
      as: "role",
      foreignKey: "roleId",
      onDelete: "CASCADE",
    });
  };

  return Users;
};
