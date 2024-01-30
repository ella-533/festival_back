// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Date', {
        // Model attributes are defined here
        date:{
            type: DataTypes.JSON,
            allowNull : false,
            unique:{
                msg : "Le date est déja pris ."
            }
        }
})}