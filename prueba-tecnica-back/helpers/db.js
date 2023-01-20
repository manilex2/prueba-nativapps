const { Sequelize, Op } = require('sequelize');
const PatientModel = require('../models/patients');
const pg = require("pg");
const { database } = require("./keys");

const sequelize = new Sequelize(database.db, database.user, database.pwd, {
    host: database.host,
    dialect: 'postgres',
    port: database.port,
    dialectModule: pg
});

const Patient = PatientModel(sequelize, Sequelize);

const Models = { 
    sequelize
    , Patient
    , Op
};

const connection = {};

module.exports = async () => {
    if (connection.isConnected) {
        console.log('=> Using existing connection.');
        return Models;
    };

    await sequelize.sync();

    await sequelize.authenticate();
    connection.isConnected = true;
    console.log('=> Created a new connection.');
    return Models;
}