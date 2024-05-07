const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User.js');

const router = express.Router()

router.post("/register", async (req, res) => {
    // Får "username" fra frontend
    const { username, password, phone, email } = req.body;
    // Checker om der allerede er en account med det "username"
    const user = await UserModel.findOne({ username });

    // Hvis der allerede er en account så stop her og return message
    if (user) {
        return res.json({message: "User already exists!"})
    }
    // Hvis der ikke er en account med det username så fortsæt her
    
    // hash password / hide / gem det så hackers etc. ikke kan se det som normal string 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Laver en ny account her med brug af "username" og "password" - det er dog hashed password som vi har lavet
    // oven over
    const newUser = new UserModel({ username, password: hashedPassword, phone, email });
    await newUser.save();

    res.json({message: "User Registered Successfully"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    

    const user = await UserModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

    // Hvis der IKKE er "user" i system/databasen 
    // if (!user) {
    //     return res.json({message: "User Doesnt Exist!"});
    // }
    if (!user) {
        return res.status(401).json({message: "User Doesnt Exist!"});
    }

    // Tjek om password matcher username - bruger bcrypt, da vi skal tjekke for det hashed password
    // Hash password algoritmen er den samme, så ved brug a bcrypt kan man tjekke efter om det hashed password matcher
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //     return res.json({message: "Username or Password is Incorrect!"});
    // }
    if (!isPasswordValid) {
        return res.status(401).json({message: "Username or Password is Incorrect!"});
    }

    // Hvis der er et username og username og password matcher, så logger vi brugeren ind her
                // Skal nok have lavet environment variable i stedet for hardcode "secret"
                // Bliver snakket om det i videon (47:15) - https://www.youtube.com/watch?v=P43DW3HUUH8
        
    console.log("User:", user);

    const token = jwt.sign({id: user._id}, "secret");
    res.json({ token, userID: user._id, username: user.username });
});


router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/user/change/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { password, email, phone, username } = req.body;
    
    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (phone) {
      user.phone = phone;
    }

    // Save the updated user
    await user.save();

    res.json({ message: "User information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Finder tickets på user med x ID
router.get("/userTickets/:id", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (user) {
        res.json({ tickets: user.tickets });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET alle users
  router.get("/allUsers", async (req, res) => {
    try {
      const users = await UserModel.find({}).select('username password phone email');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.delete("/user/delete/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await user.remove();
  
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Tilføjer/add +1 ticket til x user ud fra ID
  router.post("/incrementTicket/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.tickets++; // Increment the ticket count
        await user.save(); // Save the updated user
        res.json({ message: "Ticket incremented successfully", tickets: user.tickets });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sæt/update ticket antal på x user ud fra ID
router.post("/updateTicket/:id", async (req, res) => {
  const { id } = req.params;
  const { newTicketCount } = req.body; // Assuming you're sending the new ticket count in the request body

  try {
      const user = await UserModel.findById(id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      user.tickets = newTicketCount; // Update the ticket count
      await user.save(); // Save the updated user
      res.json({ message: "Ticket count updated successfully", tickets: user.tickets });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Sæt/update hasPostedSurvey på x user ud fra ID
router.post("/updatePostedSurvey/:id", async (req, res) => {
  const { id } = req.params;
  const { hasPostedSurvey } = req.body;

  try {
      const user = await UserModel.findById(id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      user.hasPostedSurvey = hasPostedSurvey; // Update hasPostedSurvey
      await user.save(); // Save the updated user
      res.json({ message: "hasPostedSurvey updated successfully", hasPostedSurvey: user.hasPostedSurvey });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// GET user status - på om de har svaret på spørgeskema
router.get("/getPostedSurveyStatus/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ hasPostedSurvey: user.hasPostedSurvey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router

