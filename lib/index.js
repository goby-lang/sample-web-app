import React from 'react'
import ReactDOM from 'react-dom'
import ToDoList from './components/App.jsx'
import $ from 'jquery'

$(document).ready(function() {
  ReactDOM.render(
    <ToDoList />,
    document.getElementById('app')
  )
})
