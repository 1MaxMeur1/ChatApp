const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req,res,next) => {
   try {
        const {username, email, password} = req.body
        const usernameCheck = await User.findOne({username})
        if(usernameCheck)
            return res.json({msg: "Username is already used.", status: false})
        const emailCheck = await User.findOne({email})
        if(emailCheck)
            return res.json({msg: "Email is already used.", status: false})
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email, username, password: hashedPassword
        })
        console.log(user)
        delete user.password
        return res.json({status: true, user})
   } catch(ex) {
       next(ex)
   }
}

module.exports.login = async (req,res,next) => {
    try {
         const {username, password} = req.body
         const user = await User.findOne({username})
         if(!user)
             return res.json({msg: "User is not found.", status: false})
        const isPasswordValid = await bcrypt.compare(password, user.password)
         if(!isPasswordValid)
             return res.json({msg: "Pasword is incorrect.", status: false})
        delete user.password
        return res.json({status: true, user})
    } catch(ex) {
        next(ex)
    }
 }

 module.exports.setAvatar = async (req,res,next) => {
    try {
        const id = req.params.id
        const avatarImage = req.body.image
        const userData = await User.findByIdAndUpdate(id, {
            isAvatarImage: true,
            avatarImage
        })
        return res.json({isSet: userData.isAvatarImage, image: userData.avatarImage})
    } catch(ex) {
        next(ex)
    }
 }