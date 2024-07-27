import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config();
import cookieparser from 'cookie-parser'
import jwt from 'jsonwebtoken'


export const test = async(req, res) => {
    try {
        console.log("test route api hit!!");    
    } catch (error) {
        console.log("error....inside catch block - ",error)
    }
}

export const login = async(req, res) => {
    try {
        // console.log("login route api hit!!");
        const {email, password} = req.body
        //validdate
        if(!email || !password )
        {
            return res.status(401).json({
                success: false,
                message: "Details not found, please fill out the necessary details."
            })
        }
        //check if user exists or not
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(401).json({
                success: false,
                message: "User not registered, Please signUp first."
            })
        }
        const payload = {
            email: user.email,
            id: user._id,
            //add the account type if needed here
        }
        //if it exists then hash the password and generate token
        if(await bcrypt.compare(password, user.password))
        {
            //generate token
            const token = await jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "24h"} )
            user.token = token;
            // console.log("user is: ", user);
            // console.log('user.token is : ', user.token);
            user.password = undefined   //make the password undefind once the user is verified

            //create the cookie
            const options = {
                expiresIn: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("Token", token, options ).status(200).json({
                success: true,
                message: "Logged in successfully.",
                token,
                user,
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "unauthorized access. password is incorrect"
            })
        }

        // ********LOGIN RESPONSE ************
        // {
        //     "success": true,
        //     "message": "Logged in successfully.",
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2hAZ21haWwuY29tIiwiaWQiOiI2NjMxZjdiNjU2ZTFkNzU3N2YzYTExZDMiLCJpYXQiOjE3MTQ1NTIxNDIsImV4cCI6MTcxNDYzODU0Mn0.BODJteFjuH-Ir2tAxocSx1_3oGoD47P8W3dDB7pED6g",
        //     "user": {
        //         "_id": "6631f7b656e1d7577f3a11d3",
        //         "firstName": "Ansh",
        //         "lastName": "Jain",
        //         "email": "ansh@gmail.com",
        //         "image": "https://api.dicebear.com/6.x/initials/svg?seed=Ansh%20Jain ",
        //         "__v": 0,
        //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2hAZ21haWwuY29tIiwiaWQiOiI2NjMxZjdiNjU2ZTFkNzU3N2YzYTExZDMiLCJpYXQiOjE3MTQ1NTIxNDIsImV4cCI6MTcxNDYzODU0Mn0.BODJteFjuH-Ir2tAxocSx1_3oGoD47P8W3dDB7pED6g"
        //     }
        // }
        

    } catch (error) {
        console.log('login error inside catch - ', error)
        return res.status(404).json({
            success: false,
            message: "Something went wrong while logging in. Please try again after sometime."
        })
    }
    
}

export const signup = async(req, res) => {
    try {
        // console.log('inside sighnup')
        const {
            firstName, lastName, email, password, confirmPassword
        } = req.body;

        //validation
        if(!firstName || !password || !confirmPassword ||!email )
        {
            return res.status(401).json({
                success: false,
                message: "Please fill out the neccessary fields."
            })
            console.log("all necessary data is not provided");
        }
        if(password !== confirmPassword ){
            return res.status(401).json({
                success: false,
                message: "Passwords do not match"
            })
            console.log("Passwords do not match.");
        }
        //check for existing user
        const existingUser = await User.findOne({email});
        if(existingUser) 
        {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please Login or try different emailId"
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //idhr pe admin sign up kr rha hai ya user....yeh wali functionality bhi add ki ja skti hai

        //now create the user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image : `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}%20${lastName} `,
        });

        //return response 
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user
        })

        //  ************* ye jo user return ho rha hai...is format mein hai*******
        // {
        //     "success": true,
        //     "message": "User registered successfully",
        //     "user": {
        //         "firstName": "Ansh",
        //         "lastName": "Jain",
        //         "email": "ansh@gmail.com",
        //         "password": "$2a$10$JM7lmKgby30NvdXo0Sq7VOdIJq7o.OkDIsll9tPrKo8dJIz4tGB2u",
        //         "image": "https://api.dicebear.com/6.x/initials/svg?seed=Ansh%20Jain ",
        //         "_id": "6631f7b656e1d7577f3a11d3",
        //         "__v": 0
        //     }
         
    } catch (error) {
        console.log("signup error inside catch - ", error)
        return req
    }
    
}