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
