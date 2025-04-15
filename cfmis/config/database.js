const { Sequelize } = require('sequelize'); //ORM

const sequelize = new Sequelize('CaseManagementDB', 'sa', '1234', {
    dialect: 'mssql',
    host: 'NETWORK-ENGINEER',
    port: 1433,
    logging: false,
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true,
        },
    },
});

module.exports = sequelize;
