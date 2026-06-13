  import express from 'express';
  import { register, login ,logout } from '../controllers/authcontroller.js';
  import { userAuth } from '../middleware/userAuth.js';
  import {
    sendverifyotp, 
    verifyEmail,
    isAuthenticated,
    resendOtp,
    resetPassword
  } from '../controllers/authcontroller.js';
  
  

  const authRouter = express.Router();
  
  authRouter.post('/register', register);
  authRouter.post('/login', login);
  authRouter.post('/logout', logout);

  authRouter.post('/sendverifyotp',userAuth, sendverifyotp);
  authRouter.post('/verifyemailotp', userAuth, verifyEmail);


  authRouter.post('/isauthenticated', userAuth,isAuthenticated);


  authRouter.post('/send-reset-otp',resendOtp);
  authRouter.post('/resetpassword', resetPassword);


  export default authRouter;
