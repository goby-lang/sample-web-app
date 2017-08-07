import React from 'react'
import ListItem from './app/ListItem.jsx'
import ListForm from './app/ListForm.jsx'

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props)
    this.events = {
      CREATE_LIST_ITEM: 1,
      EDIT_LIST_ITEM: 2,
      UPDATE_LIST_ITEM: 3,
      DELETE_LIST_ITEM: 4
    };
    this.state = {
      listItems: [{ key: 1, content: 'Hello, welcome to Goby Lang', checked: false }]
    };
    this.handleCreateListItem = this.handleCreateListItem.bind(this);
  }

  handleCreateListItem(content) {
    this.action('CREATE_LIST_ITEM', content)
  }

  action(event, ...params) {
    switch(this.events[event]) {
      case this.events.CREATE_LIST_ITEM:
        const content = params[0]
        const listItems = this.state.listItems
        const nextRecordId = listItems[listItems.length - 1].key + 1
        listItems.push({ key: nextRecordId, content: content, checked: false })
        this.setState({ listItems: listItems })
        break

      case this.events.EDIT_LIST_ITEM:
        break

      case this.events.UPDATE_LIST_ITEM:
        break

      case this.events.DELETE_LIST_ITEM:
        break

      default:
        console.error(`Currently there are no such event called ${event}`)
    }
  }

  render() {
    const renderListItems = this.state.listItems.map((item) =>
      <ListItem
        key={item.key} id={item.key}
        checked={item.checked}
      >{item.content}</ListItem>
    )

    return (
      <div className="to-do-app">
        <ListForm createListItem={this.handleCreateListItem}/>
        <div className="list-group">
          {renderListItems}
        </div>
      </div>
    )
  }
}
