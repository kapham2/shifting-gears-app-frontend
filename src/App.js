import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './cover.css'

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="masthead mb-auto shadow-sm rounded">
            <div className="inner">
              <h3 className="masthead-brand">
                <img className="img-icon" src="/icon.png" alt="" />
                Shifting Gears
              </h3>
              <nav className="nav nav-masthead justify-content-center">
                <div className="nav-link active">About</div>
                <div className="nav-link">Login</div>
                <div className="nav-link">Sign up</div>
              </nav>
            </div>
          </header>

          <main role="main" className="inner cover shadow-sm rounded">
            <h1 className="cover-heading">Instructions</h1>
            <p className="lead cover-lead">1.</p>
            <p className="lead cover-lead">2.</p>
            <div className="btn btn-lg btn-secondary">Play</div>
          </main>

          <footer className="mastfoot mt-auto">
            <div className="inner">
             <p>App by Kim Pham</p>
            </div>
          </footer>
        </div>

      </div>
    );
  }
}

export default App;
