import React, {Component} from "react";
import Graph from './graph';
import "./form.css";

class Main extends Component {
    state = {T: 4};

    updateState = (values) => {
        this.setState({...this.state, ...values});
    };

    render() {
        return (
            <main className="main">
                <h1 className="gray roboto300">Graph</h1>
                <Config config={this.state} update={this.updateState}/>
                <Graph T={this.state.T}/>
            </main>
        );
    }
}

function updater(update) {
    return (e) => {
        const T = parseInt(e.target.value, 10);
        e.preventDefault();
        if (T > -1) {
            update({ T });
        }
    }
}
function Config({config, update}) {
    return (
        <form className="space-s">
            <label className="label">
                <span>T:</span>
                <input type="number" placeholder="T" value={config.T}
                       onChange={updater(update)}/>
            </label>
        </form>
    );
}



export default Main;