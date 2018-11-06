import React from "react"

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            p1Input: "",
            p2Input: ""
        };

        this.onClick = this.onClick.bind(this);
        this.handleP1Change = this.handleP1Change.bind(this);
        this.handleP2Change = this.handleP2Change.bind(this);
    }

    p1Wins() {
        this.setState({
            result: "Player 1 Wins!"
        });
    }

    p2Wins() {
        this.setState({
            result: "Player 2 Wins!"
        });
    }

    tie() {
        this.setState({
            result: "Tie!"
        });
    }

    invalid() {
        this.setState({
            result: "Invalid Entry!"
        });
    }

    onClick() {
        this.props.requests.play(
            this.state.p1Input.toLowerCase(),
            this.state.p2Input.toLowerCase(),
            this
        );
    }

    handleP1Change(event) {
        if (this.state.result !== "") {
            this.setState({
                p2Input: ""
            });
        }

        this.setState({
            p1Input: event.target.value,
            result: ""
        });
    }

    handleP2Change(event) {
        if (this.state.result !== "") {
            this.setState({
                p1Input: ""
            });
        }

        this.setState({
            p2Input: event.target.value,
            result: ""
        });
    }

    render() {
        return (
            <div>
                <label>
                    Player 1 throw:
                    <input type='text' id='p1Throw' value={this.state.p1Input} onChange={this.handleP1Change}/>
                </label>
                <br/>
                <label>
                    Player 2 throw:
                    <input type='text' id='p2Throw' value={this.state.p2Input} onChange={this.handleP2Change}/>
                </label>
                <br/>
                <button id='playButton' onClick={this.onClick}>Play</button>
                <br/>
                {this.state.result}
            </div>
        );
    }
}