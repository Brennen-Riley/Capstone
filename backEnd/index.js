const express = require('express')
const cors = require('cors')
const golfController = require("./controller")
const PORT = 3000
const app = express()
const fs = require("node:fs")
const path = require('node:path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "../frontEnd")))

app.post("/api/rounds", golfController.createRound);
app.get("/api/rounds", golfController.getAllRounds);
app.delete("/api/rounds/:id", golfController.deleteRound);
app.put("/api/rounds/:id", golfController.updateRating);

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))