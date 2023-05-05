const express = require('express');
const { SignUp, SignIn } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/signup', SignUp);
userRouter.post('/signin', SignIn);

module.exports = userRouter;
