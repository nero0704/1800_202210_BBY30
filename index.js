// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// Static folders
/* Apparently, these are not required as we have the version of cloud storage,
 * however since we do not need the hosted version of the app, we decided to go with
 * 1537 way.
 */
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function(req, res) {
  const doc = fs.readFileSync("./public/html/main.html", "utf8");
  res.send(doc);
});

app.get("/search", function(req, res) {
  const doc = fs.readFileSync("./public/html/search.html", "utf8");
  res.send(doc);
});

// Shows navbar.
app.get("/nav", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  const doc = fs.readFileSync("./public/data/footer.html", "utf8");
  res.send(doc);
});

app.get("/login", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/login.html", "utf8"));
});

app.get("/signup", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/signup.html", "utf8"));
});

// Gets the overlay when a new user signs up.
app.get("/new", function(req, res) {
  const formatOfResponse = req.query["format"];

  if (formatOfResponse == "countries") {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("./public/data/countries-overlay.html", "utf8"));
  } else if (formatOfResponse == "snacks") {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("./public/data/snacks-overlay.html", "utf8"));
  } else {
    res.send({ status: "fail", msg: "Wrong format!" });
  }
});

app.get("/card", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/card.html", "utf8"));
});

app.get("/account", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/account.html", "utf8"));
});

app.get("/editProfile", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/editProfile.html", "utf8"));
});

app.get("/request", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/request.html", "utf8"));
});

app.get("/requestForm", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/requestForm.html", "utf8"));
});


app.get("/requestSuccess", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./public/html/requestSuccess.html", "utf8"));
});

let port = 8000;
app.listen(port, function() {
  console.log("Example app listening on port " + port + "!");
});