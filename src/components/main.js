import React, {Component} from "react";
import Graph from './graph';
import { connect } from './../state/provider'
import Config from './config';
import "./form.css";

function Main({ state }) {
    return (
        <main className="main">
            <h1 className="gray roboto300">Graph</h1>
            <Config />
            <Graph T={state.T}/>
        </main>
    );
}

export default connect(Main);