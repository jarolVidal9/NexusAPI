const express = require("express");
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote ,getArchivedNotes} = require("../../controllers/note/note.controller");


router.get("/", getNotes);
router.post("/", createNote);
router.put("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);
router.get("/archived", getArchivedNotes);

module.exports = router;