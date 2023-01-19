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

app.post("/convert-mp3", async (req, res) => {
    const userInput = req.body.videoId;
    videoID = (userInput.slice(userInput.indexOf("=") + 1, userInput.indexOf("&")));

    if (userInput == undefined ||
        userInput == "" ||
        userInput == null)  
    {
        return res.render("index", {success : false, error_message : "Please enter a video link"})
    }

    else { 
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": process.env.API_HOST
            }
        });
        const fetchResponse = await fetchAPI.json();
        if (fetchResponse.status == "ok") {
            return res.render("index", {success : true, song_title: fetchResponse.title, song_link : fetchResponse.link})}
        else {
            return res.render("index", {success: false, message : fetchResponse.msg})
        }
    }
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

})