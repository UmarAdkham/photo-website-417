const express = require('express');
const { getPhotos, addPhoto, deletePhoto, myPhotos } = require('../controllers/photoController');
const { authentication } = require('../middleware/authentication');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const photoRouter = express.Router();

photoRouter.get('/', authentication, getPhotos);
photoRouter.get('/:userId', authentication, myPhotos);
photoRouter.post('/', authentication, uploadMiddleware, addPhoto);
photoRouter.delete('/:id', authentication, deletePhoto);

module.exports = photoRouter;