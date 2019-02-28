import React from 'react'
import '../cover.css'
import SigninForm from './SigninForm'

class CoverContainer extends React.Component {

  state = {
    active: "Sign in"
  }

  onClickUpdateActive = (e) => {
    const newActive = e.target
    const oldActive = document.getElementsByClassName("nav-link active")[0]
    
    if (newActive !== oldActive) {
      oldActive.classList.remove("active")
      newActive.classList.add("active")
      this.setState({
          active: e.target.getAttribute("name")
      })
    }
  }

  render() {
    // console.log("CoverContainer: this.state => ", this.state)
    return (
      <div className="cover-container d-flex w-100 h-100 p-2 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h4 className="masthead-brand">
              <img className="img-icon" src="/icon.png" alt="" /> Shifting Gears
            </h4>
            <nav className="nav nav-masthead justify-content-center">
              <div className="nav-link active" name="Sign in" onClick={this.onClickUpdateActive} >Sign in</div>
              <div className="nav-link" name="Sign up" onClick={this.onClickUpdateActive}>Sign up</div>
              <div className="nav-link" name="Use Incognito Mode" onClick={this.onClickUpdateActive}>Incognito</div>
            </nav>
          </div>
        </header>

        <div className="d-flex justify-content-center">
          <main role="main" className="inner cover">
            <SigninForm active={this.state.active} />
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

export default CoverContainer