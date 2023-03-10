const roundContainer = document.querySelector("#round-container")
const form = document.querySelector('form')

const baseURL = `http://localhost:3000/api/rounds`

const roundCallback = ({ data: rounds }) => displayRounds(rounds)
const errCallback = err => console.log(err)

const getAllRounds = () => axios.get(baseURL).then(roundCallback).catch(errCallback)
const createRound = body => axios.post(baseURL, body).then(roundCallback).catch(errCallback)
const deleteRound = id => axios.delete(`${baseURL}/${id}`).then(roundCallback).catch(errCallback)
const updateRating = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(roundCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let location = document.querySelector('#location')
    let holes = document.querySelector('#holes')
    let score = document.querySelector('#score')
    let date = document.querySelector('#date')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let bodyObj = {
        location: location.value,
        holes: holes.value,
        score: score.value,
        date: date.value,
        rating: rating.value
    }
    createRound(bodyObj)
    location.value = ''
    holes.value = ''
    score.value = ''
    date.value = ''
    rating.checked = false 
}

function createRoundCard(round) {
    if(!round){
        return 
    }
    const roundCard = document.createElement('div')
    roundCard.classList.add('round-card')

    roundCard.innerHTML = `
    <p class="round-location">${round.location}</p>
    <p class="num-holes">Played: ${round.holes} Holes</p>
    <p class="round-score">Shot: ${round.score}</p>
    <p class="round-date">Date: ${round.date}</p>
    <div class="btns-container">
        <button onclick="updateRating(${round.id}, 'minus')">-</button>
        <p class="round-rating">${round.rating} stars</p>
        <button onclick="updateRating(${round.id}, 'plus')">+</button>
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

const signUPBtn = document.querySelector("#sign-up");
let input = document.querySelector("input");
const signUpForm = document.querySelector(".enter-email");
const footer = document.querySelector("footer");

function emailSubmitHandle(){
    const message = document.createElement("p")
    message.textContent = "Thank you for signing up! " + input.value;
    signUpForm.remove()
    footer.appendChild(message)
}

signUPBtn.addEventListener("click", emailSubmitHandle)