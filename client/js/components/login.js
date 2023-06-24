function renderLoginForm(){
const page = document.getElementById("page");
const h2 = document.createElement("h2");
h2.textContent = "Login";
const form = document.createElement("form");
form.innerHTML = `
<label for="name">Name:</label>
<input type="text" name="name">
<label for="email">Email: </label>
<input type="email" name="email">
<label for="password">Password: </label>
<input type="password" name="password">
<input type="submit">
`;

page.replaceChildren(h2, form)

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };
axios.post("/api/session", data).then((_)=>{
    renderHeader();
    renderBucketList();
});

});

}