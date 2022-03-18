const jwt = require('jsonwebtoken');
const { request } = require('../../app');

module.export = (req, res, next) => {
  try{
      const token = req.headers.authorization.split("")[1];
      //console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
      return res.statu(401).json({
          message: 'Auth failed'
      })
  }
    
};