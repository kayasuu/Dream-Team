function addBucketListForm() {
  const page = document.getElementById("page");
  const h2 = document.createElement("h2");
  h2.textContent = "Add to your Bucketlist";
  const form = document.createElement("form");
  form.innerHTML = `
<label for="name">Destination:</label>
<input type="text" name="name">
<label for="description">Description:</label>
<input type="text" name="description">
<label for="activity">Activity:</label>
<input type="text" name="activity">
<label for="image">Image url:</label>
<input type="text" name="image">
<input type="submit">
`;
  page.replaceChildren(h2, form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      activity: formData.get("activity"),
      image: formData.get("image"),
    };

    //prettier-ignore
    axios.post("/api/bucket", data).then((_) => {
        console.log("Bucketlist Item added")
    renderBucketList();
  }).catch((error)=>{
    console.log(error)
  });
  });
}
