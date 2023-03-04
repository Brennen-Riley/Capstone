const roundContainer = document.querySelector("#round-container")
const form = document.querySelector('form')

const baseURL = `http://localhost:3000/api/rounds`
const roundCallback = ({ data: rounds }) => displayRounds(rounds)
const errCallback = err => console.log(err.response.data)

const getAllRounds = () => axios.get(baseURL).then(roundCallback).catch(errCallback)
const createRound = body => axios.post(baseURL, body).then(roundCallback).catch(errCallback)
const deleteRound = id => axios.delete(`${baseURL}/${id}`).then(roundCallback).catch(errCallback)
const updateRating = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(roundCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let location = document.querySelector('#location')
    let holes = document.querySelector('#holes')
    let score = document.querySelector('#score')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let bodyObj = {
        location: location.value,
        holes: holes.value,
        score: score.value,
        rating: rating.value
    }
    createRound(bodyObj)
    location.value = ''
    holes.value = ''
    score.value = ''
    rating.checked = false 
}

function createRoundCard(round) {
    const roundCard = document.createElement('div')
    roundCard.classList.add('round-card')

    roundCard.innerHTML = `<p class="round-location">${round.location}</p>
    <div class="btns-container">
        <button onclick="updateRound(${round.id}, 'minus')">-</button>
        <p class="round-rating">${round.rating} stars</p>
        <button onclick="updateRound(${round.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteRound(${round.id})">delete</button>
    `

    roundContainer.appendChild(roundCard)
}

function displayRounds (arr) {
    roundContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createRoundCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllRounds()