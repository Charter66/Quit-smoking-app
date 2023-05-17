const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

 
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Generate JWT token


    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'none',
      secure: true,
    }).sendStatus(201)
   
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
  

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: 'none', // Adjust according to your requirements
      secure: false, // Adjust according to your requirements
    });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  
    const survey = async (req, res) => {
      const { cigarettesPerDay, quitDate, packageCost, cigarettesInPackage } = req.body;
    
      try {
        // Extract the token from the request headers or other secure storage
        const token = req.headers.authorization;
        
        // Verify the token and extract the user's email or ID
        const email = verifyTokenAndGetEmail(token);
    
        if (!email) {
          return res.status(401).json({ error: "Unauthorized" });
        }
    
        // Find the user by their email and update the survey details
        const user = await User.findOneAndUpdate(
          { email },
          {
            $set: {
              "smokingHabit.cigarettesPerDay": cigarettesPerDay,
              "smokingHabit.quitDate": quitDate,
              "smokingHabit.packageCost": packageCost,
              "smokingHabit.cigarettesInPackage": cigarettesInPackage,
            },
          }
        );
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        res.status(200).json({ message: "Survey updated successfully" });
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
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
  
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find the user by ID
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ user });
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  register,
  login,
  profile,
  survey,
  getOneUser,
 
};