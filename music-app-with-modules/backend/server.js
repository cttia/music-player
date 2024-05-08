const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 
const playlistRoutes = require('./routes/playlistRoutes'); 
const app = express();
const PORT = process.env.PORT || 5000;

//auth routes
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);

app.listen(PORT, () => {
  console.log(`Backend server (Express) running on port ${PORT}`);
});
