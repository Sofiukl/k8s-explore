require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || "80";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render("visitor", { title: "Home", greetServiceUrl: process.env.GREET_EXT_SERVICE });
});


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});