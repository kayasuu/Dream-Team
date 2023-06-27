function renderHeader() {
  setHeaderHtml();
}

function setHeaderHtml() {
  const header = document.getElementById("header-nav");
  header.innerHTML = `
<h1> Bucket List </h1>
<div class="container">
<nav class="navbar navbar-expand-lg border-bottom border-bottom-dark">
<ul id="navlist" class="navbar-nav me-auto mb-2 mb-lg-0">
<li class="nav-item navbar-text" onClick="renderAbout()">About |</li>
<li class="nav-item navbar-text" onClIck="renderBucketList()">Bucket List |</li>
<li class="nav-item navbar-text" onClick="addBucketListForm()">Add Bucket List Item |</li>
<li class="nav-item navbar-text" onClick="chatGPTform()">ChatGPT</li>
</ul>
<ul id="navlist" class="navbar-nav mb-lg-0">
<li class="nav-item navbar-text" id="signup" onClick="renderSignUpForm()">Sign Up |</li>
<li class="nav-item navbar-text" id="login" onClick="renderLoginForm()">Login |</li>
<li class="nav-item navbar-text d-none" id="logout" onClick="logout()">Logout</li> 
</ul>
</nav>
</div>
`;
}

function setLoggedOutHeader(){  
  let loginOpt = document.getElementById("login")
  let signupOpt = document.getElementById("signup")
  let logoutOpt = document.getElementById("logout")
  logoutOpt.classList.add("d-none")
  loginOpt.classList.remove("d-none")
  signupOpt.classList.remove("d-none")
}

function setLoggedInHeader(){
  let loginOpt = document.getElementById("login")
  let signupOpt = document.getElementById("signup")
  let logoutOpt = document.getElementById("logout")
  loginOpt.classList.add("d-none")
  signupOpt.classList.add("d-none")
  logoutOpt.classList.remove("d-none")
}

