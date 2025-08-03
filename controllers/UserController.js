const User= require('./models/User');
const bcrypt = require('bcryptjs');// for password encryption
// Get user profile
exports.getUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(requestAnimationFrame.user.userId).select('-password');
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.json(user);
        }
    catch(err){
        res.status(500).json({message:'Server error',error:err.message});
    }
    };
// update user profile
exports.updateUserProfile=async(req,res)=>{
    try{
        const {name,email,password,phone,department,year}=req.body;
        const user=await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.name=name||user.name;
        user.email=email||user.email;
        user.password=hashedPassword||user.password;
        user.phone=phone||user.phone;
        user.department=user.department||department;
        user.year=year||user.year;
        const updatedUser=await user.save();
         res.json({ message: 'Profile updated', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};