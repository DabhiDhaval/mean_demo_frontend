// Purpose: Student CRUD Routes

const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/* 1. Create Student */
router.post("/add", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: "Student Added", student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/* 2. Get All Students */
router.get("/", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

/* 3. Get Student by ID */
router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
});

/* 4. Update Student */
router.put("/update/:id", async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json({ message: "Student Updated", student });
});

/* 5. Delete Student */
router.delete("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted" });
});

module.exports = router;