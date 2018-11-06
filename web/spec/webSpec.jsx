import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import ReactDOM from 'react-dom';
import RPSApp from '../src/RPSApp.jsx';
import * as sinon from 'sinon';

const expect = chai.expect;
chai.use(sinonChai);

describe('play form', function () {
    let domFixture;

    beforeEach(setupDOM);
    afterEach(cleanupDOM);

    it('tells the user that Player 1 Wins! when the Request modules says that p1Wins', () => {
        renderApp({
            play: (p1, p2, observer) => {
                observer.p1Wins();
            }
        });

        expect(page()).not.to.contain("Player 1 Wins!");

        submitForm();

        expect(page()).to.contain("Player 1 Wins!");

    });

    it('tells the user that Player 2 Wins! when the Request modules says that p2Wins', () => {
        renderApp({
            play: (p1, p2, observer) => {
                observer.p2Wins();
            }
        });

        expect(page()).not.to.contain("Player 2 Wins!");

        submitForm();

        expect(page()).to.contain("Player 2 Wins!");

    });

    it('tells the user Tie! when the Request modules says that it\'s a tie', () => {
        renderApp({
            play: (p1, p2, observer) => {
                observer.tie();
            }
        });

        expect(page()).not.to.contain("Tie!");

        submitForm();

        expect(page()).to.contain("Tie!");

    });

    it('tells the user that it\'s Invalid Entry! when the Request modules says that it\'s invalid', () => {
        renderApp({
            play: (p1, p2, observer) => {
                observer.invalid();
            }
        });

        expect(page()).not.to.contain("Invalid Entry!");

        submitForm();

        expect(page()).to.contain("Invalid Entry!");

    });

    it('passes the inputs typed in through to the rps machine', () => {
        const playSpy = {
            play: sinon.spy()
        };
        renderApp(playSpy);

        expect(playSpy.play).not.to.have.been.calledWith("rock", "paper");

        play("rock", "paper");

        expect(playSpy.play).to.have.been.calledWith("rock", "paper");
    });

    it('clears the result after an input is changed', () => {
        renderApp({
            play: (p1, p2, observer) => {
                observer.p2Wins();
            }
        });

        play("rock", "paper");
        expect(page()).to.contain("Player 2 Wins!");
        setInputValue("p1Throw", "");
        expect(page()).not.to.contain("Player 2 Wins!")
    });

    it('clears the second input after the first input is changed and result exists', () => {
        renderApp({
            play: (p1, p2, observer) => {
                observer.p2Wins();
            }
        });

        play("rock", "paper");
        expect(page()).to.contain("Player 2 Wins!");
        setInputValue("p1Throw", "");
        expect(document.querySelector("#p2Throw").value).to.be.empty;
    });

    function setupDOM() {
        domFixture = document.createElement("div");
        document.querySelector("body").appendChild(domFixture);
    }

    function cleanupDOM() {
        domFixture.remove();
    }

    function renderApp(requests) {
        ReactDOM.render(<RPSApp requests={requests}/>, domFixture);
    }

    function submitForm() {
        document.querySelector("#playButton").click();
    }

    function play(p1, p2) {
        setInputValue("p1Throw", p1);
        setInputValue("p2Throw", p2);
        submitForm();
    }

    function setInputValue(id, value) {
        const input = document.getElementById(id);
        const lastValue = input.value;

        input.value = value;

        // react 16 hack
        let tracker = input._valueTracker;
        if (tracker) tracker.setValue(lastValue);

        input.dispatchEvent(new Event('input', {'bubbles': true, 'cancelable': true}));
    }

    function page() {
        return document.body.innerText;
    }
});
