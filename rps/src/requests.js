import {ROCK, PAPER, SCISSORS, VALID_THROWS, INVALID_ENTRY, P2_WINS, P1_WINS, TIE} from "./constants";
import Round from "./round";

export class Requests {

    constructor(repo) {
        this.repo = repo;
    }

    play(p1Throw, p2Throw, observer) {
        let result = "";
        if (!(VALID_THROWS.includes(p1Throw) && VALID_THROWS.includes(p2Throw))) {
            observer.invalid();
            result = INVALID_ENTRY;
        } else if (p1Throw === p2Throw) {
            observer.tie();
            result = TIE;
        } else if (
            (p1Throw === SCISSORS && p2Throw === ROCK) ||
            (p1Throw === ROCK && p2Throw === PAPER) ||
            (p1Throw === PAPER && p2Throw === SCISSORS)) {
            observer.p2Wins();
            result = P2_WINS;
        } else {
            observer.p1Wins();
            result = P1_WINS;
        }

        this.repo.save(new Round(p1Throw, p2Throw, result));
    }

    getHistory(historyObserver) {

        if(this.repo.isEmpty() === true) {
            historyObserver.noRounds();
        }
        else {
            console.log(this.repo.getAll());
            historyObserver.rounds(this.repo.getAll());
        }
    }
}