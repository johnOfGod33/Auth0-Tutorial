const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  const isAuthenticated = false;
  const user = isAuthenticated
    ? { name: "Jean de Dieu", email: "jeandieu@example.com" }
    : null;
  res.render("index", { isAuthenticated, user });
});

app.listen(port, () => {
  console.log(`server runing on  http://localhost:${port}`);
});
