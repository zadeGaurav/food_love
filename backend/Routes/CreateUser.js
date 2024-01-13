const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"

router.post("/createuser",
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'please give the the password>5').isLength({ min: 5 }),
  async (req, res) => {
    //for debug
    // console.log(req.body.name, req.body.password, req.body.location, req.body.email)
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        // password: req.body.password,
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }))

    } catch (err) {
      console.log(err)
      res.json({ success: false })
    }
  })


// Authentication a User, No login Requiered
router.post("/loginuser",
 [ body('email').isEmail(),
  body('password', 'please give the the password>5').isLength({ min: 5 }),],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // let email = req.body.email;
    const { email, password } = req.body;

    try {
      //findOne returns the whole document associated with that email.
      let userData = await User.findOne({ email })
      if (!userData) {
        return res.status(400).json({ success, errors: "Try loggin in with correct redentails." });
      }
      const pwdCompare = await bcrypt.compare(password, userData.password); // this return true false.
      // if (req.body.password !== userData.password) 
      if (!pwdCompare) {
        return res.status(400).json({ success, errors: "Try loggin in with correct redentails" });

      }
      const data = {
        userData: {
          id: userData.id
        }
      }
      success = true;
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success, authToken })

    } catch (error) {
      console.error(error.message)
      res.send("Server Error", { success: false })
    }
    // } catch (err) {
    //   console.log(err)
    //   res.json({ success: false })
    // }

  })



// router.post("/loginuser", async(req, res)=>{
//   let email = req.body.email;
//     try{
//       //findOne returns the whole document associated with that email.
//       let userData = await User.findOne({email})
//       if(!userData){
//         return res.status(400).json({ errors: "Try loggin in with correct redentails." });
//       }

//       if(!req.body.password === userData.password){
//         return res.status(400).json({ errors: "Try loggin in with correct redentails." });

//       }
//       return res.json({ success:true});
//     }catch(err){
//         console.log(err)
//         res.json({success:false})
//     }
// })

module.exports = router;