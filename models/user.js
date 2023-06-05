const { DataTypes } = require('sequelize');
const db = require('../connections/db');

const User = db.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otpGeneratedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    sessionID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = User;
