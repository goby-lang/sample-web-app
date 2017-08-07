import React from 'react'

export default class ListForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleCreateListItemEvent = this.handleCreateListItemEvent.bind(this)
  }

  handleCreateListItemEvent(event) {
    event.preventDefault()
    const textarea = this.refs['item-content']
    this.props.createListItem(textarea.value)
    textarea.value = ''
  }

  render() {
    return (
      <div className="list-footer">
        <textarea ref="item-content" id="item-content" cols="30" rows="10"></textarea><br/>
        <button onClick={this.handleCreateListItemEvent}>Create List Item</button>
      </div>
    )
  }
}
