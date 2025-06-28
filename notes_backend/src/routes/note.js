const express = require('express');
const noteController = require('../controllers/note');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management & CRUD API
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get list of all notes
 *     description: Fetch all notes, with optional filtering or search query.
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for title/body
 *       - in: query
 *         name: favorite
 *         schema:
 *           type: boolean
 *         description: Filter only favorite notes (true/false)
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter notes by user
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get('/', noteController.list);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotePayload'
 *     responses:
 *       201:
 *         description: Note created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 */
router.post('/', noteController.create);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Not found
 */
router.get('/:id', noteController.get);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotePayload'
 *     responses:
 *       200:
 *         description: Updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Not found
 */
router.put('/:id', noteController.update);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Note deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', noteController.remove);

module.exports = router;
