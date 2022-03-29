// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function(req, res) {
  let doc = fs.readFileSync("./app/html/main.html", "utf8");
  res.send(doc);
});

app.get("/search", function(req, res) {
  let doc = fs.readFileSync("./app/html/search.html", "utf8");
  res.send(doc);
});

app.get("/nav", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./app/data/footer.html", "utf8"));
})

app.get("/login", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./app/html/login.html", "utf8"));
})

app.get("/new", function(req, res) {

  let formatOfResponse = req.query["format"];

  if (formatOfResponse == "countries") {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("./app/data/countries-overlay.html", "utf8"));

  } else if (formatOfResponse == "snacks") {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("./app/data/snacks-overlay.html", "utf8"));

  } else {
    res.send({ status: "fail", msg: "Wrong format!" });
  }

});

app.get("/test", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./app/html/test.html", "utf8"));
});

app.get("/account", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./app/html/account.html", "utf8"));
});

app.get("/editProfile", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./app/html/editProfile.html", "utf8"));
});

app.get("/request", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./app/html/request.html", "utf8"));
});

app.get("/requestSuccess", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("./app/html/requestSuccess.html", "utf8"));
});

// RUN SERVER
let port = 8000;
app.listen(port, function() {
  console.log("Example app listening on port " + port + "!");
});