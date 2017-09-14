import React from 'react';
import ReactDOM from 'react-dom';
import Group from './components/group';
import Header from './components/header';
import Main from './components/main';
import Aside from './components/aside';
import Footer from './components/footer';
import './reset.css'
import './layout.css'
import './typography.css'
import './utils.css'
import './main.css'

import Webworker from './webworker';

const workerFn = (args) => {
    debugger;
    return args.map((i) => i * 2)
};

Webworker.exec(workerFn, [1, 2, 3])
    .then((res) => console.log('res', res));

function App() {
    return (
        <Group>
            <Header/>
            <Main/>
            <Aside/>
            <Footer/>
        </Group>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
