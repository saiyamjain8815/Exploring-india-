const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/exploreIndia'; // Replace with your actual MongoDB URI
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const placeSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Place = mongoose.model('Place', placeSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example API route to get data from MongoDB
app.get('/api/places', async (req, res) => {
    try {
        const places = await Place.find(); // Fetch places from the database
        res.json(places); // Send the data as JSON
    } catch (error) {
        console.error('Error fetching places:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
