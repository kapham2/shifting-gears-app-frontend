import React from 'react'
import '../signin.css'

class SigninForm extends React.Component {

  onSubmitForm = (e) => {
    e.preventDefault()
  }

  render() {
    // console.log("SigninForm: this.props => ", this.props)
    const input = this.props.active === "Use Incognito Mode" 
      ? "" 
      : (
        <div>
          <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autoFocus />
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
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