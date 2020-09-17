const Sequelize = require('sequelize');

const sequelize = new Sequelize('NOM_DE_LA_BD', 'USERNAME', 'PASSWORD', {
    host: 'localhost',
    dialect: 'mysql'
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to database')
    } catch (err) {
        throw new Error('Something went wrong')
    }
}

module.exports = { sequelize, dbConnection }