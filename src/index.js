import React from 'react';
import ReactDOM from 'react-dom';
import Group from './components/group';
import Header from './components/header';
import Main from './components/main';
import Aside from './components/aside';
import Footer from './components/footer';
import StateProvider from './state/provider';
import './reset.css'
import './layout.css'
import './typography.css'
import './utils.css'
import './main.css'

import pascal from './pascal';
import damagecalc from './damagecalc';

console.time('calc');
console.time('pascal');
const pascalTriangle = pascal(50)
    .then((res) => { console.timeEnd('pascal'); return res; });

const calcdamage = pascalTriangle.then((pascal) => damagecalc({T: 20, c: 1, p:0.0001, pascal}))
    .then((res) => { console.log('res', res); console.timeEnd('calc')});

function App() {
    return (
        <StateProvider>
            <Group>
                <Header/>
                <Main/>
                <Aside/>
                <Footer/>
            </Group>
        </StateProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
