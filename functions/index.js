/* eslint linebreak-style: ["error", "windows"] */
// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

app.get("/", function(req, res) {
  const doc = fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/main.html", "utf8");
  res.send(doc);
});

app.get("/search", function(req, res) {
  const doc = fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/search.html", "utf8");
  res.send(doc);
});

app.get("/nav", function(req, res) {
  cors()(req, res, () => {
    res.setHeader("Content-Type", "text/html");
    const doc = fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/footer.html", "utf8");
    res.send(doc);
  });
});

app.get("/login", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/login.html", "utf8"));
});

app.get("/signup", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/signup.html", "utf8"));
});

app.get("/new", function(req, res) {
  const formatOfResponse = req.query["format"];

  if (formatOfResponse == "countries") {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/data/countries-overlay.html", "utf8"));
  } else if (formatOfResponse == "snacks") {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/data/snacks-overlay.html", "utf8"));
  } else {
    res.send({ status: "fail", msg: "Wrong format!" });
  }
});

app.get("/card", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/card.html", "utf8"));
});

app.get("/account", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/account.html", "utf8"));
});

app.get("/editProfile", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/editProfile.html", "utf8"));
});

app.get("/request", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/request.html", "utf8"));
});

app.get("/requestForm", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/requestForm.html", "utf8"));
});


app.get("/requestSuccess", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(fs.readFileSync("https://storage.cloud.google.com/taste-of-home/public/html/requestSuccess.html", "utf8"));
});

exports.app = functions.https.onRequest(app);