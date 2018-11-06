import {expect} from 'chai';
import {ROCK, PAPER, SCISSORS, P1_WINS, P2_WINS, TIE, INVALID_ENTRY} from "../src/constants";
import {Requests} from "../src/requests";
import {ObserverSpy} from "./observerSpy";
import {historyObserverSpy} from "./historyObserverSpy";
import Round from "../src/round";
import RoundRepoFake from "../src/roundRepoFake";

describe("rps", () => {
    let requests;
    let observer;

    beforeEach(() => {
        const repo = new RoundRepoFake();
        requests = new Requests(repo);
        observer = new ObserverSpy();
    });

    it("should pass", () => {
        expect(true).to.equal(true);
    });

    it("should call p1Wins on the observer when rock is against scissors", () => {
        requests.play(ROCK, SCISSORS, observer);

        expect(observer.p1WinsWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call p1Wins on the observer when paper is against rock", () => {
        requests.play(PAPER, ROCK, observer);

        expect(observer.p1WinsWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call p1Wins on the observer when scissors is against paper", () => {
        requests.play(SCISSORS, PAPER, observer);

        expect(observer.p1WinsWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call tie on the observer when rock is against rock", () => {
        requests.play(ROCK, ROCK, observer);

        expect(observer.tieWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call tie on the observer when paper is against paper", () => {
        requests.play(PAPER, PAPER, observer);

        expect(observer.tieWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call tie on the observer when scissors is against scissors", () => {
        requests.play(SCISSORS, SCISSORS, observer);

        expect(observer.tieWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call p2Wins on the observer when rock is against paper", () => {
        requests.play(ROCK, PAPER, observer);

        expect(observer.p2WinsWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call p2Wins on the observer when paper is against scissors", () => {
        requests.play(PAPER, SCISSORS, observer);

        expect(observer.p2WinsWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call p2Wins on the observer when scissors is against rock", () => {
        requests.play(SCISSORS, ROCK, observer);

        expect(observer.p2WinsWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call invalid on the observer when p1Throw is invalid", () => {
        requests.play("scissor", ROCK, observer);

        expect(observer.invalidWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    it("should call invalid on the observer when p2Throw is invalid", () => {
        requests.play(SCISSORS, "something invalid", observer);

        expect(observer.invalidWasCalled).to.equal(true);
        expect(observer.callCounter).to.equal(1);
    });

    describe("history", () => {
        it('should inform history observer noRounds if no rounds have been played', function () {
            let historyObserver = new historyObserverSpy();

            requests.getHistory(historyObserver);

            expect(historyObserver.noRoundsWasCalled).to.equal(true);
            expect(historyObserver.historyCallCounter).to.equal(1);

        });
        it('should inform history observer of rounds if rounds have been played', function () {

            requests.play(ROCK, SCISSORS, observer);
            requests.play(ROCK, PAPER, observer);
            requests.play(PAPER, PAPER, observer);
            requests.play(PAPER, "sailboat", observer);

            let historyObserver = new historyObserverSpy();

            requests.getHistory(historyObserver);

            expect(historyObserver.roundsWasCalled).to.equal(true);

            expect(historyObserver.roundsWasCalledWith).to.have.deep.members(
                [
                    new Round(ROCK, SCISSORS, P1_WINS),
                    new Round(ROCK, PAPER, P2_WINS),
                    new Round(PAPER, PAPER, TIE),
                    new Round(PAPER, "sailboat", INVALID_ENTRY)
                ]
            );

            expect(historyObserver.roundsWasCalledWith).to.have.lengthOf(4);
            expect(historyObserver.noRoundsWasCalled).to.equal(false);
            expect(historyObserver.historyCallCounter).to.equal(1);

        });
    })
});