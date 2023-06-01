const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sign up //create an account
const Register = async (req, res) => {
  try {
    const { name, email, age, password, role } = req.body;

    const isfound = await User.findOne({ email });
    if (isfound) {
      return res.status(400).json({ message: "User already exists !" });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      age,
      email,
      password: hashedPassword,
      role,
    });
//  create(req.body)
    if (newUser) {
      res.status(200).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      console.log("Invalid user data");
    }
  } catch (error) {
    console.log(error)
    res.status(501).json({ message: error, msg: 'error' });
    console.log('invalid')
  }
};

// Sign In
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isfound = await User.findOne({ email });
    if (isfound && (await bcrypt.compare(password, isfound.password))) {
      res.json({
        _id: isfound._id,
        name: isfound.name,
        email: isfound.email,
        role: isfound.role,
        token: generateToken(isfound._id),
      });
    } else {
      res.status(400);
      console.log("Invalid credentials");
      }
      

  } catch (error) {
    res.status(501).json({ message: error });
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
};
console.log('users profile', getMe)



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "30d",
  });
};
console.log(generateToken());


module.exports = { Register, Login, getMe };
