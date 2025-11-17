const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

let students = [];

app.get("/", (req, res) => res.send("Student Info Backend Running"));

app.get("/students", (req, res) => {
  res.json({ students });
});

app.post("/students", (req, res) => {
  const { name, rollNo, universityId, bloodGroup, address, year, department } =
    req.body;

  if (!name || !rollNo || !universityId || !year || !department) {
    return res
      .status(400)
      .json({
        error:
          "Missing required fields: name, rollNo, universityId, year, department",
      });
  }

  const newStudent = {
    id: Date.now(),
    name,
    rollNo,
    universityId,
    bloodGroup,
    address: address || "",
    year,
    department,
  };

  students.push(newStudent);

  console.log("Added new student:", newStudent);
  res.status(201).json({ message: "Student added", student: newStudent });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
