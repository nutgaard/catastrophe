import React from 'react';
import { connect } from './../state/provider'
import './config.css';

function updater(update, propName, minVal, maxVal) {
    return (e) => {
        const val = parseFloat(e.target.value, 10);
        e.preventDefault();
        if (val >= minVal && val <= maxVal) {
            update({ [propName]: val });
        }
    }
}

function Config({ state, updateState }) {
    return (
        <form className="config space-s">
            <label className="label">
                <span>T:</span>
                <input type="number" placeholder="T" value={state.T} onChange={updater(updateState, 'T', 0, 49)}/>
            </label>

            <label className="label">
                <span>c:</span>
                <input type="number" placeholder="c" value={state.c} onChange={updater(updateState, 'c', 0, 100)} />
            </label>
            <label className="label">
                <span>p:</span>
                <input type="number" step="0.01" placeholder="p" value={state.p} onChange={updater(updateState, 'p', 0, 1)} />
            </label>
        </form>
    );
}

export default connect(Config);