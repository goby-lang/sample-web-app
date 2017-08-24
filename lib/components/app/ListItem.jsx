import React from 'react'
export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content: this.props.children }
  }

  closeEditForm() {
    document.getElementById(`list-item-edit-${this.props.id}`).checked = false
  }

  handleItemCheck(event) {
    this.props.checkEvent({
      id: this.props.id,
      check: this.props.checked
    })
  }

  handleEditContentChange(event) {
    this.setState({ content: event.target.value })
  }

  handleEditContent(event) {
    this.props.editContent({
      id: this.props.id,
      content: this.state.content
    })
  }

  handleHideEditForm(event) {
    this.closeEditForm()
  }

  handleDeleteItemClick(event) {
    this.props.openModal(this.props.id)
  }

  render() {
    const labelCheckId = `list-item-check-${this.props.id}`
    const labelEditId = `list-item-edit-${this.props.id}`
    return (
      <div className="list-item">
        <input
          type="checkbox"
          id={labelCheckId}
          className="list-item-check"
          checked={this.props.checked}
          onChange={this.handleItemCheck.bind(this)}
        />

        <input
          type="checkbox"
          id={labelEditId}
          className="list-item-edit"
        />

        <span id="content" ref="content">{this.props.children}</span>

        <span id="edit-form" ref="edit-form">
          <input
            ref="edit-content"
            type="text"
            name="edit-content"
            id="edit-content"
            value={this.state.content}
            onChange={this.handleEditContentChange.bind(this)}
          />
          <button id="confirm" onClick={this.handleEditContent.bind(this)}>OK</button>
          <button id="cancel" onClick={this.handleHideEditForm.bind(this)}>Cancel</button>
        </span>

        <div className="list-item-control">
          <label id="check-item" htmlFor={labelCheckId}>
            <svg id="list-item-check-icon" height="244.771px" viewBox="0 0 262.083 244.771" enableBackground="new 0 0 262.083 244.771">
            <g transform="translate(0,-952.36218)">
              <path fill="#333333" d="M122.927,952.363c-1.697,0-3.398,0.029-5.1,0.091c-9.069,0.339-18.204,1.705-27.137,4.098,C25.547,974.007-13.275,1041.3,4.18,1106.443s84.748,103.965,149.891,86.51c65.144-17.455,103.966-84.748,86.511-149.892,c-1.33-6.299-7.517-10.326-13.815-8.995c-6.299,1.33-10.326,7.516-8.995,13.814c0.085,0.403,0.191,0.8,0.317,1.191,c14.194,52.974-17.054,107.193-70.027,121.389c-52.974,14.193-107.193-17.055-121.388-70.028,C12.479,1047.458,43.727,993.239,96.7,979.044c28.937-7.753,59.85-1.99,84.052,15.663c5.2,3.804,12.5,2.672,16.304-2.528,c3.804-5.201,2.672-12.5-2.528-16.304c-0.008-0.006-0.017-0.012-0.024-0.018C173.491,960.53,148.398,952.469,122.927,952.363,L122.927,952.363z M249.869,961.015c-3.025,0.167-5.867,1.507-7.922,3.733c-30.725,32.146-92.131,98.565-126.215,134.501,l-40.979-36.152c-4.828-4.274-12.207-3.826-16.482,1.002c-4.274,4.828-3.826,12.207,1.002,16.482l0,0l49.538,43.711,c4.714,4.174,11.89,3.852,16.21-0.729c32.593-34.101,101.608-109.136,133.772-142.788c4.482-4.621,4.37-12.001-0.251-16.484,C256.229,962.047,253.09,960.86,249.869,961.015z"/>
            </g>
            </svg>
          </label>

          <label id="edit-btn" htmlFor={labelEditId}>
            <svg id="list-item-edit-icon" width="105.896px" height="105.767px" viewBox="0 0 105.896 105.767" enableBackground="new 0 0 105.896 105.767">
              <path fill="#333333" d="M101.868,11.976l-8.2-8.2c-5.035-5.035-13.234-5.035-18.269,0L10.377,68.941c-1.438,1.438-2.158,3.165-2.445,4.891 l-7.768,26.325c-0.432,1.583,0,3.165,1.151,4.316c0.863,0.863,1.87,1.294,3.021,1.294c0.432,0,0.863,0,1.294-0.144l26.469-7.769 c1.727-0.287,3.453-1.007,4.891-2.445l65.165-65.165c2.445-2.445,3.74-5.754,3.74-9.207 C105.752,17.73,104.313,14.421,101.868,11.976z M13.83,84.621l7.48,7.48l-10.501,3.165L13.83,84.621z M30.661,89.368L30.661,89.368 L16.419,75.126l0,0l53.369-53.369L84.03,35.999L30.661,89.368z M95.826,24.203l-5.61,5.61L75.974,15.572l5.61-5.61 c1.726-1.726,4.459-1.726,6.042,0l8.2,8.2C97.408,19.744,97.408,22.477,95.826,24.203z"/>
            </svg>
          </label>

          <button id="delete-btn" onClick={this.handleDeleteItemClick.bind(this)}>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    )
  }
}
