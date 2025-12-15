const express = require("express")
const router = express.Router()
const axios = require("axios")

const LyricEntry = require("../models/Lyrics");

router.get("/", (req, res) => {
    res.render('index');
});

router.post("/lyrics", async (req, res) => {
    const title = (req.body.title || "").trim();
    const artist = (req.body.artist || "").trim();

    if(!artist || !title){
        res.status(404);
        return res.render("result", {error: "Need to enter both title & artist", entry: null});
    }

    try{
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const response = await axios.get(url);
        const lyrics = response.data.lyrics;
        if (!lyrics){
            return res.status(404).render("results", {error: "Lyrics not found.", entry: null});
        }

        const entry = await LyricEntry.create({artist, title, lyrics});
        res.render("result", {error: null, entry});
    } catch (err) {
        res.status(err.response.status)
        res.render("result", {
            error: MessageChannel,
            entry: null
        });
    }
});

router.get("/history", async (req, res) => {
    const entries = await LyricEntry.find().sort({createdAt: -1})
    res.render("history", {entries});
});

router.get("/history/:id", async (req,res)=>{
    const entry = await LyricEntry.findById(req.params.id);
    if(!entry) return res.status(404).send("Not found");
    res.render("entry", {entry});
})

router.post("/history/clear", async(req, res) =>{
    await LyricEntry.deleteMany({});
    res.redirect("history")
});

module.exports = router;

