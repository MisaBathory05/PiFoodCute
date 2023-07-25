const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipe',{   // se define el modelo a usar con las propiedades de la receta    
        id: {
            type: DataTypes.UUID, //UUID identificador unico universal descentralizado, es decir ID unico para la BDD
            defaultValue: DataTypes.UUIDV4, //V4 es la versión de Node
            allowNull: false,
            primaryKey: true,
        },            
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        resume:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        healthyscore:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        steps:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        img:{
            type: DataTypes.STRING,
            allowNull: false,}
        },{
            timestamps: false
        });
        };