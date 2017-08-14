import React from 'react'
import ReactDOM from 'react-dom'
import ToDoList from './components/App.jsx'
import $ from 'jquery'

$(document).ready(function() {
  ReactDOM.render(
    <ToDoList />,
    document.getElementById('app')
  )

  /* Test Plain Text GET */
  setTimeout(() => {
    $.ajax({
      url: '/test_get',
      type: 'get',
      success: function(data) { console.log(data) },
      error: function(m) { console.log(m) }
    })
  }, 1000)

  /* Test JSON POST */
  setTimeout(() => {
    $.ajax({
      url: '/test_post_json',
      type: 'post',
      dataType: 'json',
      success: function(data) { console.log(data) },
      error: function(m) { console.log(m) }
    })
  }, 1000)
})
