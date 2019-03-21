import React from 'react'

class Stats extends React.Component {

  constructor() {
    super()

    this._isMounted = false

    this.state = { 
      stats: [],
      myStats: [],
      statsAll: true
    }
  }

  componentDidMount() {
    this._isMounted = true
    fetch('https://shifting-gears-app-backend.herokuapp.com/api/v1/games/top-10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(response => this._isMounted ? this.setState({ stats: response }) : null)
    .then(
      fetch('https://shifting-gears-app-backend.herokuapp.com/api/v1/users/top-10-games', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(response => this._isMounted ? this.setState({ myStats: response }) : null)
    )
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onClickCheckbox = () => {
    this.setState({ 
      statsAll: !this.state.statsAll,
     })
  }

  render() {
    let rank = 0
    const stats = this.state.statsAll ? this.state.stats : this.state.myStats

    return (
      <div>
        <strong>{ this.state.statsAll ? "All Stats " : "My Stats " }</strong>
        <label className="switch">
          <input type="checkbox" onClick={this.onClickCheckbox} />
          <span className="slider round"></span>
        </label>
        <table className="table table-sm table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {
              stats.map((stat) => {
                rank = rank + 1
                return (
                  <tr key={stat.id}>
                    <th scope="row">{rank}</th>
                    <td>{stat.user.username}</td>
                    <td>{Math.round(stat.avg_velocity * 1000) / 1000}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Stats