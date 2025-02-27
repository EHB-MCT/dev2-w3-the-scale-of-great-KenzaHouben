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
    // TODO 5: Call sort
    sort(adjectives);
}

function addSortEvents() {
    document.querySelector('#sort-up').addEventListener('click', function () {

    })
}

function addVoteEvents() {

}

function sort() {
    // TODO: check active sort (default: up)
    if (sortDirection == "up") {
        adjectives = adjectives.sort(function (a, b) {
            // TODO: sort
            if (a.score < b.score) {
                return 1
            } else {
                return -1
            }
        })
    } else if (sortDirection == "down") {
        adjectives = adjectives.sort(function (a, b) {
            // TODO: sort
            if (a.score > b.score) {
                return 1
            } else {
                return -1
            }
        })
    }
    // TODO: render
    render();
}

function render() {
    // TODO 3.1: add HTML to HTML string forEach adjective in adjectives
    const sjabloon = document.querySelector('#container');
    sjabloon.innerHTML = "";
    let HTML = "";

    adjectives.forEach(function (bv) {

        // TODO 3.2: add class based on score (>= 6 is 'good')
        let classScore = "";
        if (bv.score >= 6) {
            classScore = "good";
        } else {
            classScore = "bad";
        }

        HTML += `
         <div class="word-item">
            <span class="word-score ${classScore}">${bv.score}</span>
            <span>${bv.word}</span>
            <div class="vote-buttons">
                <button value="ok" class="upvote-button">👍</button>
                <button value="ok" class="downvote-button">👎</button>
            </div>
        </div>
        `
    });
    // Data in string verwerken
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