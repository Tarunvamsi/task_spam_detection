'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSpam: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Contact.associate = function(models) {
    Contact.belongsTo(models.User, { as: 'owner', foreignKey: 'userId' });
  };

  return Contact;
};
