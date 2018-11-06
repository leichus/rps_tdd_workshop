export class historyObserverSpy {
    constructor() {
        this.noRoundsWasCalled = false;
        this.roundsWasCalled = false;
        this.roundsWasCalledWith = [];
        this.historyCallCounter = 0;

    }

    noRounds() {
        this.noRoundsWasCalled = true;
        this.historyCallCounter++;
    }

    rounds(roundsArray) {
        this.roundsWasCalled = true;
        this.historyCallCounter++;
        this.roundsWasCalledWith = roundsArray;
    }
}