import React, { Component } from 'react';
import { connect } from './../state/provider'
import formula from './formula.PNG';

const pStyle = {
    backgroundImage: `url(${formula})`,
    backgroundRepeat: 'no-repeat',
    height: '5rem',
    backgroundPositionY: '1rem',
    backgroundBlendMode: 'darken',
    backgroundColor: '#f6f5f9'
};


class Aside extends Component {
    state = {
        result: null
    };

    componentDidMount() {
        this.props.state.damage.then((result) => this.setState({ result }));
    }

    componentWillReceiveProps(nProps) {
        nProps.state.damage.then((result) => this.setState({ result }));
    }

    render() {
        return (
            <aside className="aside">
                <h1 className="roboto300 gray">Aside</h1>

                <p className="space-m">
                    <span><b>Damage:</b> {this.state.result}</span>
                </p>
                <p style={pStyle}>
                    Calculated using:
                </p>
            </aside>
        );
    }
}

export default connect(Aside);