import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StateProvider extends Component {
    state = {
        T: 4
    };

    updateState = (newState) => this.setState(newState);

    getChildContext() {
        return { state: this.state, updateState: this.updateState };
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