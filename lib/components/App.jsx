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
      EDIT_LIST_ITEM: 5, 
      DELETE_LIST_ITEM: 6
    }
    this.state = { listItems: [] }
  }

  componentDidMount() {
    this.getAllItems()
    
    /* Update in Every 5 Seconds */
    // setInterval(() => this.getAllItems(), 5000)
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

  handleEditContent(params) {
    this.action('EDIT_LIST_ITEM', params.id, params.content)
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
            listItems.unshift({ key: id, content: content, checked: checked })        
            this.setState({ listItems: listItems })
          }
        })
        break

      case this.events.CHECK_LIST_ITEM:
        var id = params[0]
        var listItem = this.getItem(id)
        axios.put(`items/${id}/check`).then((response) => {
          listItems[listItems.indexOf(listItem)].checked = true
          this.setState({ listItems: listItems })
        })
        break

      case this.events.UNCHECK_LIST_ITEM:
        var id = params[0]
        var listItem = this.getItem(id)
        axios.put(`items/${id}/uncheck`, { id: id }).then((response) => {
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

      case this.events.EDIT_LIST_ITEM:
        var id = params[0]
        var content = params[1]
        var listItem = this.getItem(id)
        axios.put(`items/${id}`, { title: content }).then((response) => {
          listItems[listItems.indexOf(listItem)].content = content
          this.setState({ listItems: listItems })
          this.refs[`list-item-${id}`].closeEditForm()
        })
        break

      case this.events.DELETE_LIST_ITEM:
        var id = params[0]
        var listItem = this.getItem(id)
        axios.delete(`items/${id}`).then((response) => {
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
      let result = response.data.result;
      for (let item of result) {
        items.push({ key: item.id, content: item.title, checked: item.checked })
      }
      this.setState({ listItems: items })
    })
  }

  render() {
    const renderListItems = this.state.listItems.map((item) =>
      <ListItem
        key={item.key} id={item.key} ref={`list-item-${item.key}`}
        checked={item.checked}
        checkEvent={this.handleCheckEvent.bind(this)}
        openModal={this.handleOpenModal.bind(this)}
        editContent={this.handleEditContent.bind(this)}
      >{item.content}</ListItem>
    )

    return (
      <div className="to-do-app">
        <ListForm
          createListItem={this.handleCreateListItem.bind(this)}
          ref="form"
        />
        <ListModal
          ref="modal"
          modalId={this.state.modal ? this.state.modal.id : 0}
          modalContent={this.state.modal ? this.state.modal.content : ''}
          confirmDelete={this.handleDeleteItem.bind(this)}
        />
        <div className="list-group">
          {renderListItems}
        </div>
      </div>
    )
  }
}
