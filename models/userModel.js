module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('User',{
        email:{
            type: DataTypes.EMAIL,

        },
        password:{
            
        }
    })
}