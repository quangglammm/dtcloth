const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const { verifyAccessToken } = require('../helpers/jwt_service');

router.post('/register', userController.Register);
router.post('/refresh-token', userController.RefreshToken);
router.post('/login', userController.Login);
router.post('/logout', userController.Logout);
router.get('/test-get-list-user', verifyAccessToken, userController.TestGetListUser);

module.exports = router;
