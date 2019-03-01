import React from 'react'
import '../signin.css'

class SigninForm extends React.Component {

  onSubmitForm = (e) => {
    e.preventDefault()

    let username
    let password

    if (e.target.querySelector('input')) {
      username = e.target.querySelector('input[name="username"]').value
      password = e.target.querySelector('input[name="password"]').value
    }

    switch(this.props.active) {
      case "Sign in":
        this.authenticate(username, password)
        break
      case "Sign up":
        this.signUp(username, password)
        break
      case "Use Incognito Mode":
        this.authenticate("incognito", "p@$$w0rd")
        break
      default:
        console.log("SigninForm: onSubmitForm => ERROR!")
        break
    }
  }

  authenticate = (username, password) => {
    console.log("authenticated!")
    this.updateNav()
  }

  signUp = (username, password) => {
    console.log("signed up!")
    this.updateNav()
  }

  updateNav = () => {
    this.props.updateSignedIn()
    this.props.updateActive("Game")
    document.getElementsByClassName("nav-link active")[0].classList.remove("active")
    document.getElementsByClassName("nav-link")[0].classList.add("active")
  }

  render() {
    // console.log("SigninForm: this.props => ", this.props)
    const input = this.props.active === "Use Incognito Mode" 
      ? "" 
      : (
        <div>
          <input type="text" id="inputUsername" className="form-control" placeholder="Username" name="username"required autoFocus />
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" required />
        </div>
        )

    return(
      <form className="form-signin" onSubmit={this.onSubmitForm}>
        { input }
        <button className="btn shadow-sm btn-block" type="submit">{this.props.active}</button>
      </form>
    )
  }
}

export default SigninForm