import React from 'react'

var errorTimeoutID = null

export default class ListForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCreateListItemEvent(event) {
    event.preventDefault()
    const input = this.refs['item-content']
    this.validates(input.value,
      /* Input success */
      () => {
        this.props.createListItem(input.value)
      },
      /* Input Error */
      (error) => {
        input.setAttribute('placeholder', error)
        input.className = 'error'
        if (errorTimeoutID) window.clearTimeout(errorTimeoutID)
        errorTimeoutID = setTimeout(() => {
          input.setAttribute('placeholder', '')
          errorTimeoutID = null
          input.className = ''
        }, 3000)
      }
    )

    input.value = ''
  }

  validates(value, success, error) {
    if (value === '') {
      error('Title cannot be empty!')
    } else if (/\"/.test(value) || /\\/.test(value)) {
      error('Wrong title format!')
    } else if (value.length > 40) {
      error('Maximum length: 40 characters')
    } else {
      success()
    }
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
