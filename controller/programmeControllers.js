
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const { Programme, User } = require('../db/sequelizeSetup')

const findAllProgramme = (req, res) => {
    Programme.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}



const findProgrammeByPk = (req, res) => {
    Programme.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un programme a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun programme n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}



const createProgramme = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
            }
            console.log(req.file)
            const newProgramme = { ...req.body, UserId: user.id, imageUrl: `${req.protocol}://${req.get('host')}/uploadedFiles/${req.file.filename}` }

            Programme.create(newProgramme)
                .then((programme) => {
                    res.status(201).json({ message: 'Le programme a bien été créé', data: programme })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `Le programme n'a pas pu être créé`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const updateProgramme = (req, res) => {
    Programme.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update({ ...req.body, imageUrl: `${req.protocol}://${req.get('host')}/uploadedFiles/${req.file.filename}` })
                    .then(() => {
                        res.status(201).json({ message: 'Le programme a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun programme à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}



const deleteProgramme = (req, res) => {
    Programme.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `Le programme a bien été supprimé.`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `Aucun programme trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllProgramme, findProgrammeByPk, createProgramme, updateProgramme, deleteProgramme }