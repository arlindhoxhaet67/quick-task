/*
	FileName: ComplexCodeExample.js
	
	This code is a complex example showcasing a sophisticated and elaborate JavaScript program
	that can serve as a basis for a web application. It includes features like user authentication,
	database interactions, and dynamic rendering of HTML elements. This code is for illustrative purposes 
	only and should not be used in production.
*/

// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Set up the Express application
const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/<DATABASE>', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB Atlas'))
	.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define User schema
const userSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	password: String,
});

// Define User model
const User = mongoose.model('User', userSchema);

// Middleware for user authentication
const authenticateUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).send('Invalid credentials');
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).send('Invalid credentials');
		}

		next();
	} catch (err) {
		res.status(500).send('Internal Server Error');
	}
};

// Route to create a new user
app.post('/users', async (req, res) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			username,
			password: hashedPassword,
		});

		await user.save();

		res.status(201).send('User created');
	} catch (err) {
		res.status(500).send('Internal Server Error');
	}
});

// Route to get user information (requires authentication)
app.get('/users/:username', authenticateUser, async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({ username });

		res.send(user);
	} catch (err) {
		res.status(500).send('Internal Server Error');
	}
});

// Start the server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});