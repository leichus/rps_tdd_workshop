import React from 'react';
import ReactDOM from "react-dom";
import RPSApp from "./RPSApp";
import { Requests } from "rps";
import RoundRepoFake from "../../rps/src/roundRepoFake";

const domFixture = document.createElement('div');
domFixture.id = 'reactApp';
document.querySelector('body').appendChild(domFixture);


ReactDOM.render(
    <RPSApp requests={new Requests(new RoundRepoFake)}/>, domFixture
);
