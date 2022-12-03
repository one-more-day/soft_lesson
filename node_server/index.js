const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { storage, port } = require("./config");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const upload = multer({ storage });
app.post("/fileupload", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.json({ result: req.file });
});

app.listen(port, () => {
  console.log("listing 8888");
});
