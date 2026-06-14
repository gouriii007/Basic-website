import express from "express";
import cors from "cors";
import { dbReady } from "./db.js";
import stdModel from "./studentModel.js"
import {
  createStudent,
  deleteStudent,
  listStudents,
  updateStudent,
} from "./studentStore.js";

var app = express();
app.use(express.json());
app.use(cors());
app.get("/a", (req, res) => {
    res.send("Hello from Server upper");
});
// api to add student data to db
app.post("/students", async (req, res) => {
  try {
    const createdStudent = await createStudent({
      useMongo,
      studentModel: stdModel,
      studentData: req.body,
    });
    res.status(201).json({ message: "Student data added", student: createdStudent });
  } catch (error) {
    console.error("Failed to add student:", error);
    res.status(500).json({ message: "Failed to add student" });
  }
});



// api to get all data from the collection
app.get("/students", async (req, res) => {
  try {
    var data = await listStudents({
      useMongo,
      studentModel: stdModel,
    });
    res.json(data);
  } catch (error) {
    console.error("Failed to load students:", error);
    res.status(500).json({ message: "Failed to load students" });
  }
});


// api to delete data from the collection
app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await deleteStudent({
      useMongo,
      studentModel: stdModel,
      id: req.params.id,
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Data deleted" });
  } catch (error) {
    console.error("Failed to delete student:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
});

// to update the data from the collection
app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await updateStudent({
      useMongo,
      studentModel: stdModel,
      id: req.params.id,
      studentData: req.body,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Data updated", student: updatedStudent });
  } catch (error) {
    console.error("Failed to update student:", error);
    res.status(500).json({ message: "Failed to update student" });
  }
});
var port = process.env.PORT || 5000

let useMongo = false;

try {
  await dbReady;
  useMongo = true;
  console.log("MongoDB connected");
} catch (error) {
  console.warn("MongoDB unavailable, using local file storage:", error.message);
}

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});