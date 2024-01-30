module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('Heur',{
        heure:{
            type: DataTypes.INTEGER,
        }
    })
}