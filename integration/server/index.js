
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/employee'); // Ensure correct casing

const port = 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/employee');
    console.log('MongoDB connection successful');

    // Start the server only after a successful DB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if DB connection fails
  }
}

main();

// Root route
app.get('/', (req, res) => {
  res.send('Hello, this is the root route');
});

// Register employee route
app.post('/register', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const employee = await EmployeeModel.create(req.body);
    res.status(201).json(employee); // 201 Created
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Error creating employee' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'No record exists for this email' });
    }

    if (user.password === password) {
      res.json({ message: 'Success', user });
    } else {
      res.status(401).json({ error: 'The password is incorrect' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});