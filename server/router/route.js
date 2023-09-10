import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import Auth, { localVariables, hashPassword } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/authenticateUser').post(controller.verifyUserRegistration, (req, res) => res.end()); // authenticate user registration
router.route('/authenticateEmail').post(controller.verifyEmailRegistration, (req, res) => res.end()); // authenticate email registration
router.route('/login').post(controller.verifyUser,controller.login); // login in app

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUserResetPassword,hashPassword, controller.resetPassword); // use to reset password



export default router;