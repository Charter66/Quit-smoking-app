const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword });
   
 
  

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'lax',
      secure: false,
    });
    
    res.json({ token });
   
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const userId = req.params._id; // Corrected the parameter name to 'params'
    const findUser = await User.findById(userId); // Corrected the parameter name to 'userId'
    console.log(req.params);
    res.status(200).json(findUser);
  } catch (error) {
    next(error);
  }
};
  

const login= async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send('Please provide all fields');

    const checkUser = await User
      .findOne({ email })
      .select('+password');
    if (!checkUser) return res.status(400).send('User already exists');

    const pwdMatch = await bcrypt.compare(password, checkUser.password);
    if (!pwdMatch) return res.status(400).send('Incorrect password');

    const token = jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'lax',
      secure: false,
    });
    
    res.json({ token });


    // Send the token in the response
    // res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const logout = async (req, res) => {
  try {
    // Clear the token from the client-side
    res.clearCookie('token');

    // Add any additional logic for clearing sessions or tokens as needed

    console.log('Logout successful'); // Add console log

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  

// ...

const survey = async (req, res) => {
  const { cigarettesPerDay, quitDate, packageCost, cigarettesInPackage } = req.body;

  try {
    // Extract the token from the request headers or other secure storage
    const token = req.headers.authorization;
    console.log(req.headers)
    console.log(token)

    // Verify the token and extract the user's email or ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.userId;

    if (!email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the user by their email and update the survey details
    const user = await User.findByIdAndUpdate(
      email,
      {
        $set: {
          "smokingHabit.cigarettesPerDay": parseInt(cigarettesPerDay) ,
          "smokingHabit.packageCost": parseInt(packageCost),
          "smokingHabit.cigarettesInPackage": parseInt(cigarettesInPackage),
        },
      },
      { new: true } // to return the updated user document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Survey updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


  
const profile = async (req, res) => {
  try {
    // Verify the token from the request headers
    const token = req.headers.authorization;
    if (!token) {
      console.log('No token, authorization denied');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.log('Error verifying token:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Find the user by ID
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile retrieved successfully');
    res.json({ user });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  register,
  login,
  logout,
  profile,
  survey,
  getOneUser,
 
};