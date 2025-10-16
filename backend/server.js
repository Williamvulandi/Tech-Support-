const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001;
const saltRounds = 10; // For password hashing

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Successfully connected to the SQLite database.');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT UNIQUE,
                password TEXT,
                role TEXT DEFAULT 'user'
            )`, (err) => {
                if (err) console.error("Error creating users table", err.message);
                else console.log("Users table is ready.");
            });

            db.run(`CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                category TEXT,
                priority TEXT,
                status TEXT DEFAULT 'open',
                userId INTEGER,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users (id)
            )`, (err) => {
                if (err) console.error("Error creating tickets table", err.message);
                else console.log("Tickets table is ready.");
            });
        });
    }
});

// --- API Endpoints ---

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Hello from the Tech Support Ticket API!');
});

// User Signup Endpoint
app.post('/signup', (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }
        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const params = [name, email, hash, role];
        db.run(sql, params, function(err) {
            if (err) {
                return res.status(400).json({ error: 'Email already exists.' });
            }
            res.status(201).json({ message: 'User created successfully!', userId: this.lastID });
        });
    });
});

// User Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
     if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error during login.' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords.' });
            }
            if (result) {
                // Passwords match
                res.status(200).json({ 
                    message: 'Login successful!',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                });
            } else {
                // Passwords don't match
                return res.status(401).json({ error: 'Invalid credentials.' });
            }
        });
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});

