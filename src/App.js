import React, { Component } from 'react';
import logo from './images/logo/white-small-v2.png';
import './App.css';
import './styles/index.css';
import './css/nav.css';
import './css/materialize.min.css';

class App extends Component {
  render() {
    return (
      

      // <div className="App">
        <nav className="transparent z-depth-0">
          <div className="nav-wrapper">
            <img id="icon" src={logo} className="App-logo" alt="logo" />
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down" id="topnav">
              <li><a href="/pictures/">Pictures</a></li>
              <li><a href="/paintings/">Paintings</a></li>
              <li><a href="/graphics/">Graphics</a></li>
              <li><a href="https://github.com/gavindaniel" target="_blank">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/gavin-daniel/" target="_blank">LinkedIn</a></li>
              <li><a href="/shop/">Shop</a></li>
            </ul>
          </div>
        </nav>

      

      
    );
  }
}

export default App;
