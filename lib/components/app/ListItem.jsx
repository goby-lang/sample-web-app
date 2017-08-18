import React from 'react'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleItemCheck = this.handleItemCheck.bind(this)
    this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this)
  }

  handleItemCheck(event) {
    this.props.checkEvent({
      id: this.props.id,
      check: this.props.checked
    })
  }

  handleDeleteItemClick(event) {
    this.props.openModal(this.props.id)
  }

  render() {
    const labelId = `list-item-${this.props.id}`
    return (
      <div className="list-item">
        <input
          type="checkbox"
          id={labelId}
          checked={this.props.checked}
          onChange={this.handleItemCheck}
        />
        <span>{this.props.children}</span>
        <div className="list-item-control">
          <label htmlFor={labelId}>
            <svg id="Layer_1" height="244.771px" viewBox="0 0 262.083 244.771" enableBackground="new 0 0 262.083 244.771">
            <g transform="translate(0,-952.36218)">
              <path fill="#333333" d="M122.927,952.363c-1.697,0-3.398,0.029-5.1,0.091c-9.069,0.339-18.204,1.705-27.137,4.098,C25.547,974.007-13.275,1041.3,4.18,1106.443s84.748,103.965,149.891,86.51c65.144-17.455,103.966-84.748,86.511-149.892,c-1.33-6.299-7.517-10.326-13.815-8.995c-6.299,1.33-10.326,7.516-8.995,13.814c0.085,0.403,0.191,0.8,0.317,1.191,c14.194,52.974-17.054,107.193-70.027,121.389c-52.974,14.193-107.193-17.055-121.388-70.028,C12.479,1047.458,43.727,993.239,96.7,979.044c28.937-7.753,59.85-1.99,84.052,15.663c5.2,3.804,12.5,2.672,16.304-2.528,c3.804-5.201,2.672-12.5-2.528-16.304c-0.008-0.006-0.017-0.012-0.024-0.018C173.491,960.53,148.398,952.469,122.927,952.363,L122.927,952.363z M249.869,961.015c-3.025,0.167-5.867,1.507-7.922,3.733c-30.725,32.146-92.131,98.565-126.215,134.501,l-40.979-36.152c-4.828-4.274-12.207-3.826-16.482,1.002c-4.274,4.828-3.826,12.207,1.002,16.482l0,0l49.538,43.711,c4.714,4.174,11.89,3.852,16.21-0.729c32.593-34.101,101.608-109.136,133.772-142.788c4.482-4.621,4.37-12.001-0.251-16.484,C256.229,962.047,253.09,960.86,249.869,961.015z"/>
            </g>
            </svg>
          </label>

          <button onClick={this.handleDeleteItemClick} id="delete-btn">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    )
  }
}