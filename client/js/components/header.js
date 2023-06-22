function renderHeader()

{setHeaderHtml()};
console

function setHeaderHtml() {

const header = document.getElementById("header-nav");
header.innerHTML = 
`
<h1> Bucket List </h1>
<ul id="navlist">
<li onClIck="renderBucketList()">Bucket List</li>
<li onClick="renderAbout()">About</li>
</ul>

`
console.log("Header is working!");

}