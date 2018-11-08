const list = document.getElementById('list');
const show = document.getElementById('show-panel')
let allBooks = []
let allUsers = []
let currentUser;
populateUsers();
displayList();
list.addEventListener('click',(e)=>{
  if (e.target.localName === 'li'){
    //first find in array
    let curBook = allBooks.find(book=>book.id == e.target.dataset.id)
    //then DOM
    show.innerHTML = showBook(curBook)
  }
})
show.addEventListener('click',(e)=>{
  if (e.target.localName === 'button'){
    //first find in array
    let curBook2 = allBooks.find(book=>book.id == e.target.dataset.id)
    curBook2.users.push({"id":1,"username":"pouros"})
    //then fetch
    console.log(curBook2.id);
    console.log(curBook2.users);

    fetch(`http://localhost:3000/books/${curBook2.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        users: curBook2.users
      })
    })
    .then(resp=>resp.json())
    .then((json)=>{
      console.log(json);
      show.innerHTML = showBook(json)
    })
  }
})
function displayList(){
  fetch("http://localhost:3000/books")
  .then(res=>res.json())
  .then((json)=>{
    list.innerHTML += renderBooks(json)
    allBooks = json
  })
}
function renderBooks(arr){
  return arr.map((bookObj)=>{return renderSingleBook(bookObj)}).join('')
}
function renderSingleBook(obj){
  return `<li data-id = ${obj.id}>${obj.title}</li>`
}
function showBook(book){
   return `<h2>${book.title}</h2> <img src="${book.img_url}"> <p>${book.description}</p> <ul>${usersInList(book)}</ul> <button data-id="${book.id}"> Like Button </button>`
}
function usersInList(book){
  return book.users.map((user)=>`<li>${user.username}</li>`).join('')
}
function populateUsers(){
  fetch("http://localhost:3000/users")
  .then(res=>res.json())
  .then((json)=>{
    allUsers = json
    currentUser = json[0]
  })
}
