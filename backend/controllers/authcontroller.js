import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import axios from "axios";

export const register = async (req, res) => {
      console.log("REGISTER API HIT");
      console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please provide all the required fields" });
    }
        try{
             const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                return res.json({ success: false, message: "User with this email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new userModel({ name, email, password: hashedPassword });
            await user.save();
            console.log("NEW USER:", user._id);
            const token = jwt.sign(
                {id: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: "6d" }
        );
            console.log("TOKEN FOR:", user._id);

            // res.cookie("token", token, {
            //     httpOnly: true,
            //     secure : process.env.NODE_ENV === "production",
            //     sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            //     maxAge: 6 * 24 * 60 * 60 * 1000,
            // });
            console.log("COOKIE SET");
            res.cookie("token", token, {
            httpOnly: true,
             secure: true,
             sameSite: "none",
             maxAge: 6 * 24 * 60 * 60 * 1000,
          });
           console.log("COOKIE SET");
              
await axios.post( "https://api.brevo.com/v3/smtp/email",
                {
                  sender: {
                    name: "CollegeNet",
                   email: process.env.SENDER_EMAIL,
                 },
              to: [
             {
                   email: email,
              },
               ],
           subject: "Welcome to CollegeNet",
           textContent: `Hi ${name},

                 Welcome to CollegeNet! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out.\n\nBest regards,\nThe CollegeNet Team

             Best regards,
            The CollegeNet Team`,
           },
             {
              headers: {
               "api-key": process.env.BREVO_API_KEY,
              "Content-Type": "application/json",
               accept: "application/json",
               },
           }
        );
           console.log("COOKIE ABOUT TO SEND");
            return res.status(200).json({ success: true, message: "User registered successfully" });

        }catch(error){
            res.json({ success: false, message: error.message });
        }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }
    try {
        const user = await userModel.findOne({ email }); 
        if (!user) {
        return res.json({ success: false, message: "Invalid email" });
      }
         if (!user.isAccountVerified) {
              return res.json({
               success: false,
               message: "Please verify your email first"
            });
           }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }

      const token = jwt.sign({id: user._id },
            process.env.JWT_SECRET, { expiresIn: "6d" });
            
            res.cookie("token", token, {
                httpOnly: true,
                secure : process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 6 * 24 * 60 * 60 * 1000,
            });

     return res.json({ success: true, message: "Login successful" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const logout = (req, res) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure : process.env.NODE_ENV === "production",
            sameSite: process .env.NODE_ENV === "production" ? "none" : "strict"
        });
        return res.json({ success: true, message: "Logout successful" });
    } catch(error){
      return  res.json({ success: false, message: error.message });
    }
}


export const sendverifyotp = async (req, res) => {
        try {
             console.log("TOKEN:", req.cookies?.token);
             console.log("USER ID:", req.userId);

            const userId = req.userId;
            const user = await userModel.findById(userId);
            
             console.log("FOUND USER:", user);

             if (!user) {
               return res.json({
                  success: false,
                 message: "User not found"
                 });
            }

            if (user.isAccountVerified){
                return res.json(
                    { success: false,
                      message: "Account is already verified"
                     });
            } 
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            user.verifyOtp = otp;
            user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
            await user.save();
           
            await axios.post( "https://api.brevo.com/v3/smtp/email",
               {
               sender: {
               name: "CollegeNet",
               email: process.env.SENDER_EMAIL,
              },
              to: [
              {
                email: user.email,
               },
            ],
            subject: "Your Account Verification OTP",
            textContent: `Hi ${user.name},\n\nYour OTP for account verification is ${otp}. This OTP is valid for 10 minutes.\n\nBest regards,\nThe CollegeNet Team`,
           },
          {
            headers: {
              "api-key": process.env.BREVO_API_KEY,
              "Content-Type": "application/json",
           },
          }
         );

            return res.json({
                success: true,
                message: "Verification OTP sent successfully"
            });

        } catch (error) {
            res.json({ success: false, message: error.message });
        }
}

export const verifyEmail = async (req, res) => {

    const userId = req.userId;
    const { otp } = req.body;

     if(!userId || !otp){
        return res.json({ success: false, message: "User ID and OTP are required" });
     }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "Invalid user ID" });
        }
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account is already verified" });
        }
        if (user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (Date.now() > user.verifyOtpExpireAt) {
            return res.json({ success: false, message: "OTP has expired" });
        }
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const isAuthenticated = async (req, res) => {
    try {
          const user = await userModel
            .findById(req.userId)
            .select("-password");

            if (!user) {
             return res.json({
                  success: false,
                  message: "User not found"
                });
            }

        return res.json(
            {success: true,
                user
            }
        );
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const resendOtp = async (req, res) => {
     const {email} = req.body;
        if(!email){
            return res.json({ success: false, message: "Email is required" });
        }
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.json({ success: false, message: "User with this email does not exist" });
            }
             const resendOtp = Math.floor(100000 + Math.random() * 900000).toString();

            user.resendOtp = resendOtp;
            user.resendOtpExpireAt = Date.now() + 15 * 60 * 1000;
            await user.save();

            const mailoptions ={
                from : process.env.SENDER_EMAIL,
                to : user.email,
                subject : "Password Reset OTP",
                text : `Hi ${user.name},\n\nYour OTP for password reset is ${resendOtp}. This OTP is valid for 15 minutes.\n\nBest regards,\nThe CollegeNet Team`
            };
           
            await transporter.sendMail(mailoptions);
            return res.json({ success: true, message: "OTP resent successfully" });
        } catch (error) {
            res.json({ success: false, message: error.message });
        }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP, and new password are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User with this email does not exist" });
        }
        if (user.resendOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (Date.now() > user.resendOtpExpireAt) {
            return res.json({ success: false, message: "OTP has expired" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resendOtp = "";
        user.resendOtpExpireAt = 0;
        await user.save();
        return res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}