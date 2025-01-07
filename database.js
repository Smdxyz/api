const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./api_management.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
  }
});

// Create the APIs table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS apis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    limit INTEGER DEFAULT 1000,
    errorStats INTEGER DEFAULT 0,
    successStats INTEGER DEFAULT 0,
    owner TEXT DEFAULT 'Sann'
  )
`);

module.exports = db;
