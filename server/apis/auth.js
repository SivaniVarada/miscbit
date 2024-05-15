const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const authenticate=require("./authenticate")
const nodemailer = require("nodemailer");
// Register Route
const createTransporter = () => {
  // Create and return Nodemailer transporter
  return nodemailer.createTransport({
    // Your email configuration
    // Example using Gmail SMTP:
    service: 'Gmail',
    auth: {
      user: 'yvishnuvamsith@gmail.com',
      pass: 'mdpn lifx vbso swlp'
    }
  });
};
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res, next) => {
  try {
    let temp;
    const { email, password } = req.body;
      temp=await User.findOne({email:email})
      if(!temp)
        {
          console.log('user doesnt exists!!')
        }
      if(!(await bcrypt.compare(password, temp.password)))
        {
          console.log('password doesnt matches')
        }
        let expiresIn = "3h"; 
        const token = jwt.sign({ email }, "your-secret-key", { expiresIn });
      temp.token = token;
      await temp.save();
      res.status(200).json({usertype:'admin', token, success: true });
    } 
   catch (err) {
    console.log(err);
  }
});
router.post('/logout', authenticate, async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user)
    user.token = undefined;
    await user.save();
    res.status(201).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get('/profile',authenticate,async(req,res,next)=>
{
      let user=req.user
      console.log(user)
      res.status(200).json({user})
})
router.post("/forgot-password", async (req, res, next) => {
  const email = req.body.email;
  console.log(email);

  try {
    let existingUser;
    existingUser=await User.findOne({email:email})
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    console.log(existingUser);
    //const secret=existingUser.password;
    // Generate a JWT token
    const token = jwt.sign({ email }, "your-secret-key", {
      expiresIn: "5m",
    });

    const transporterInstance = await createTransporter();
    // const from = await AdminEmail.findOne({ status: true });
    // const emailSettings = await EmailSettings.findOne({
    //   title: "Reset Password",
    // });
    // const relink=`http://localhost:3000/auth/reset-password?token=${token}`
    const relink = `http://localhost:3000/pages/login/ForgotPassword?token=${token}`;

    // console.log(from.email)
    var mailOptions = {
      from: 'yvishnuvamsith@gmail.com',
      to: email,
      subject: 'Forgot password reset',
      // text: ${emailSettings.text}:https://sstaxmentors-9d8477a8b025.herokuapp.com/reset-password/${existingUser._id}/${token},
      text: `click on the link to get started\n\nreset password link: ${relink}`
    };

    transporterInstance.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log(mailOptions)
        // console.log("INFO",info)
        res.send({ status: "success" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your-secret-key");

    // Hash the new password
    const hash = await bcrypt.hash(password, 10);

    // Find the user by email (assuming email is stored in the token)
    const existingUser = await User.findOne({ email: decoded.email });

    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the user's password
    existingUser.password = hash;
    await existingUser.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error processing your request" });
  }
});

module.exports = router;
