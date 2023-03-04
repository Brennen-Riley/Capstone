let rounds = []

let nextAvailableID = rounds.length = 1;

module.exports = {
    getAllRounds(req, res) {
        res.status(200).send(rounds)
    },
    createRound(req, res) {
        const { location, holes, score, rating } = req.body

        if (!location || !holes || !score || !rating){
            return res.status(400).send("Invalid request.")
        }

        const newRound = {
            id: nextAvailableID,
            location,
            holes,
            score,
            rating
        }
        rounds.push(newRound)
        nextAvailableID += 1
        res.status(200).send(rounds)
    },
    deleteRound(req, res) {
        const { id } = req.params;
        console.log(id);
        rounds = rounds.filter((round) => round.id !== parseInt(id, 10));
        res.status(200).send(rounds);
    },
    // updateRating(req, res) {
    //     const id = parseInt(req.params.id, 10)
    //     const { type } = req.body
    //     const hasRoundID = rounds.map(round => round.id).includes(id)

    //     if(!hasRoundID) {
    //         return res.status(400).send("Round id does not exist.")
    //     }
    //     rounds = rounds.map((round) => {
    //         if(round.id === id){
    //             if(type === 'minus') {
    //                 const newRating = round.rating - 1

    //                 if(newRating > 0) {
    //                     round.rating = newRating
    //                 }
    //             } else if(type === 'plus') {
    //                 const newRating = round.rating + 1

    //                 if(newRating < 6) {
    //                     round.rating = newRating
    //                 }
    //             }
    //         }
    //         return round
    //     })
    //     res.status(200).send(rounds)
    // },
}