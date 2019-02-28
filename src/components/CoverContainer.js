import React from 'react'
import '../cover.css'
import SigninForm from './SigninForm'

class Cover extends React.Component {
  render() {
    return (
      <div className="cover-container d-flex w-100 h-100 p-2 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h4 className="masthead-brand">
              <img className="img-icon" src="/icon.png" alt="" /> Shifting Gears
            </h4>
            <nav className="nav nav-masthead justify-content-center">
              <div className="nav-link active">Sign in</div>
              <div className="nav-link">Sign up</div>
              <div className="nav-link">Incognito</div>

            </nav>
          </div>
        </header>

        <div className="d-flex justify-content-center">
          <main role="main" className="inner cover">
            <SigninForm />
          </main>
        </div>

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>Photo by Tim Foster on Unsplash | App by Kim Pham</p>
          </div>
        </footer>
      </div>    
    )
  }
}

export default Cover