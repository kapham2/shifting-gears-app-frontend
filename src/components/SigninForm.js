import React from 'react'
import '../signin.css'

class SigninForm extends React.Component {

  componentDidMount() {
    localStorage.clear()
    this.props.updateActive("Sign in")
    document.getElementsByClassName("nav-link active")[0].classList.remove("active")
    document.getElementsByClassName("nav-link")[0].classList.add("active")
  }

  onSubmitForm = (e) => {
    e.preventDefault()

    let username
    let password

    if (e.target.querySelector('input')) {
      username = e.target.querySelector('input[name="username"]').value.toLowerCase()
      password = e.target.querySelector('input[name="password"]').value
    }

    switch(this.props.active) {
      case "Sign in":
        this.authenticate(username, password)
        break
      case "Sign up":
        this.signUp(username, password)
        break
      case "Sign in as Incognito":
        this.authenticate("incognito", "p@$$w0rd")
        break
      default:
        console.log("SigninForm: onSubmitForm => ERROR!")
        break
    }
  }

  authenticate = (username, password) => {
    console.log("authenticated!")
    fetch('https://shifting-gears-app-backend.herokuapp.com/api/v1/signin', {
      method: 'POST',
      headers: { 'Content-type' : 'application/json' },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        throw response
      }
    })
    .then(response => this.setUserAndRedirect(response))
    .catch(response => response.json().then(response => console.log(response)))
  }
      
  setUserAndRedirect = (response) => {
    this.props.updateUserId(response.user.id)
    localStorage.setItem('token', response.token)
    this.updateNav()
  }

  signUp = (username, password) => {
    console.log("signed up!")
    if (username.includes(" ") || /[~`!@#$%^&*()\-+={[}\]|\\:;"'<,>.?/]/g.test(username)) {
      console.log({error: "Username can't include special characters"})
    }
    else
    {
      fetch('https://shifting-gears-app-backend.herokuapp.com/api/v1/users', {
        method: 'POST',
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw response
        }
      })
      .then(response => this.setUserAndRedirect(response))
      .catch(response => response.json().then(response => console.log(response)))
    }
  }

  updateNav = () => {
    this.props.updateSignedIn()
    this.props.updateActive("Game")
    document.getElementsByClassName("nav-link active")[0].classList.remove("active")
    document.getElementsByClassName("nav-link")[0].classList.add("active")
  }

  render() {
    // console.log("SigninForm: this.props => ", this.props)
    const input = this.props.active === "Sign in as Incognito" 
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