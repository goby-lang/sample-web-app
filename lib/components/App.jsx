import React from 'react'
import ListItem from './app/ListItem.jsx'
import ListForm from './app/ListForm.jsx'
import $ from 'jquery'
import axios from 'axios'

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props)
    this.events = {
      CREATE_LIST_ITEM: 1,
      CHECK_LIST_ITEM: 2,
      UNCHECK_LIST_ITEM: 3,
      DELETE_LIST_ITEM: 4
    }
    this.state = {
      listItems: [] //{ key: 1, content: 'Hello, welcome to Goby Lang', checked: false }
    }
    this.handleCreateListItem = this.handleCreateListItem.bind(this)
    this.handleCheckEvent = this.handleCheckEvent.bind(this)
  }

  componentDidMount() {
    this.getAllItems()
    setInterval(() => this.getAllItems(), 5000)
  }

  handleCreateListItem(content) {
    this.action('CREATE_LIST_ITEM', content)
  }

  handleCheckEvent(status) {
    this.action(
      status.check ? 'UNCHECK_LIST_ITEM' : 'CHECK_LIST_ITEM',
      status.id
    )
  }

  action(event, ...params) {
    const listItems = this.state.listItems
    switch(this.events[event]) {
      case this.events.CREATE_LIST_ITEM:
        const content = params[0]
        axios.post('items', { title: content, checked: 0 }).then((response) => {
          let { id: id, title: content, checked: checked } = response.data
          listItems.push({ key: id, content: content, checked: checked })        
          this.setState({ listItems: listItems })
        })
        break

      case this.events.CHECK_LIST_ITEM:
        var id = params[0]
        var listItem = listItems.filter((item) => item.key === id )[0]
        axios.put('item/check', { id: id }).then((response) => {
          listItems[listItems.indexOf(listItem)].checked = true
          this.setState({ listItems: listItems })
        })
        break

      case this.events.UNCHECK_LIST_ITEM:
        var id = params[0]
        var listItem = listItems.filter((item) => item.key === id )[0]
        axios.put('item/uncheck', { id: id }).then((response) => {
          listItems[listItems.indexOf(listItem)].checked = false
          this.setState({ listItems: listItems })
        })
        break

      case this.events.DELETE_LIST_ITEM:
        break

      default:
        console.error(`Currently there are no such event called ${event}`)
    }
  }

  getAllItems() {
    axios.get('items').then((response) => {
      let items = []
      for (let item of response.data.result) {
        items.push({ key: item.id, content: item.title, checked: item.checked })
      }
      this.setState({ listItems: items })
    })
  }

  render() {
    const renderListItems = this.state.listItems.map((item) =>
      <ListItem
        key={item.key} id={item.key}
        checked={item.checked}
        checkEvent={this.handleCheckEvent}
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
