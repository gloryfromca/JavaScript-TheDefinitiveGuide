var state, ui;

function newState() {
    newstate = {
        n: Math.floor(99 * Math.random()) + 1,
        low: 0,
        high: 100,
        guessnum: 0,
        guess: undefined,
    };
    return newstate;
}

function newUi() {
    newui = {
        heading: null,
        prompt: null,
        input: null,
        low: null,
        mid: null,
        high: null
    };
    for (var id in newui) newui[id] = document.getElementById(id);
    return newui;
}

function saveState(state) {
    history.pushState(state, "", "#guess" + state.guessnum);
}


function onLoad() {
    console.log("on Load!");
    ui = newUi();
    ui.input.onchange = handleGuess;
    if (history.state) {
        state = history.state;
    } else {
        state = newState();
        history.replaceState(state, "", "#guess" + state.guessnum);
    }
    display(state);
}

function onPopstate(event) {
    console.log("on Popstate!");
    if (event.state) {
        state = event.state;
        display(state);
    } else {
        throw "Something Wrong!"
    }
}


function newGame() {
    state = newState();
    saveState(state);
    display(state);
}


function handleGuess() {
    var g = parseInt(this.value);
    if ((g > state.low) && (g < state.high)) {
        if (g < state.n) state.low = g;
        else if (g > state.n) state.high = g;
        state.guess = g;
        state.guessnum++;
        saveState(state);
        display(state);
    } else {
        alert("Guess out of range!");
    }
}

function display() {
    ui.heading.innerHTML = document.title = "I'm  thinking of a number between " + state.low + " and " + state.high;

    ui.low.width = state.low + "%";
    ui.mid.width = (state.high - state.low) + "%";
    ui.high.width = (100 - state.high) + "%";

    ui.input.style.visibility = "visible";
    ui.input.value = "";
    ui.input.focus();

    if (state.guess === undefined) {
        ui.prompt.innerHTML = "Type your guess and hit Enter:";
    } else if (state.guess < state.n) {
        ui.prompt.innerHTML = state.guess + " is too low. Guess again: ";
    } else if (state.guess > state.n) {
        ui.prompt.innerHTML = state.guess + " is too high. Guess again: ";
    } else {
        ui.input.style.visibility = "hidden";
        ui.heading.innerHTML = document.title = state.guess + " is correct! ";
        ui.prompt.innerHTML = "You Win! <button onclick='newGame()'>Play Again</button>";
    }
}

window.onload = onLoad;
window.onpopstate = onPopstate;
