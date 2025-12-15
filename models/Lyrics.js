const mongoose = require("mongoose");

const lyricSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
})
const Lyric = mongoose.model("Lyric", lyricSchema)
module.exports = Lyric