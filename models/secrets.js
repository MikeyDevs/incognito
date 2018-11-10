module.exports = function(sequelize, DataTypes) {
var Secret = sequelize.define('Secret', {
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
    }
    },
    comments: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL(17, 15),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(17, 15),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    }
  });
  return Secret;
}
