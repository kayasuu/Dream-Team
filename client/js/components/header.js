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
<li class="nav-item navbar-text" onClIck="renderBucketList()">Bucket List |</li>
<li class="nav-item navbar-text" onClick="renderAbout()">About |</li>
<li class="nav-item navbar-text" onClick="addBucketListForm()">Add Bucket List Item |</li>
<li class="nav-item navbar-text" onClick="renderSignUpForm()">Sign Up</li>
<li class="nav-item navbar-text" onClick="renderLoginForm()">Login</li>
<li class="nav-item navbar-text" onClick="logout()">Logout</li>
</ul>
</nav>
</div>
`;
  console.log("Header is working!");
}
