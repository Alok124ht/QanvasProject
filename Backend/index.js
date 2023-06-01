const express = require ("express");
const app = express();
const mongoose = require ("mongoose");
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.use(express.urlencoded({ extended: false }));
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
const mongoUrl =
  "mongodb+srv://alokgautam:oy9GeF3PH5mGv95i@cluster0.hqxfz.mongodb.net/QanvasAssignment";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  app.listen(7000, () => {
    console.log("Server Started on PORT 7000");
  });

require("./userDetails");

const User = mongoose.model("UserInfo");

//-------------------------------------------------------Register user ----------------------------------------------------------//
app.post('/register', async (req, res) => {
    try {
      const { fname, lname, email, password } = req.body;
      // Create a new user
      const user = await User.create({ fname, lname, email, password });
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  })



  //-----------------------------------------------------------LOGIN USER -----------------------------------------------------------------// 
  
  app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
      });
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  });


//----------------------------------------------USER PROFILE-----------------------------//

app.post("/userData", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email, password });
  
      if (user) {
        res.send({ status: "ok", data: user });
      } else {
        res.send({ status: "error", message: "User not found" });
      }
    } catch (error) {
      res.send({ status: "error", message: "Failed to fetch user data" });
    }
  });
  

// -------------------------------------------PAGINATION -------------------------------------------------------------//
app.get('/users', async (req, res) => {
    try {
      const { page, limit, name, email, mobile } = req.query;
      const query = {};
  
      // Apply search filters
      if (name) query.name = { $regex: name, $options: 'i' };
      if (email) query.email = { $regex: email, $options: 'i' };
      if (mobile) query.mobile = { $regex: mobile, $options: 'i' };
  
      // Calculate pagination values
      const currentPage = parseInt(page, 10) || 1;
      const perPage = parseInt(limit, 10) || 10;
      const skip = (currentPage - 1) * perPage;
  
      // Fetch users based on the query and pagination values
      const users = await User.find(query)
        .skip(skip)
        .limit(perPage);
  
      // Count total number of users for pagination
      const totalCount = await User.countDocuments(query);
  
      res.json({
        users,
        currentPage,
        totalPages: Math.ceil(totalCount / perPage),
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user list' });
    }
  });
  //----------------SERVER CODE --------------//
  