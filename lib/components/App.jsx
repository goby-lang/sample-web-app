import React from 'react'
import ListItem from './app/ListItem.jsx'
import ListForm from './app/ListForm.jsx'
import ListModal from './app/ListModal.jsx'
import axios from 'axios'

var errorTimeoutID = null

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props)
    this.events = {
      CREATE_LIST_ITEM: 1,
      CHECK_LIST_ITEM: 2,
      UNCHECK_LIST_ITEM: 3,
      OPEN_MODAL: 4,
      DELETE_LIST_ITEM: 5
    }
    this.state = {
      listItems: [] //{ key: 1, content: 'Hello, welcome to Goby Lang', checked: false }
    }
    this.handleCreateListItem = this.handleCreateListItem.bind(this)
    this.handleCheckEvent = this.handleCheckEvent.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
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

  handleOpenModal(id) {
    this.action('OPEN_MODAL', id)
  }

  handleDeleteItem(id) {
    this.action('DELETE_LIST_ITEM', id)
  }

  action(event, ...params) {
    const listItems = this.state.listItems
    switch(this.events[event]) {
      case this.events.CREATE_LIST_ITEM:
        const content = params[0]
        axios.post('items', { title: content, checked: 0 }).then((response) => {
          if (response.data.error) {
            var input = this.refs.form.refs['item-content']
            input.setAttribute('placeholder', response.data.error)
            if (errorTimeoutID) window.clearTimeout(errorTimeoutID)
            errorTimeoutID = setTimeout(() => {
              input.setAttribute('placeholder', '')
              errorTimeoutID = null
            }, 3000)
          } else {
            let { id: id, title: content, checked: checked } = response.data
            listItems.push({ key: id, content: content, checked: checked })        
            this.setState({ listItems: listItems })
          }
        })
        break

      case this.events.CHECK_LIST_ITEM:
        var id = params[0]
        var listItem = this.getItem(id)
        axios.put('item/check', { id: id }).then((response) => {
          listItems[listItems.indexOf(listItem)].checked = true
          this.setState({ listItems: listItems })
        })
        break

      case this.events.UNCHECK_LIST_ITEM:
        var id = params[0]
        var listItem = this.getItem(id)
        axios.put('item/uncheck', { id: id }).then((response) => {
          listItems[listItems.indexOf(listItem)].checked = false
          this.setState({ listItems: listItems })
        })
        break

      case this.events.OPEN_MODAL:
        var id = params[0]
        var listItem = this.getItem(id)
        this.setState({ modal: { id: id, content: listItem.content } })
        this.refs.modal.open()
        break

      case this.events.DELETE_LIST_ITEM:
        var id = params[0]
        var listItem = this.getItem(id)
        // TODO: Fix the DELETE Action
        // axios.delete('item', { id: id }).then((response) => {
        axios.post('item/delete', { id: id }).then((response) => {
          listItems.splice(listItems.indexOf(listItem), 1)
          this.refs.modal.close()
          this.setState({ listItems: listItems })
        })
        break

      default:
        console.error(`Currently there are no such event called ${event}`)
    }
  }

  getItem(id) {
    return this.state.listItems.filter((item) => item.key === id )[0]
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
        openModal={this.handleOpenModal}
      >{item.content}</ListItem>
    )

    return (
      <div className="to-do-app">
        <ListForm
          createListItem={this.handleCreateListItem}
          ref="form"
        />
        <ListModal
          ref="modal"
          modalId={this.state.modal ? this.state.modal.id : 0}
          modalContent={this.state.modal ? this.state.modal.content : ''}
          confirmDelete={this.handleDeleteItem}
        />
        <div className="list-group">
          {renderListItems}
        </div>
      </div>
    )
  }
}
