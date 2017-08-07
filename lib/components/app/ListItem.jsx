import React from 'react'

export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleItemChange = this.handleItemChange.bind(this)
  }

  handleItemChange() {
    /* List item checked event */
  }

  render() {
    const labelId = `list-item-${this.props.id}`
    return (
      <div className="list-item">
        <input onChange={this.handleItemChange} type="checkbox" name="list-item" id={labelId} />
        <label htmlFor={labelId}>{this.props.children}</label>
      </div>
    )
  }
}
