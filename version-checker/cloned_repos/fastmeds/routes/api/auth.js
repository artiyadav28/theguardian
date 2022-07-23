const express = require("express")
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt =  require('jsonwebtoken')
const config = require('config')
const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const validate = require('../../middleware/validate')
const authValidation = require('../../validations/auth.validation')
const catchAsync = require('../../utils/catchAsync')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const ApiError = require('../../utils/ApiError');
//@route GET api/auth
router.get('/',auth, catchAsync(async (req,res)=> {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
          }
    
        res.json(user)


}))

//@route Post api/auth
//authenticate user and get token
router.post('/', validate(authValidation.login),catchAsync( async (req,res)=> {


    const { email, password} = req.body
     // see if user exists

     let user = await User.findOne({email})

     if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }


    
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new ApiError(400, 'Invalid Credentials');
    }

    
   
    //return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000},
        (err,token) =>{
            if(err)
                throw err
            res.json({token})
        } )

}))

module.exports = router