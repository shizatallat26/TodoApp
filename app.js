var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function(data){
    // create li tag with text node
    var li = document.createElement('li')
    li.setAttribute("class", "text")
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)


    // create delete button
    var delBtn = document.createElement("button")
    var delText = document.createTextNode("DELETE")
    delBtn.setAttribute("id", data.val().key)
    delBtn.setAttribute("class", "btnDlt")
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText)

    // create edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT")
    editBtn.appendChild(editText)
    delBtn.setAttribute("class", "btnEdit")
    editBtn.setAttribute("id", data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")


    li.appendChild(delBtn)
    li.appendChild(editBtn)

    list.appendChild(li)

    todo_item.value = ""

});

function addTodo() {
    var todo = document.getElementById("todo-item");
    var database = firebase.database().ref('todos');
    var key = database.push().key;
    var todo_item = {
        value: todo.value,
        key: key
    }

    database.child(key).set(todo_item);
    todo.value = "";

}

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove()
    // e.id is a key
}

function editItem(e) {
  var val = prompt("Enter updated value",e.parentNode.firstChild.nodeValue);
  edit_todo = {
      value: val,
      key: e.id
  }
  firebase.database().ref("todos").child(e.id).set(edit_todo);
  e.parentNode.firstChild.nodeValue = val;
}

function deleteAll() {
    list.innerHTML = ""
}