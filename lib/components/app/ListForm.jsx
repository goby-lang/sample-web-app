import React from 'react'

export default class ListForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCreateListItemEvent(event) {
    event.preventDefault()
    const input = this.refs['item-content']
    this.props.createListItem(input.value)
    input.value = ''
  }

  render() {
    return (
      <div className="list-form">
        <input ref="item-content" id="item-content" />
        <button onClick={this.handleCreateListItemEvent.bind(this)}>
          <img src="/icon/plus-sign-light.png" alt="plus-sign"/>
        </button>
      </div>
    )
  }
}
