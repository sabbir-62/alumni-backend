
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();



//user registration
exports.userRegistration = async(req, res) => {
    const {name, studentId, department, passingYear, email, phone, company, role, password, confirmPassword} = req.body;
    
    try{
        if(!name || ! studentId || !department || !passingYear || !email || !phone || !company || !role || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: false
            })
        }
        
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password are not matched"
            })
        }

        const findUser = await User.findOne({ $or: [{ email }, { studentId }] });
        if(findUser){
            return res.status(400).json({
                message: "User already exist"
            })
        }
    
        // if(existingUser){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Email is already exist",
        //     });
        // }
    
        const user = await User.create({
            name,
            studentId,
            department,
            passingYear,
            email,
            phone,
            company,
            role,
            password,
            confirmPassword
        })
    
        if(!user){
            return res.status(500).json({
                success: false,
                message: "Data save is failed",
            });
        }
        else{
            return res.status(201).json({
                data:user,
                success: true,
                message: "Data save successfully"
            })
        }
    }
    catch (error) {
        //Handle MongoDB duplicate key error
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            return res.status(400).json({
                success: false,
                message: error
            });
        }

        console.error(error);
        return res.status(500).json({
            success: false,
            // message: error.errors.studentId.message,
            message: error.errors
        });
    }
}



//user login
// exports.userLogin = async(req, res) => {
//     const {email, password} = req.body;
//     try{
//         if(!email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email and Password are required'
//             })
//         }
        

//         const existingUser = await User.findOne({email});

//         const matchPassword = await bcrypt.compare(password, existingUser.password);


//         if(!matchPassword){
//             return res.status(404).json({
//                 success: false,
//                 message: 'Something went wrong! Please fill valid email and password'
//             })
//         }

//         else{ 
//             res.cookie("token", existingUser.token, {
//                 httpOnly: true,
//                 path: '/',
//                 domain: "localhost",
//                 secure: true,
//                 sameSite: "none" // Set SameSite attribute to "None"
//             });
//             return res.status(200).json({
//                 data: existingUser,
//                 success: true,
//                 message: 'Login Success'
//             })
//         }
//     }
//     catch(err){
//         res.status(404).json({
//             success: false,
//             message: 'Something went wrong! Please fill valid email and password'
//         })
//     }
// }

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required'
            });
        }

        const existingUser = await User.findOne({ email });

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(404).json({
                success: false,
                message: 'Login Failed. Please fill valid email and password'
            });
        } else {
            // Set the cookie with the necessary attributes
            // res.cookie("hasib", existingUser.token);

            return res.status(200).json({
                data: existingUser.token,
                success: true,
                message: 'Login Success'
            });
        }
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Login Failed. Please fill valid email and password'
        });
    }
};




// About
exports.about = async(req, res) => {
    const token = req.body.cookie;
    try{
        
        const existingUser = await User.findOne({ token });
        if(existingUser){
            return res.status(200).json({
                success: true,
                message: "about success",
                myCookie: token,
                user: existingUser
        })
    }
    else{
        return res.status(404).json({
            success: false,
            message: "Please login"
        })
    }
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: 'Please login'
        });
    }
}



/*----------Update User Profile----------*/
exports.updateProfile = async(req, res) => {
    const {name, studentId, department, passingYear, email, phone, company, role, token} = req.body;

    try{
        if(!name || ! studentId || !department || !passingYear || !email || !phone || !company || !role){
            return res.status(400).json({
                success: false,
                message: "All the fields are required"
            })
        }
        
        const existingUser = await User.findOne({ token });

        if(existingUser){
            existingUser.name = name;
            existingUser.studentId = studentId;
            existingUser.department = department;
            existingUser.passingYear = passingYear;
            existingUser.email = email;
            existingUser.phone = phone;
            existingUser.company = company;
            existingUser.role = role;

      // Save the updated user data
      await existingUser.save();
            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                user: existingUser
        })
    }
    else{
        return res.status(404).json({
            success: false,
            message: "Please login"
        })
    }
    }
    catch (error) {
      
            return res.status(400).json({
                success: false,
                message: "Please input valid Student Id and Email", error
            })
    }
    
}



/*----------Find graduates list and send into frontend----------*/
exports.graduatesList = async(req, res) => {
    try{
        const graduates = await User.find()
        if(graduates){
            return res.status(200).json({
                success: true,
                message: "success",
                data: graduates
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Empty Graduates List"
            })
        }
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: 'Please login'
        });
    }
}
