import React from 'react'
import '../cover.css'
import SigninForm from './SigninForm'
import Game from './Game'
import Stats from './Stats'

class CoverContainer extends React.Component {

  state = {
    active: "Sign in",
    signedIn: false
  }

  onClickNav = (e) => {
    const newActive = e.target
    const oldActive = document.getElementsByClassName("nav-link active")[0]
    
    if (newActive !== oldActive) {
      oldActive.classList.remove("active")
      newActive.classList.add("active")
      this.updateActive(newActive.getAttribute("name"))
    }
  }

  updateActive = (newActive) => {
    this.setState({ active: newActive })
  }

  updateSignedIn = () => {
    this.setState({ signedIn: !this.state.signedIn })
  }

  onClickLogout = (e) => {
    this.updateSignedIn()
    this.updateActive("Sign in")
    document.getElementsByClassName("nav-link active")[0].classList.remove("active")
    document.getElementsByClassName("nav-link")[0].classList.add("active")
  }

  render() {
    // console.log("CoverContainer: this.state => ", this.state)
    const nav = !this.state.signedIn
      ? (
        <nav className="nav nav-masthead justify-content-center">
          <div className="nav-link active" name="Sign in" onClick={this.onClickNav}>Sign in</div>
          <div className="nav-link" name="Sign up" onClick={this.onClickNav}>Sign up</div>
          <div className="nav-link" name="Use Incognito Mode" onClick={this.onClickNav}>Incognito</div>
        </nav>
      )
      : (
        <nav className="nav nav-masthead justify-content-center">
          <div className="nav-link active" name="Game" onClick={this.onClickNav}>Game</div>
          <div className="nav-link" name="Stats" onClick={this.onClickNav}>Stats</div>
          <div className="nav-link" name="Log out" onClick={this.onClickNav}>Log out</div>
        </nav>
      )

      const main_content = !this.state.signedIn
      ? <SigninForm active={this.state.active} updateSignedIn={this.updateSignedIn} updateActive={this.updateActive} />
      : this.state.active === "Game" ? <Game /> : <Stats />

    return (
      <div className="cover-container d-flex w-100 h-100 p-2 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h4 className="masthead-brand">
              <img className="img-icon" src="/icon.png" alt="" /> Shifting Gears
            </h4>
            { nav }
          </div>
        </header>

        <div className="d-flex justify-content-center">
          <main role="main" className="inner cover">
            { main_content }
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