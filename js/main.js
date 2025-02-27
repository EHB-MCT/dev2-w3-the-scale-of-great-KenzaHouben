import {
    getAdjectives
} from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
    // TODO 1: JSON inladen
    const adjObject = getAdjectives();
    // TODO 2: JSON object maken
    adjectives = JSON.parse(adjObject);
    console.log(adjectives);
    // TODO 3: Call render
    render(adjectives);
    // TODO 4: Call addSortEvents
    addSortEvents(adjectives);

}

function addSortEvents() {

}

function addVoteEvents() {

}

function sort() {

}

function render() {
    console.log(adjectives);
    // TODO 3.1: add HTML to HTML string forEach adjective in adjectives
    const sjabloon = document.querySelector('.word-list');
    sjabloon.innerHTML = "";
    let HTML = "";

    // TODO 3.2: add class based on score (>= 6 is 'good')
    let classScore = "";




    adjectives.forEach(function (bv) {
        HTML += `
         <div class="word-item">
            <span class="word-score bad">${bv.score}</span>
            <span>${bv.word}</span>
            <div class="vote-buttons">
                <button value="ok" class="upvote-button">👍</button>
                <button value="ok" class="downvote-button">👎</button>
            </div>
        </div>
        `
    });
    HTML += "</div>"
    sjabloon.innerHTML = HTML;

    // TODO 3.3: HTML string toevoegen aan container
}

function upVote(target) {

}


function downVote(target) {

}

function updateScore(word, scoreChange) {
    const foundIndex = adjectives.findIndex(function (item, index) {
        if (item.word == word) {
            return true
        }
    });

    if (foundIndex != null) {
        let newScore = adjectives[foundIndex]['score'] + scoreChange;
        adjectives[foundIndex]['score'] = Math.round(newScore * 100) / 100;
    }
}

init();