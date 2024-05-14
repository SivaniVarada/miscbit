const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const authenticate=require("./authenticate")

// Register Route
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

module.exports = router;
