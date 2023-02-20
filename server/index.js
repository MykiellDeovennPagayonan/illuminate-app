const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ClassesModel = require("./models/Classes");
const PORT = 7000

mongoose.connect(
  "mongodb+srv://Sibato:mykiell5153@cluster0.6f5p0xq.mongodb.net/illuminate?retryWrites=true&w=majority"
);

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/getClasses", (req, res) => {
  ClassesModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createClass", async (req, res) => {
  const user = req.body;
  const newUser = new ClassesModel(user);
  await newUser.save();

  res.json(user);
});

app.put("/updateClass/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    const updatedClass = req.body;
    const result = await ClassesModel.findByIdAndUpdate(classId, updatedClass, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/deleteClass/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    const result = await ClassesModel.findByIdAndDelete(classId);
    if (result === null) {
      res.status(404).json({ error: "Class not found" });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("listening to port " + PORT);
});