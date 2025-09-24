const path = require('path');
const Database = require('better-sqlite3');

const dbDirectory = path.join(__dirname, '..', 'data');
const dbFile = path.join(dbDirectory, 'mind-ease.db');

// Ensure data directory exists
const fs = require('fs');
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const db = new Database(dbFile);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    user_type TEXT CHECK(user_type IN ('student','counselor','admin')) NOT NULL DEFAULT 'student',
    emergency_contact TEXT,
    institution TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Ensure student-specific columns exist for older DBs
try {
  const columns = db.prepare("PRAGMA table_info(users)").all();
  const hasEmergency = columns.some((c) => c.name === 'emergency_contact');
  const hasInstitution = columns.some((c) => c.name === 'institution');
  if (!hasEmergency) {
    db.exec("ALTER TABLE users ADD COLUMN emergency_contact TEXT");
  }
  if (!hasInstitution) {
    db.exec("ALTER TABLE users ADD COLUMN institution TEXT");
  }
} catch (e) {
  // ignore if pragma/alter not supported in environment
}

function createUser({ email, passwordHash, name, userType, emergencyContact, institution }) {
  const stmt = db.prepare(
    'INSERT INTO users (email, password_hash, name, user_type, emergency_contact, institution) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const info = stmt.run(
    email,
    passwordHash,
    name || null,
    userType || 'student',
    emergencyContact || null,
    institution || null
  );
  return info.lastInsertRowid;
}

function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function getCounselorsByInstitution(institution) {
  return db.prepare('SELECT id, name, email FROM users WHERE user_type = ? AND institution = ?').all('counselor', institution);
}

module.exports = {
  db,
  createUser,
  getUserByEmail,
  getCounselorsByInstitution,
};

// Optional seed helpers
async function ensureAdminSeed() {
  const existing = getUserByEmail('admin@local');
  if (existing) return;
  const bcrypt = require('bcryptjs');
  const passwordHash = await bcrypt.hash('admin123', 10);
  createUser({ email: 'admin@local', passwordHash, name: 'Administrator', userType: 'admin' });
}

module.exports.ensureAdminSeed = ensureAdminSeed;


