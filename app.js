// import packages
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

//server port number
const PORT = process.env.PORT || 3000;

//template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/", (req, res) => {
    
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

})