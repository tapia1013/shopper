import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // assing token from headers
      token = req.headers.authorization.split(' ')[1]
      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded);

      // get token with decoded.id
      req.user = await User.findById(decoded.id).select('-password')

      next();
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(401)
      throw new Error('Not Authorized, Token failed')
    }
  }

  // if no token
  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }

})




export { protect }