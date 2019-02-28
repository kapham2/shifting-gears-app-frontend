import React from 'react'

class Cover extends React.Component {
  render() {
    return (
      <div className="cover-container d-flex w-100 h-100 p-2 mx-auto flex-column">
        <header className="masthead mb-auto shadow-sm">
          <div className="inner">
            <h4 className="masthead-brand">
              <img className="img-icon" src="/icon.png" alt="" /> Shifting Gears
            </h4>
            <nav className="nav nav-masthead justify-content-center">
              <div className="nav-link active">Login</div>
              <div className="nav-link">Sign up</div>
              <div className="nav-link">Incognito</div>

            </nav>
          </div>
        </header>

        <main role="main" className="inner cover shadow-sm rounded">
          <h4 className="cover-heading">Please login</h4>
          <p className="lead cover-lead">[username]</p>
          <p className="lead cover-lead">[password]</p>
          <div className="btn btn-secondary shadow-sm">Login</div>
        </main>

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>
            Photo by Tim Foster on Unsplash | App by Kim Pham
            </p>
          </div>
        </footer>
      </div>    
    )
  }
}

export default Cover