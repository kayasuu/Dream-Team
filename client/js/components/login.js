function renderLoginForm(){
const page = document.getElementById("page");
const h2 = document.createElement("h2");
h2.textContent = "Login";
const form = document.createElement("form");
form.innerHTML = `
<label for="email" class="form-label mb-0">Email: </label>
<input type="email" name="email" class="form-control">
<label for="password" class="form-label mb-0">Password: </label>
<input type="password" name="password" class="form-control">
<input type="submit" class="btn btn-outline-dark">
`;
const errorMsg = document.createElement("p")
errorMsg.id = "error-msg";
page.replaceChildren(h2, form, errorMsg)

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };
axios.post("/api/session", data).then((_)=>{
    setLoggedInHeader()
    renderBucketList();
}).catch((error)=>{
    console.log(error)
    errorMsg.classList = "alert alert-danger"       
    errorMsg.textContent = error.response.data.message;
});
});
}