const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];

app.get("/", (req, res) => res.send("Backend running"));

app.get("/notes", (req, res) => {
  res.json({ notes });
});

app.post("/notes", (req, res) => {
  const { title, body } = req.body;
  if (!title) return res.status(400).json({ error: "title required" });

  const note = { id: Date.now(), title, body: body || "" };
  notes.push(note);

  res.status(201).json({ message: "Note added", note });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
