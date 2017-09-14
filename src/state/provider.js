import React, {Component} from "react";
import PropTypes from "prop-types";

import pascal from "./../pascal";
import damagecalc from "./../damagecalc";

function calc({T, c, p}) {
    return pascal(T + 1).then((pascal) => damagecalc({T, c, p, pascal}));
}

function enrich(state) {
    return {
        ...state,
        damage: calc(state)
    }
}

class StateProvider extends Component {
    state = {
        T: 4,
        c: 5,
        p: 0.5,
        damage: null
    };

    updateState = (newState) => this.setState(newState);

    getChildContext() {
        return {state: enrich(this.state), updateState: this.updateState};
    }

    render() {
        return this.props.children;
    }
}
const context = {
    state: PropTypes.object,
    updateState: PropTypes.func
};

StateProvider.childContextTypes = context;

export function connect(WrappedComponent) {
    function Wrapper(props, context) {
        return <WrappedComponent {...props} {...context} />
    }

    Wrapper.contextTypes = context;
    Wrapper.displayName = `Connect(${WrappedComponent.displayName})`;

    return Wrapper;
}

export default StateProvider;