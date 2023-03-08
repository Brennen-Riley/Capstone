let rounds = []
let globalId = 0

module.exports = {
    getAllRounds(req, res) {
        res.status(200).send(rounds)
    },
    createRound(req, res) {
        const { location, holes, score, rating } = req.body

        if (!location || !holes || !score || !rating){
            return res.status(400).send("Invalid request.")
        }

        let newRound = {
            id: globalId,
            location,
            holes,
            score,
            rating
        }
        rounds.push(newRound)
        res.status(200).send(rounds)
        globalId++
    },
    deleteRound(req, res) {
        const { id } = req.params;
        rounds = rounds.filter((round) => round.id !== parseInt(id, 10));
        res.status(200).send(rounds);
    },
    updateRating(req, res) {
        const id = parseInt(req.params.id, 10)
        const { type } = req.body
        const hasRoundID = rounds.map(round => round.id).includes(id)

        if(!hasRoundID) {
            return res.status(400).send("Round id does not exist.")
        }
        rounds = rounds.map((round) => {
            if(round.id === id){
                if(type === 'minus') {
                    const newRating = round.rating - 1

                    if(newRating >= 0) {
                        round.rating = newRating
                    }
                } else if(type === 'plus') {
                    const newRating = round.rating + 1

                    if(newRating < 6) {
                        round.rating = newRating
                    }
                }
            }
            return round
        })
        res.status(200).send(rounds)
    }
};