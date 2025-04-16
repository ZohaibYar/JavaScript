const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Case = sequelize.define('Case', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.ENUM('civil', 'criminal'), allowNull: false },
    subcategory: { type: DataTypes.STRING, allowNull: false },
    stage: { type: DataTypes.ENUM('filing', 'attendance', 'evidence', 'arguments', 'final_decision'), defaultValue: 'filing' },
    filingDate: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    proceedingDate: { type: DataTypes.DATE, allowNull: true }
});

module.exports = Case;