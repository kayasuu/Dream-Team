function renderSignUpForm(){
const page = document.getElementById("page")
const h2 = document.createElement("h2")
h2.textContent = "Sign Up"
const form = document.createElement("form")
form.innerHTML = `
<label for="name">Name:</label>
<input type="text" name="name">
<label for="email">Email: </label>
<input type="email" name="email">
<label for="password">Password: </label>
<input type="password" name="password">
<input type="submit">
`;

const errorMsg = document.createElement("p")
errorMsg.id = "error-msg";
page.replaceChildren(h2, form, errorMsg);

form.addEventListener("submit", (event)=>{
event.preventDefault()
const formData = new FormData(form)

const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
};

axios.post("/api/users", data).then((_ =>{
    renderBucketList();
}).catch((error) =>{
    errorMsg.textContent = error.response.data.message
})
)
})
}