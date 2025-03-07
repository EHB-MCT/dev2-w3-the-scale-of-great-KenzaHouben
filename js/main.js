import {
    getAdjectives
} from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
    // TODO: get adjectives from API
    fetch('https://dev2-prima.onrender.com/adjectives')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            adjectives = data;
            // We roepen deze functies hier in, omdat JavaScript altijd gehaast is
            // TODO: Call render
            render(adjectives);
            // TODO: Call addSortEvents
            addSortEvents(adjectives);
        })
    console.log(adjectives);
}

function addSortEvents() {
    document.querySelector('#sort-up').addEventListener('click', function () {
        console.log("hi");
        sortDirection = "up";
        // TODO: Call sort
        // We roepen sort(); hier nog eens om individueel up of down te sorteren
        sort(adjectives);
        // console.log(adjectives);
    });

    document.querySelector('#sort-down').addEventListener('click', function () {
        console.log("bye");
        sortDirection = "down";
        // TODO: Call sort
        // We roepen sort(); hier nog eens om individueel up of down te sorteren
        sort(adjectives);
        // console.log(adjectives);
    });
}

function addVoteEvents() {
    const upVoteButtons = document.querySelectorAll('.upvote-button');
    upVoteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            console.log(event.target.value);
            //updateScore(event.target.value, 0.1);
            upVote(event.target);
        });
    });

    const downVoteButtons = document.querySelectorAll('.downvote-button');
    downVoteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            console.log(event.target.value);
            //updateScore(event.target.value, -0.1);
            downVote(event.target);
        });
    });
}

function sort() {
    // TODO: check active sort (default: up)
    // We gebruiken een if else om zo de scores te kunnen sorteren
    // Dit doen we door sortDirection te vergelijken met "up" en "down"
    if (sortDirection == "up") {
        adjectives = adjectives.sort(function (a, b) {
            // TODO: sort
            // < -> voor sort up
            if (a.score < b.score) {
                return 1
            } else {
                return -1
            }
        })
    } else if (sortDirection == "down") {
        adjectives = adjectives.sort(function (a, b) {
            // TODO: sort
            // > -> voor sort down
            if (a.score > b.score) {
                return 1
            } else {
                return -1
            }
        })
    }
    // TODO: render
    // We zetten dit beneden zodat de scores ook gesorteerd worden
    render();
}

function render() {
    // TODO: add HTML to HTML string forEach adjective in adjectives
    const sjabloon = document.querySelector('#container');
    sjabloon.innerHTML = "";
    let HTML = "";

    // bv staat voor bijvoeglijk naamwoord hier
    adjectives.forEach(function (bv) {

        // TODO: add class based on score (>= 6 is 'good')
        let classScore = "";
        // Alle woorden die 6 of hoger zijn dan 6 zijn "good". De rest is "bad"
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
                <button value=${bv.word} class="upvote-button">👍</button>
                <button value=${bv.word} class="downvote-button">👎</button>
            </div>
        </div>
        `
    });
    // TODO: HTML string toevoegen aan container
    // Data in string verwerken
    HTML += "</div>"
    sjabloon.innerHTML = HTML;

    // We zetten addVoteEvents hier, omdat we eerst nog alles moeten renderen
    addVoteEvents();
}

function upVote(target) {
    // updateScore(target.value, 0.1);
    // TODO: upvote via API
    console.log("Upvote", target.value)
    fetch(`https://dev2-prima.onrender.com/upvote/${target.value}`)
        .then(function () {
            console.log('upvote klaar');
            init();
        })
}

function downVote(target) {
    // updateScore(target.value, -0.1);
    // TODO: downvote via API
    fetch(`https://dev2-prima.onrender.com/downvote/${target.value}`)
        .then(function () {
            console.log('downvote klaar');
            init();
        })
}

function updateScore(word, scoreChange) {
    // Wat is findIndex? retourneert de index (positie) van het eerste element dat een test doorstaat
    const foundIndex = adjectives.findIndex(function (item, index) {
        // item.word == word -> als we het woord terugvinden dan returnen we true
        if (item.word == word) {
            return true
        }
    });

    // we vergelijken foundIndex met null (null is leeg)
    if (foundIndex != null) {
        let newScore = adjectives[foundIndex]['score'] + scoreChange;
        adjectives[foundIndex]['score'] = Math.round(newScore * 100) / 100;
    }

    // We roepen render(); op om de score nog eens te updaten en zo de juiste update te weergeven
    render();
}

init();