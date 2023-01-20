const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define("Paciente", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id"
        },
        idNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "idNumber",
            unique: true,
            validate: {
                isNumeric: true
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "firstname"
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "lastname"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "email",
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "phone",
            validate: {
                isNumeric: true
            }
        },
    }, {
        tableName: "paciente",
        schema: "public",
        timestamps: false
    });
}