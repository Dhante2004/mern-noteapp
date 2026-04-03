const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.use(protect);

router.route("/").post(createNote).get(getNotes);
router.route("/:id").put(updateNote).delete(deleteNote);

module.exports = router;