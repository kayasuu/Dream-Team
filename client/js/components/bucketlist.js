function renderBucketList(email, username) {
  const page = document.getElementById("page");
  const paragraph = document.createElement("p");
  paragraph.textContent = "Loading..."; // Aiming to update this later to something more creative
  page.replaceChildren(paragraph);
  
  axios.get("/api/bucket").then((response) => {
    const userItems = []
    response.data.forEach((item) => {
        if (item["createdBy"] == email) {
          userItems.push(item)
        }
      })
    const listElements = userItems.map((bucketList) => 
      renderList(bucketList)
    );
    page.replaceChildren(...listElements);
});
}

function renderList(bucketList) {
  const div = document.createElement("div");
  div.classList.add("bucketListDiv");

  const name = document.createElement("h2");
  name.textContent = bucketList.name;

  const reflections = document.createElement("p");
  reflections.textContent = bucketList.reflections;
  reflections.classList.add("mb-1");

  const image = document.createElement("img");
  image.src = bucketList.image;

  div.addEventListener("click", () => {
    renderBucketPage(bucketList);
  })

  div.append(name, reflections, image);
  console.log("bucketlist is working!");
  return div;
}

//added another page for buttons etc
 function renderBucketPage(bucketList){
  const page = document.getElementById("page");

  const name = document.createElement("h1");
  name.textContent = bucketList.name;

  const reflections = document.createElement("p");
  reflections.textContent = bucketList.description;
  reflections.classList.add("mb-1");

  const image = document.createElement("img");
  image.src = bucketList.image;

  const itinerarySection = document.createElement("section")
  const description = bucketList.itinerary['description']
  const heading = document.createElement("h3")
  const itinDescription = document.createElement("p")
  if (!description) {
    heading.textContent = "There is currently no itinerary saved."
    itinDescription.innerHTML = "Please press Plan Itinerary for your future holiday!"
  } else {
    heading.textContent = "Your itinerary below"
    itinDescription.innerHTML = description
  }
  itinerarySection.append(heading, itinDescription)

  const deleteButton =  document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn-outline-dark btn";

  deleteButton.addEventListener("click", () => {
     axios.delete(`api/bucket/${bucketList._id}`).then((_)=> {
         renderBucketList(email);
     })
  })
 
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = "btn-outline-dark btn";

  editButton.addEventListener('click', () => {
     renderEditForm(bucketList);
  })

  const exploreButton = document.createElement('button');
  exploreButton.textContent = 'Plan Itinerary';
  exploreButton.className = "btn-outline-dark btn";

  exploreButton.addEventListener('click', () => {
     renderExploreForm(bucketList);
  })

  const btnDiv = document.createElement("div")
  btnDiv.setAttribute("class", "btn-div")

  btnDiv.append(editButton, deleteButton, exploreButton)

  page.innerHTML = "";
  page.append(name, reflections, image, itinerarySection, btnDiv);

  console.log("page is working!");
  return page;
}

function renderEditForm(bucketList){
  const form = document.createElement("form")
  form.innerHTML = `
  <label for="name">Name</label>
  <input type="text" name="name" value="${bucketList.name}">
  <label for="reflections">Reflections</label>
  <input type="text" name="reflections" value="${bucketList.reflections}">
  <input type="submit">
  `;
  form.addEventListener("submit", (event)=>{
  event.preventDefault()
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    reflections: formData.get("reflections"),
  };

  axios.put(`/api/bucket/${bucketList._id}`, data).then((_)=>{
    renderBucketList(email)
  }).catch((error)=>{
    console.log(error)
  })
  })
  const page = document.getElementById("page")
  page.replaceChildren(form)
};

