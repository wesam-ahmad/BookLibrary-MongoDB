const express = require("express");
const { getBooks, addBook, updateBook, softDeleteBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", softDeleteBook); 

module.exports = router;
