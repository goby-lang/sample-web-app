import React from 'react'
import ReactDOM from 'react-dom'
import ToDoList from './components/App.jsx'

window.addEventListener('load', function() {
  ReactDOM.render(
    <ToDoList />,
    document.getElementById('app')
  )
})
