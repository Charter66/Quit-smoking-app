const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const request = require('request');
const cheerio = require('cheerio');

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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60,
    //   sameSite: 'lax',
    //   secure: false,
    // });
    
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

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60,
    //   sameSite: 'lax',
    //   secure: false,
    // });
    
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
    console.log('Logout successful'); // Add console log
    res.setHeader('Set-Cookie', '');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  


const survey = async (req, res) => {
  const {startSmokingDate, cigarettesPerDay, quitDate, packageCost, cigarettesInPackage, selectedCurrency } = req.body;
  try {
    // Extract the token from the request headers or other secure storage
    const token = req.headers.authorization;
    console.log(req.headers);
    console.log(token);

    // Verify the token and extract the user's email or ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded._id;
    console.log(decoded._id)

    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the user by their email and update the survey details
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          "smokingHabit.cigarettesPerDay": parseInt(cigarettesPerDay),
          "smokingHabit.quitDate": quitDate,
          "smokingHabit.packageCost": parseInt(packageCost),
          "smokingHabit.cigarettesInPackage": parseInt(cigarettesInPackage),
          "smokingHabit.selectedCurrency": selectedCurrency,
          "smokingHabit.startSmokingDate":startSmokingDate,
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


const goals = async (req, res) => {
  const { description, goalCost, currency } = req.body;

  try {
    // Extract the token from the request headers or other secure storage
    const token = req.headers.authorization;

    // Verify the token and extract the user's email or ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded._id;

    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the user by their ID and update the goals array
    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          goals: {
            description,
            goalCost: parseInt(goalCost),
            currency,
          },
        },
      },
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return only the updated goals array in the response
    const updatedGoals = user.goals;
    res.status(200).json({ message: "Goals updated successfully", goals: updatedGoals });
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

// DELETE /api/users/goals/:id
const deleteGoal = async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Decode the token to obtain the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    const goalId = req.params.id;

    console.log('User ID:', userId);
    console.log('Goal ID:', goalId);

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the goal by its ID in the user's goals array
    const goalIndex = user.goals.findIndex((goal) => goal.id.toString() === goalId);

    if (goalIndex === -1) {
      console.log('Goal not found');
      return res.status(404).json({ error: 'Goal not found' });
    }

    // Remove the goal from the user's goals array
    user.goals.splice(goalIndex, 1);

    // Save the updated user object
    await user.save();

    console.log('Goal deleted successfully');
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Scraping controler /api/users/scrape

const scrapeWebsite = async (req, res) => {
  try {
    const html = await getRequest('https://www.medicalnewstoday.com/');

    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Find elements in the HTML using CSS selectors
    const title = $('title').text();
    console.log('Title:', title);

    // Extract specific data from the website
    const links = [];
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      const text = $(element).text();
      links.push({ text, href });
    });

    res.json({ title, links });
  } catch (error) {
    res.status(500).json({ error: 'Error scraping website' });
  }
};

function getRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        resolve(html);
      } else {
        reject(error);
      }
    });
  });
}

const updateSavedMoney = async (req, res) => {
  try {
    // The problem was the token so far
    const token = req.headers.authorization;
    // const token = req.cookie.token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;

    // const {indexInArray} = req.body
    //  let indexForDatabase = `goals[${indexInArray}].achieved`
    const { savedMoney } = req.body;
    console.log('Decoded Token:', decodedToken);
    console.log('User ID:', userId);
    console.log('New Saved Money:', savedMoney);

    // Update the savedMoney in the database
    const user = await User.findByIdAndUpdate(userId, { 
        savedMoney,
        // 'goals[0].achieved':achieved,
    }, 
      { new: true });
    // Return the updated savedMoney in the response
    res.json({ savedMoney: user.savedMoney });
  } catch (error) {
    console.error('Error updating saved money:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const achieveGoal = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    const { goalId } = req.params;
    const { achieved } = req.body;

    console.log('Decoded Token:', decodedToken);
    console.log('User ID:', userId);
    console.log('Goal ID:', goalId);
    console.log('Achieved:', achieved);

    // Find the user and update the achieved field of the goal
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'goals._id': goalId },
      { $set: { 'goals.$.achieved': achieved } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User or goal not found' });
    }

    // Find the updated goal in the user document
    const updatedGoal = updatedUser.goals.find((goal) =>
      goal._id.equals(goalId)
    );

    console.log(updatedUser)

    // Return the updated goal in the response
    res.json({ goal: updatedGoal });
  } catch (error) {
    console.error('Error achieving goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  register,
  login,
  logout,
  profile,
  survey,
  getOneUser,
  goals,
  deleteGoal,
  scrapeWebsite,
  updateSavedMoney,
  achieveGoal
};