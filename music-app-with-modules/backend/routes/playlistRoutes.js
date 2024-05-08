const express = require('express');
const router = express.Router();
const db = require('../database/database');


// Create a new playlist
router.post('/', (req, res) => {
    const { userId, playlistName } = req.body;

    // Log the request body as JSON
    console.log('Request Body:', JSON.stringify(req.body));

    db.run(`INSERT INTO playlists (name, userId) VALUES (?, ?)`, [playlistName, userId], function(err) {
        if (err) {
            console.log("playlistRoutes.js - error while saving playlist:" + playlistName);
            res.status(500).json({ error: err.message });
            return;
        }
        
        console.log("playlistRoutes.js - playlist saved:" +  userId + ","  + playlistName);
        res.status(201).json({ userId: this.lastID, playlistName: playlistName });
    });
});


// Get all playlists for a user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.all(`SELECT * FROM playlists WHERE userId = ?`, [userId], (err, playlists) => {
        console.log("playlistRoutes.js - get playlists for user ID:" + userId);
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(playlists);
    });
});

// Update a playlist
router.put('/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    db.run(`UPDATE playlists SET name = ? WHERE id = ?`, [name, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Playlist updated', changes: this.changes });
    });
});

// Delete a playlist
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM playlists WHERE id = ?`, id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Playlist deleted', changes: this.changes });
    });
});

module.exports = router;
