/* eslint linebreak-style: ["error", "windows"] */
// https://expressjs.com/en/guide/routing.html


// REQUIRES
import express from "express";
const app = express();
app.use(express.json());
import fs from "fs";
import got from "got";
import { JSDOM } from "jsdom";


app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.get("/", function(req, res) {
  const URL = "https://storage.cloud.google.com/taste-of-home/public/html/main.html";
  got(URL).then(response => {
    const dom = new JSDOM(response.body);
    console.log(dom.window.document.querySelector("title").textContent);
    res.send(dom.serialize());
  }).catch(err => {
    console.log(err);
  })
});

app.get("/search", function(req, res) {
  const doc = fs.readFileSync("./public/html/search.html", "utf8");
  res.send(doc);
});

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