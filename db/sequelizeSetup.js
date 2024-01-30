const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('festival_prod', 'root', '', {
    host : 'localhost',
    dialect : 'mariadb',
    logging : false
})


sequelize.authenticate()

.then(()=>{console.log(`la connextion à la base de donnée a bien été etablié`)})
.catch((error)=>{console.log(`impossible de se connecter à la base de donnée`, error)})


const ProgrammeModel = require('../models/programmeModel')
const UserModel = require('../models/userModel')
const DateModel = require('../models/dateModel')
const HeureModel = require('../models/heureModel')
const ReservationModel = require('../models/reservationModel')
const RoleModel = require('../models/roleModel')

const FestivalModel = require('../models/festivalModel')
const LegalModel = require('../models/legalModel')

const Programme = programmeModel(sequelize, DataTypes)
const User = userModel(sequelize, DataTypes)
const Date = dateModel(sequelize, DataTypes)
const Heure = heureModel(sequelize, DataTypes)
const Reservation = reservationModel(sequelize, DataTypes)
const Role = roleModel(sequelize, DataTypes)
const Festival = festivalModel(sequelize, DataTypes)
const Legal = legalModel(sequelize, DataTypes)


Role.hasMany(User)
User.belongsTo(Role)

Date.hasMany(Programme)
Programme.belongsTo(Date)

Date.hasMany(Reservation)
Reservation.belongsTo(Date)

Heure.hasMany(Programme)
Programme.belongsTo(Heure)



const { setCategories, setUsers, setRoles} = require('./dataSample')

sequelize.sync({force : false})
.then(()=>{
    // setRoles(Role)
    // setUsers(User)
    // setCategories(Category)
})
.catch(()=>{console.log(`il y a une erruer`)})

module.exports =  { sequelize, Programme, User, Date, Heure, Reservation, Role, Festival, Legal }