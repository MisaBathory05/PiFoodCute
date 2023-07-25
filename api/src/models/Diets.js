const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('diets',{   // se define el modelo a usar      
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        timestamps: false  // se anula el reloj de cambios en la API
    });
};