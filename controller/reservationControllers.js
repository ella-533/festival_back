// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const { Reservation, User, sequelize } = require('../db/sequelizeSetup')

const findAllReservation = (req, res) => {
    Reservation.findAll({ include: User})
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}



const findReservationByPk = (req, res) => {
    Reservation.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un reservation a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun reservation n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createReservation = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
            }
            const newReservation = { ...req.body, UserId: user.id }

            Reservation.create(newReservation)
                .then((reservation) => {
                    res.status(201).json({ message: 'La reservation a bien été effectuée', data: reservation })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `La reservation n'a pas pu être effectuée`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}



const updateReservation = (req, res) => {
    Reservation.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'La reservation  a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun reservation à mettre à jour n'a été trouvée.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}



const deleteReservation = (req, res) => {
    Reservation.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `la Reservation a bien été supprimé.`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `Aucun Reservation trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllReservation, findReservationByPk, createReservation, updateReservation, deleteReservation}