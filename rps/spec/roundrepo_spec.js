import { expect } from 'chai';

import { ROCK, PAPER, SCISSORS } from "../src/constants";
import { Requests } from "../src/requests";
import { ObserverSpy } from "./observerSpy";
import {historyObserverSpy} from "./historyObserverSpy";
import RoundRepo from "../src/roundRepo";
import RoundRepoFake from "../src/roundRepoFake";
import Round from "../src/round";

describe("round repo", () => {
    let roundRepo;

    beforeEach(function () {
        roundRepo = new RoundRepoFake();
    });

    it("should be empty when there are no rounds", () => {
        expect(roundRepo.isEmpty()).to.equal(true);
    });

    describe("when there are rounds", () => {
       it("should not be empty", () => {
           let round = new Round(PAPER, SCISSORS, "p2Wins");
           roundRepo.save(round);

           expect(roundRepo.isEmpty()).to.equal(false);
       });

        it("should get all rounds", () => {
            let round1 = new Round(PAPER, SCISSORS, "p2Wins");
            let round2 = new Round(ROCK, ROCK, "tie");

            roundRepo.save(round1);
            roundRepo.save(round2);

            expect(roundRepo.getAll()).to.have.lengthOf(2);
            expect(roundRepo.getAll()).to.contain(round1, round2);
        });
    });
});