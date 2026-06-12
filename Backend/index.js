import express from "express";
import cors from "cors";
import "./db.js";
import stdModel from "./studentModel.js"

var app = express();
app.use(express.json());
app.use(cors());
app.get("/a", (req, res) => {
    res.send("Hello from Server upper");
});
// api to add student data to db
app.post("/students", async (req, res) => {
  try {
    await stdModel(req.body).save();
    res.send("Student Data added");
  } catch (error) {
    console.log(error);
  }
});



// api to get all data from the collection
app.get("/students", async (req, res) => {
  try {
    var data = await stdModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


// api to delete data from the collection
app.delete("/students/:id", async (req, res) => {
  try {
    await stdModel.findByIdAndDelete(req.params.id);
    res.send("data deleted");
  } catch (error) {
    console.log(error);
  }
});

// to update the data from the collection
app.put("/students/:id", async (req, res) => {
  try {
    await stdModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Data updated")
  } catch (error) {
    console.log(error)
  }
});
var port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running in ${port}`);
});