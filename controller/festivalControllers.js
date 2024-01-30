// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const { Festival, User } = require('../db/sequelizeSetup')

const findAllFestivals = (req, res) => {
    Festival.findAll()
        .then((results) => {
            res.json(results)
        }) 
        .catch(error => {
            res.status(500).json(error.message)
        })
}


const findFestivalByPk = (req, res) => {
    Festival.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un Festival a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun Festival n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}


const createFestival = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
            }
            console.log(req.file)
            const newFestival = { ...req.body, UserId: user.id, imageUrl: `${req.protocol}://${req.get('host')}/uploadedFiles/${req.file.filename}` }

            Festival.create(newFestival)
                .then((festival) => {
                    res.status(201).json({ message: 'Le festival a bien été créé', data: festival })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `Le festival n'a pas pu être créé`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}



const updateFestival = (req, res) => {
    Festival.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update({ ...req.body, imageUrl: `${req.protocol}://${req.get('host')}/uploadedFiles/${req.file.filename}` })
                    .then(() => {
                        res.status(201).json({ message: 'Le festival a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun festival à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteFestival = (req, res) => {
    Festival.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `Le festival a bien été supprimé.`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `Aucun festival trouvé.` })
            }
        })
        .catch((error) => {

            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllFestivals, findFestivalByPk, createFestival, updateFestival, deleteFestival }