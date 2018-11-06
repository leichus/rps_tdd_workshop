import { expect } from 'chai';
import {PAPER, ROCK} from "../src/constants";
import Round from "../src/round";

describe("round", () => {
    it("should have p1Throw, p2Throw, and result", () => {
        const round = new Round(ROCK, PAPER, "p2Wins");

        expect(round.p1Throw).to.equal("rock");
        expect(round.p2Throw).to.equal("paper");
        expect(round.result).to.equal("p2Wins");
    });
});