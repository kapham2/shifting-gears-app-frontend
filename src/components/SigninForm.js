import React from 'react'
import '../signin.css'

class SigninForm extends React.Component {
  render() {
    return(
      <form className="form-signin">
        <h5 className="mb-4">Please sign in</h5>
        <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autoFocus />
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <button className="btn btn-primary shadow-sm btn-block shadow-sm" type="submit">Sign in</button>
        <p className="mt-4 mb-3">Don't have an account? Sign up</p>
      </form>
    )
  }
}

export default SigninForm