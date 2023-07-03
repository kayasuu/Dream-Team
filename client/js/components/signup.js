function renderSignUpForm(){
const page = document.getElementById("page")
page.classList.add('centre')
const h2 = document.createElement("h2")
h2.textContent = "Sign Up"

const container = document.createElement("div");
container.classList.add("d-flex", "justify-content-center", "align-items-center");
container.style.height = "40vh";  

const form = document.createElement("form")
form.innerHTML = `
<label for="name" class="form-label mb-0 name-form">Name:</label>
<input type="text" name="name" class="form-control" id="name-form">
<label for="email" class="form-label mb-0">Email: </label>
<input type="email" name="email" class="form-control">
<label for="password" class="form-label mb-0">Password: </label>
<input type="password" name="password" class="form-control">
<br><br>
<input type="submit" class="btn btn-outline-dark">
`;

container.appendChild(form);

const errorMsg = document.createElement("p")
errorMsg.id = "error-msg";
page.replaceChildren(h2, container, errorMsg);

form.addEventListener("submit", (event)=>{
event.preventDefault()
const formData = new FormData(form)

const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
};

axios.post("/api/users", data)
.then((_) => {
    renderLoginForm();
}).catch((error) => {     
    console.log(error)
    errorMsg.classList = "alert alert-danger"       
    errorMsg.textContent = error.response.data.message;
});
})
}