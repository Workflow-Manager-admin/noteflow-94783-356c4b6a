const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const NOTES_FILE_PATH = path.join(__dirname, '../../data/notes.json');

// Helper to read notes from file
function readNotesFromFile() {
  if (!fs.existsSync(NOTES_FILE_PATH)) {
    fs.writeFileSync(NOTES_FILE_PATH, '[]');
  }
  const data = fs.readFileSync(NOTES_FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

// Helper to write notes to file
function writeNotesToFile(notes) {
  fs.writeFileSync(NOTES_FILE_PATH, JSON.stringify(notes, null, 2));
}

class NoteService {
  // PUBLIC_INTERFACE
  getAllNotes(filter = {}, search = '') {
    /** Fetch all notes, optionally filtering and searching */
    let notes = readNotesFromFile();
    // Filtering (can add more sophisticated logic here)
    if (filter && Object.keys(filter).length > 0) {
      notes = notes.filter(note =>
        Object.entries(filter).every(([key, val]) => note[key] === val)
      );
    }
    // Simple text search over title/body
    if (search) {
      notes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.body.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Sort by updatedAt desc
    notes = notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return notes;
  }

  // PUBLIC_INTERFACE
  getNoteById(id) {
    /** Fetch a single note by its ID */
    const notes = readNotesFromFile();
    return notes.find(note => note.id === id);
  }

  // PUBLIC_INTERFACE
  createNote({ title, body = '', favorite = false, color = '', userId = null }) {
    /** Create a new note */
    const id = crypto.randomBytes(12).toString('hex');
    const now = new Date().toISOString();
    const note = {
      id,
      title,
      body,
      favorite,
      color,
      userId,
      createdAt: now,
      updatedAt: now,
    };
    const notes = readNotesFromFile();
    notes.push(note);
    writeNotesToFile(notes);
    return note;
  }

  // PUBLIC_INTERFACE
  updateNote(id, { title, body, favorite, color }) {
    /** Update a note's fields by its ID */
    const notes = readNotesFromFile();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    if (title !== undefined) notes[idx].title = title;
    if (body !== undefined) notes[idx].body = body;
    if (favorite !== undefined) notes[idx].favorite = favorite;
    if (color !== undefined) notes[idx].color = color;
    notes[idx].updatedAt = new Date().toISOString();
    writeNotesToFile(notes);
    return notes[idx];
  }

  // PUBLIC_INTERFACE
  deleteNote(id) {
    /** Delete a note by its ID */
    let notes = readNotesFromFile();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) return false;
    notes.splice(idx, 1);
    writeNotesToFile(notes);
    return true;
  }
}

module.exports = new NoteService();
