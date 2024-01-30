// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Festival', {
        // Model attributes are defined here
        information:{
            type: DataTypes.TEXT,
        },
        image:{
            type: DataTypes.JSON,
        },
        info_pratique:{
            type: DataTypes.JSON,
        },
        faq:{
            type:DataTypes.JSON,
        }
        
});
}