import React from 'react';
import { connect } from './../state/provider'

function updater(update) {
    return (e) => {
        const T = parseInt(e.target.value, 10);
        e.preventDefault();
        if (T > -1) {
            update({ T });
        }
    }
}

function Config({ state, updateState }) {
    return (
        <form className="space-s">
            <label className="label">
                <span>T:</span>
                <input type="number" placeholder="T" value={state.T} onChange={updater(updateState)}/>
            </label>
        </form>
    );
}

export default connect(Config);