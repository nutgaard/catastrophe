import React from "react";
import Graph from './graph';
import { connect } from './../state/provider'
import Config from './config';
import "./form.css";

function Main({ state }) {
    return (
        <main className="main">
            <Config />
            <h1 className="gray roboto300">Graph</h1>
            <Graph T={state.T}/>
        </main>
    );
}

export default connect(Main);