const sqlite3 = require('sqlite3').verbose();

// Open the database
let db = new sqlite3.Database('.myMusicApp.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the myMusicApp database.');
});

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('users table deleted.');
    }
  });
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('users table created.');
    }
  });
});

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS playlists`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('playlists table deleted.');
    }
  });
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS playlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
)`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('playlists table created.');
    }
  });
});

module.exports = db;
