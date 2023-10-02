const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5050;

// Connect to MongoDB
mongoose.connect('mongodb+srv://abrhamwube:abrshewube@abrhamwube.6darlxm.mongodb.net/music?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

// Define the Song Schema and Model
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  image:String,
});

const Song = mongoose.model('Song', songSchema);

// Routes for CRUD operations
// Create a new song

app.post('/songs', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: 'Could not create the song.' });
  }
});

// Get a list of songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve songs.' });
  }
});

// ...

// Get a song by ID
app.get('/songs/:id', async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve the song' });
    }
  });
  
  // ...
  
// Update a song
app.put('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: 'Could not update the song.' });
  }
});

// Delete a song
app.delete('/songs/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Could not delete the song.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
