const express = require('express')
const router = express.Router()
const { findAllFestivals, findFestivalByPk, createFestival, updateFestival, deleteFestival } = require('../controllers/coworkingControllers')
const { protect} = require('../controllers/authControllers')
const multer = require('../middleware/multer-config');


router
    .route('/')
    .get(findAllFestivals)
    .post(protect,  createFestival)


router
    .route('/:id')
    .get(findFestivalByPk)
    .put(protect,  updateFestival)
    .delete(protect, deleteFestival)

module.exports = router