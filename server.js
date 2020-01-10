const express = require("express");
const path = require("path");
const fs = require("fs");
let db = require("./db/db.json")
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// api
app.get("/api/notes", (req, res) => {
    // fs.readFile("./db/db.json", (err,data)=>{
    //     res.json(data.toString())
    // }
    // )
    // console.log(db)
    res.json(db)
})


app.post("/api/notes", (req, res) => {
    req.body.id = db.length
    // console.log(req.body)
    db.push(req.body)
    // console.log(db)
    res.status(200)
        .send("successfuly added")
})

app.delete("/api/notes/:id", (req, res) => {
    db = db.filter(comment => {
        if (comment.id == req.params.id) {
            return false
        }
        else
            return true

    })
    console.log(db)
    res.status(200).send("succesfully removed")
})
// html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



app.listen(PORT, () => {
    console.log(`Listen on Port: ${PORT}`);
})