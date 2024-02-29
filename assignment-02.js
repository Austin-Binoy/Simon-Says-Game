
let order = [];   //order of the light
let playerOrder = [];    //order of the player
let flash;   //number of flashes
let turn;    //number of turns
let good;   //if player is right
let compTurn;   //computer's turn
let intervalId;    //setInterval
let on = false;    //if the game is on
let win;    //if the player wins

const turnCounter = document.querySelector("#score");
const topLeft = document.querySelector("#shape one");
const topRight = document.querySelector("#shape two");
const bottomRight = document.querySelector("#shape three");
const bottomLeft = document.querySelector("#shape four");
const HighestScore = document.querySelector("#highscore");
const startButton = document.querySelector("#start");













co/*
nst topLeft = document.querySelector(".one");
const topRight = document.querySelector(".two");
const bottomLeft = document.querySelector(".four");
const bottomRight = document.querySelector(".three");

const sequence = [topLeft, topRight, bottomLeft, bottomRight];

const flash = panel => {
    return new Promise((resolve, reject) => {
        panel.classList.add('active');
            setTimeout(() => {
                panel.classList.remove('active');
            resolve();
        }, 500);
    });
};


const main = async () => {
    for (const panel of sequence){
        await flash(panel);
    }
};

main();

*/

