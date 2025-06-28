const noteService = require('../services/note');

// PUBLIC_INTERFACE
class NoteController {
  /** 
   * List Notes (with optional search/filter)
   * Query params:
   *   - search: text query (title/body)
   *   - favorite: 'true' or 'false'
   *   - userId: restrict to a user (optional)
   */
  async list(req, res) {
    const { search, favorite, userId } = req.query;
    const filter = {};
    if (favorite !== undefined) filter.favorite = favorite === 'true';
    if (userId) filter.userId = userId;
    const notes = noteService.getAllNotes(filter, search || '');
    res.json(notes);
  }

  /** Create Note */
  async create(req, res) {
    const { title, body, favorite, color, userId } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const note = noteService.createNote({
      title: title.trim(),
      body: body || '',
      favorite: !!favorite,
      color: color || '',
      userId: userId || null,
    });
    res.status(201).json(note);
  }

  /** Get Note by ID */
  async get(req, res) {
    const { id } = req.params;
    const note = noteService.getNoteById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  }

  /** Update Note */
  async update(req, res) {
    const { id } = req.params;
    const { title, body, favorite, color } = req.body;
    const updated = noteService.updateNote(id, { title, body, favorite, color });
    if (!updated) return res.status(404).json({ error: 'Note not found' });
    res.json(updated);
  }

  /** Delete Note */
  async remove(req, res) {
    const { id } = req.params;
    const ok = noteService.deleteNote(id);
    if (!ok) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send();
  }
}

module.exports = new NoteController();
