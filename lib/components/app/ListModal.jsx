import React from 'react'

export default class ListModal extends React.Component {
  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
  }

  open() {
    this.refs.wrapper.className = 'list-modal-wrapper open'
  }

  close() {
    this.refs.wrapper.className = 'list-modal-wrapper'
  }

  handleConfirmDelete(id) {
    this.props.confirmDelete(this.props.modalId)
  }

  handleCloseModal() {
    this.close()
  }

  render() {
    return (
      <div ref="wrapper" className="list-modal-wrapper">
        <div className="list-modal">
          <h2>Are You Sure?</h2>
          <p>You are going to delete the item</p>
          <h3>{this.props.modalContent}</h3>
          <div className="list-modal-btn-group">
            <button id="modal-confirm" onClick={this.handleConfirmDelete.bind(this)}>Yes</button>
            <button id="modal-cancel" onClick={this.handleCloseModal.bind(this)}>No</button>
          </div>
        </div>
      </div>
    )
  }
}
