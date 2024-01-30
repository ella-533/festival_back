module.exports=(sequlize, DataTypes)=>{
    return sequlize.define('Programme', {
        artist:{
            type: DataTypes.STRING,
        },
        photo:{
            type: DataTypes.JSON,
        },
        heure:{
            type: DataTypes.INTEGER,
        },
        description:{
            type: DataTypes.TEXT,
        },
        reseux:{
            type: DataTypes.JSON,
        },
        
    })
}