const express = require("express");
const app = express();
const { auth } = require("express-openid-connect");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;

dotenv.config();

const { BASE_URL, CLIENT_ID, ISSUER_BASE_URL, SECRET } = process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `${BASE_URL}/${port}`,
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL,
  secret: SECRET,
};

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(auth(config));

app.get("/", (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  const user = isAuthenticated
    ? { name: "Jean de Dieu", email: "jeandieu@example.com" }
    : null;
  res.render("index", { isAuthenticated, user });
});

app.listen(port, () => {
  console.log(`server runing on  http://localhost:${port}`);
});
