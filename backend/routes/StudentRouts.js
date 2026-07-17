const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const {

getStudents,

createStudent,

updateStudent,

deleteStudent

} = require("../controllers/studentController");

router.get("/", auth, getStudents);

router.post("/", auth, createStudent);

router.put("/:id", auth, updateStudent);

router.delete("/:id", auth, deleteStudent);

module.exports = router;