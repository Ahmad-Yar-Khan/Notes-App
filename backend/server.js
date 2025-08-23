const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 3000;

const NotesRouter = require("./routes/NotesRouter");
const LoginRouter = require("./routes/LoginRouter");

app.use("/api/notes", NotesRouter);
app.use("/auth", LoginRouter);

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});
