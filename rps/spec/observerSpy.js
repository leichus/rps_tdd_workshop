export class ObserverSpy {
    constructor() {
        this.p1WinsWasCalled = false;
        this.tieWasCalled = false;
        this.p2WinsWasCalled = false;
        this.invalidWasCalled = false;
        this.callCounter = 0;
    }

    p1Wins() {
        this.p1WinsWasCalled = true;
        this.callCounter++;
    }

    p2Wins() {
        this.p2WinsWasCalled = true;
        this.callCounter++;
    }

    tie() {
        this.tieWasCalled = true;
        this.callCounter++;
    }

    invalid() {
        this.invalidWasCalled = true;
        this.callCounter++;
    }
}