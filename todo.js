msgArr = []

const totalheaders = document.getElementById('totaltodo')
const todoheaders = document.getElementById('unchecktodo')

const msglist = document.getElementById('messages')

const id = (function(){
  let count = 0
  return {
    inc : function(){ count=count+1 },
    get : function(){ return count }
  }
})()



document.getElementById('addtodo').onclick = function(){
  const msg =  document.querySelector(".message").value

  if (msg !== ""){
    createTodo(msg)
  }
  else{
    alert("write some Todos...")
  }
}


// function for deletion of todo and toogleTodo
msglist.addEventListener('click', (e)=>{
  console.log(e.target.className)
  if ( e.target.className == "button"){
  let del_li = e.target.parentNode
  let del_id = del_li.id
  msgArr = msgArr.filter(todo =>{
    return todo.id != del_id
  })
  e.target.parentNode.remove()
  updateheader()
  undonetodo()
  }
  else if (e.target.className == "checkbox"){
    undonetodo()
  }
})

// function for creation of todo
function createTodo(msg){
  id.inc()
  let li = document.createElement('li')
  li.setAttribute('id', id.get())

  const span = document.createElement('span')
  span.innerHTML = msg

  const button = document.createElement('button')
  button.setAttribute('class', 'button')
  const text = document.createTextNode('Delete')
  button.appendChild(text)

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('class', 'checkbox')
  checkbox.checked = false

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(button)

  msgArr.push(li)
  msglist.appendChild(li)
  updateheader()
  undonetodo()
  document.querySelector(".message").value= ""
}

// function for update total headers
function updateheader(){
    totalheaders.innerHTML = msgArr.length
}

// function for update undone todos
function undonetodo(){
  tempArr = msgArr.filter(todo => {
    return !todo.childNodes[0].checked
  })
  todoheaders.innerHTML = tempArr.length
  delete tempArr
}
