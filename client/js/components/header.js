function renderHeader() {
  setHeaderHtml();
  renderHomePage()
}

let email = ''
let username = ''

function passback(newEmail, newName) {
  email = newEmail,
  username = newName
  console.log(email, username)
}

function setHeaderHtml() {
  const header = document.getElementById("header-nav");
  header.innerHTML = `
<h1> Bucket List </h1>
<div class="container">
<nav class="navbar navbar-expand-lg border-bottom border-bottom-dark">
<ul id="navlist" class="navbar-nav me-auto mb-2 mb-lg-0">

<li class="nav-item navbar-text" onClick="renderHomePage()">Home</li>
<li class="nav-item navbar-text" onClick="renderAbout()">About |</li>
<li class="nav-item navbar-text d-none" id="bucket-list" onClIck="renderBucketList(email)">Bucket List |</li>
<li class="nav-item navbar-text d-none" id="add-bucket-list" onClick="addBucketListForm(email)">Add Bucket List Item |</li>
<li class="nav-item navbar-text" onClick="chatGPTform()">ChatGPT</li>
</ul>
<ul id="navlist" class="navbar-nav mb-lg-0">
<li class="nav-item navbar-text" id="signup" onClick="renderSignUpForm()">Sign Up |</li>
<li class="nav-item navbar-text" id="login" onClick="renderLoginForm(passback)">Login |</li>

<li class="nav-item navbar-text d-none" id="logout" onClick="logout()">Logout</li> 
</ul>
</nav>
</div>
`;
}

function setLoggedOutHeader(){  
  let addBucketList = document.getElementById("add-bucket-list")
  let bucketList = document.getElementById("bucket-list")
  let loginOpt = document.getElementById("login")
  let signupOpt = document.getElementById("signup")
  let logoutOpt = document.getElementById("logout")

  // hiding these 3 if you're not logged in
  logoutOpt.classList.add("d-none")
  addBucketList.classList.add("d-none")
  bucketList.classList.add("d-none")  

  // only showing these if you're not logged in
  loginOpt.classList.remove("d-none")
  signupOpt.classList.remove("d-none")
}

function setLoggedInHeader(){
  let addBucketList = document.getElementById("add-bucket-list")
  let bucketList = document.getElementById("bucket-list")
  let loginOpt = document.getElementById("login")
  let signupOpt = document.getElementById("signup")
  let logoutOpt = document.getElementById("logout")

  // hiding these options if you ARE logged in
  loginOpt.classList.add("d-none")
  signupOpt.classList.add("d-none")

  // showing these options if you ARE logged in
  logoutOpt.classList.remove("d-none")
  addBucketList.classList.remove("d-none")
  bucketList.classList.remove("d-none")
}
