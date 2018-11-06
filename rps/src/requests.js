const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const VALID_THROWS = [ROCK, PAPER, SCISSORS];

class Requests {
    play(p1Throw, p2Throw, observer) {

        observer = new Observer();

        if (!(VALID_THROWS.includes(p1Throw) && VALID_THROWS.includes(p2Throw))) {
            observer.invalid();
        } else if (p1Throw === p2Throw) {
            observer.tie();
        } else if (
            (p1Throw === SCISSORS && p2Throw === ROCK) ||
            (p1Throw === ROCK && p2Throw === PAPER) ||
            (p1Throw === PAPER && p2Throw === SCISSORS)) {
            observer.p2Wins();
        } else {
            observer.p1Wins();
        }
    }
}

class Observer {
    constructor() {

    }

    p1Wins() {

    }

    p2Wins() {

    }

    tie() {

    }

    invalid() {

    }
}
