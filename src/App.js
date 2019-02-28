import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './cover.css'
import CoverContainer from './components/CoverContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <CoverContainer />
      </div>
    );
  }
}

export default App;
