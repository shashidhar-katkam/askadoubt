// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/AppError');

// const signToken = (id) => {
//   return jwt.sign({ id }, 'process.env.JWT_SECRET', {
//     expiresIn: '365d',
//   });
// };

// const createSendToken = (user, statusCode, res, req) => {
//   const token = signToken(user.id);
//   let d = new Date();
//   d.setFullYear(new Date().getFullYear() + 1);

//   res.cookie('jwt', token, {
//     expires: d,
//     httpOnly: true,
//     sameSite: 'None',
//     secure: true,
//   });
//   res.set('SameSite', 'None');
//   user.password = undefined;

//   return res.status(statusCode).json({
//     status: 'success',
//     ll: d,
//     token,
//     data: {
//       user,
//     },
//   });
// };

// exports.signUp = catchAsync(async (req, res, next) => {
//   const newUser = await User.create(req.body);
//   req.user = newUser;
//   createSendToken(newUser, 201, res, req);
// });

// exports.login = catchAsync(async (req, res, next) => {
//   const { phoneNumber, password } = req.body;

//   if (!phoneNumber || !password) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'Please provide your phoneNumber and password'
//     });
//   }

//   const user = await User.findOne({ phoneNumber }).select('+password');

//   if (!user || !(await user.comparePassword(password, user.password))) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'Incorrect phoneNumber or password'
//     });
//   }
//   req.user = user;
//   createSendToken(user, 200, res, req);
// });

// exports.logout = catchAsync(async (req, res, next) => {
//   res.cookie('jwt', 'hallelujah', {
//     expires: new Date(Date.now() + 5),
//   });
//   return res.status(204).json({
//     status: 'success',
//     data: {},
//   });
// });
// exports.protect = catchAsync(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   //  else if (req.cookies.jwt) {
//   //   token = req.cookies.jwt;
//   // }

//   if (!token && req.variable === 'checkIfexist') {
//     return next();
//   }
//   if (!token) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'You are not logged in..Please Log in to continue'
//     });
//   }

//   const decodedToken = await promisify(jwt.verify)(
//     token,
//     'process.env.JWT_SECRET'
//   );
//   const currentUser = await User.findById(decodedToken.id);
//   if (!currentUser) {
//     if (req.variable === 'checkIfexist') {
//       return next();
//     }

//     return res.status(401).json({
//       status: 'failed',
//       message: 'User belonging to this token no longer exists , please Log in again to continue',
//     });

//   }
//   if (currentUser.checkIfPasswordChanged(decodedToken.iat)) {
//     if (req.variable === 'checkIfexist') {
//       return next();
//     }
//     return res.status(401).json({
//       status: 'failed',
//       message: 'You have currently changed password..Please log in again to continue',
//     });
//   }
//   req.user = currentUser;
//   if (req.body.type === 'autoLogin') {
//     return res.status(200).json({
//       status: 'success',
//       data: {
//         user: currentUser,
//       },
//     });
//   }
//   next();
// });

// exports.extractUser = catchAsync(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   //  else if (req.cookies.jwt) {
//   //   token = req.cookies.jwt;
//   // }

//   if (!token && req.variable === 'checkIfexist') {
//     return next();
//   }
//   if (!token) {
//     req.user = null;
//     return next();

//   }

//   const decodedToken = await promisify(jwt.verify)(
//     token,
//     'process.env.JWT_SECRET'
//   );
//   const currentUser = await User.findById(decodedToken.id);
//   if (!currentUser) {
//     if (req.variable === 'checkIfexist') {
//       return next();
//     }

//     return res.status(401).json({
//       status: 'failed',
//       message: 'User belonging to this token no longer exists , please Log in again to continue',
//     });

//   }
//   if (currentUser.checkIfPasswordChanged(decodedToken.iat)) {
//     if (req.variable === 'checkIfexist') {
//       return next();
//     }
//     return res.status(401).json({
//       status: 'failed',
//       message: 'You have currently changed password..Please log in again to continue',
//     });
//   }
//   req.user = currentUser;
//   if (req.body.type === 'autoLogin') {
//     return res.status(200).json({
//       status: 'success',
//       data: {
//         user: currentUser,
//       },
//     });
//   }
//   next();
// });

// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(401).json({
//         status: 'failed',
//         message: 'You are not permitted to perform this action',
//       });
//     }
//     next();
//   };
// };

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   const currentUser = await User.findById(req.user.id).select('+password');

//   if (!currentUser) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'You are not logged in . Please Log in to get access'
//     });
//   }

//   const { currentPassword, passwordNew, confirmPasswordNew } = req.body;

//   if (!currentPassword || !passwordNew || !confirmPasswordNew) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'Please provide your current password , your new password and confirmed new password'
//     });
//   }


//   if (!(await currentUser.comparePassword(currentPassword, currentUser.password))) {
//     return res.status(401).json({
//       status: 'failed',
//       message: 'Incorrect password'
//     });
//   }


//   currentUser.password = passwordNew;
//   currentUser.passwordConfirm = confirmPasswordNew;

//   await currentUser.save();

//   createSendToken(currentUser, 200, res, req);
// });
