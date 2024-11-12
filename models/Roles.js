module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    "Roles",
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Roles.associate = function (models) {
    Roles.hasMany(models.Users, {
      as: "users",
      foreignKey: "roleId",
    });
  };

  return Roles;
};
