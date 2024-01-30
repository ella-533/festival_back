module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('Legals', {
        text:{
            type: DataTypes.TEXT,
            allowNulle: false,
        }
    })
}