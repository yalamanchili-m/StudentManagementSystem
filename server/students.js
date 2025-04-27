const express = require('express');
const router = express.Router();
const Student = require('./student');

// POST /students - Add a new student
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    course: req.body.course,
    year: req.body.year
  });
  try {
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /students - Fetch all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /students/:id - Fetch a student by ID
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// PUT /students/:id - Update student information
router.put('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.age != null) {
    res.student.age = req.body.age;
  }
  if (req.body.course != null) {
    res.student.course = req.body.course;
  }
  if (req.body.year != null) {
    res.student.year = req.body.year;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /students/:id - Delete a student
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: 'Deleted Student' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get student by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
}

module.exports = router;
