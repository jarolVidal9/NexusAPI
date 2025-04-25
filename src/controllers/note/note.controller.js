const Note = require('../../models/note/note.model');

const getNotes = async (req, res, next) => {
    try {
        const { id } = req.user;
        const notes = await Note.findAll({
            where: {
                userId: id,
                archived: false
            },
            order: [['pinned', 'DESC'], ['createdAt', 'DESC']]
        });
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

const getArchivedNotes = async (req, res, next) => {
    try {
        const { id } = req.user;
        const notes = await Note.findAll({
            where: {
                userId: id,
                archived: true
            },
            order: [['pinned', 'DESC'], ['createdAt', 'DESC']]
        });
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

const getNote = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { noteId } = req.params;
        const note = await Note.findOne({
            where: {
                id: noteId,
                userId: id
            }
        });
        if (!note) {
            return res.status(404).json({
                errors: [{ msg: 'Nota no encontrada' }]
            });
        }
        res.json(note);
    } catch (err) {
        next(err);
    }
}

const createNote = async (req, res, next) => {
    try {
        const { id } = req.user;
        const data = req.body;
        const note = await Note.create({
            ...data,
            userId: id
        });
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
}

const updateNote = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { noteId } = req.params;
        const data = req.body;
        const note = await Note.findOne({
            where: {
                id: noteId,
                userId: id
            }
        });
        if (!note) {
            return res.status(404).json({
                errors: [{ msg: 'Nota no encontrada' }]
            });
        }
        await note.update(data);
        res.json(note);
    } catch (err) {
        next(err);
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { noteId } = req.params;
        const note = await Note.findOne({
            where: {
                id: noteId,
                userId: id
            }
        });
        if (!note) {
            return res.status(404).json({
                errors: [{ msg: 'Nota no encontrada' }]
            });
        }
        await note.destroy();
        res.json(note);
    } catch (err) {
        next(err);
    }
}

const archiveNote = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { noteId } = req.params;
        const note = await Note.findOne({
            where: {
                id: noteId,
                userId: id
            }
        });
        if (!note) {
            return res.status(404).json({
                errors: [{ msg: 'Nota no encontrada' }]
            });
        }
        await note.update({ archived: !note.archived });
        res.json(note);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getNotes,
    getArchivedNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    archiveNote
}