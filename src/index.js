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

function pascal(height) {
    const rows = new Array(height);
    rows[0] = [1];
    rows[1] = [1, 1];

    for (let i = 2; i < height; i++) {
        const prevRow = rows[i - 1];
        const currentRow = [1];
        for (let j = 1; j < prevRow.length; j++) {
            currentRow.push(prevRow[j - 1] + prevRow[j]);
        }
        currentRow.push(1);
        rows[i] = currentRow;
    }

    return rows;
}

function damage({ T, c, p, pascal }) {
    let sum = 0;
    for (let k = 0; k <= T; k++) {
        for (let a = 1; a <= k; a++) {
            sum += pascal[T][k] * c * Math.pow(p, a);
        }
    }

    return sum;
}

console.time('calc');
console.time('pascal');
const pascalTriangle = Webworker.exec(pascal, 50)
    .then((res) => { console.timeEnd('pascal'); return res; });

const calcdamage = pascalTriangle.then((pascal) => Webworker.exec(damage, { T: 20, c: 1, p: 0.0001, pascal }))
    .then((res) => { console.log('res', res); console.timeEnd('calc')});

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
