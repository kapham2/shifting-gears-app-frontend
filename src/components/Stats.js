import React from 'react'

class Stats extends React.Component {

  constructor() {
    super()

    this._isMounted = false

    this.state = { stats: [] }
  }

  componentDidMount() {
    this._isMounted = true
    fetch('http://localhost:3333/api/v1/games/top-10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(response => this._isMounted ? this.setState({ stats: response }) : null)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    let rank = 0

    return (
      <div>
        <table className="table table-sm table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">(m)</th>
              <th scope="col">(m/s)</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.stats.map((stat) => {
                rank = rank + 1
                return (
                  <tr key={stat.id}>
                    <th scope="row">{rank}</th>
                    <td>{stat.user.username}</td>
                    <td>{stat.distance}</td>
                    <td>{stat.avg_velocity}</td>
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