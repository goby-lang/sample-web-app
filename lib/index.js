import React from 'react'
import ReactDOM from 'react-dom'
import ToDoList from './components/App.jsx'
import axios from 'axios'
import hljs from 'highlight-lite'

const fileURL = file => `https://api.github.com/repos/goby-lang/sample-web-app/contents/examples/${file}.gb`
const styleURL = style => `/css/code-style/${style}.css`

const getCodeContent = dir => axios.get(fileURL(dir))

getCodeContent('server').then((response) => {
  let code = atob(response.data.content)
  const $codeBlock = document.getElementById('render-code')
  const $style = document.getElementById('code-style')

  $codeBlock.innerHTML = code
  hljs.highlightBlock($codeBlock)

  // Change Style
  // setTimeout(() => {
  //   $style.href = '/css/tomorrow-night-blue.css'
  // }, 5000)
})

window.addEventListener('load', function() {
  ReactDOM.render(
    <ToDoList />,
    document.getElementById('app')
  )
})
