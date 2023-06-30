function renderBucketList() {
  const page = document.getElementById("page");
  const paragraph = document.createElement("p");
  paragraph.textContent = "Loading..."; // Aiming to update this later to something more creative
  page.replaceChildren(paragraph);

  axios.get("/api/bucket").then((response) => {
    const listElements = response.data.map((bucketList) =>
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

  const description = document.createElement("p");
  description.textContent = bucketList.description;
  description.classList.add("mb-1");

  const activity = document.createElement("p");
  activity.textContent = bucketList.activity;
  activity.classList.add("mb-1");

  const image = document.createElement("img");
  image.src = bucketList.image;

  div.addEventListener("click", () => {
    renderBucketPage(bucketList);
  })

  div.append(name, description, activity, image);
  console.log("bucketlist is working!");
  return div;
 }

//added another page for buttons etc
 function renderBucketPage(bucketList){
  const page = document.getElementById("page");

  const name = document.createElement("h2");
  name.textContent = bucketList.name;

  const description = document.createElement("p");
  description.textContent = bucketList.description;
  description.classList.add("mb-1");

  const activity = document.createElement("p");
  activity.textContent = bucketList.activity;
  activity.classList.add("mb-1");

  const image = document.createElement("img");
  image.src = bucketList.image;



  const deleteButton =  document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn-outline-dark btn";

  deleteButton.addEventListener("click", () => {
     axios.delete(`api/bucket/${bucketList._id}`).then((_)=> {
         renderBucketList();
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
  page.append(name, description, activity, image, btnDiv);

  if (bucketList.itinerary != "") {
    const itinerarySection = document.createElement("section")
    const itinData = bucketList.itinerary
    // const numOfDays = itinData['length']
    // const budget = itinData['budget']
    // const activities = itinData['activity']
    const description = itinData['description']

    const heading = document.createElement("h4")
    heading.textContent = "Your saved itinerary below"
    const itinDescription = document.createElement("p")
    itinDescription.innerHTML = description
    itinerarySection.append(heading, itinDescription)
    image.insertAdjacentElement("afterend", itinerarySection)
  }
  
  console.log("page is working!");
  return page;
}



 function renderEditForm(bucketList){
  const form = document.createElement("form")
  form.innerHTML = `
  <label for="name">Name</label>
  <input type="text" name="name" value="${bucketList.name}">
  <label for="description">Description</label>
  <input type="text" name="description" value="${bucketList.description}">
  <label for="activity">Activity</label>
  <input type="text" name="activity" value="${bucketList.activity}">
  <label for="image">Image</label>
  <input type="text" name="image" value="${bucketList.image}">
  <input type="submit">
  `;
form.addEventListener("submit", (event)=>{
event.preventDefault()
const formData = new FormData(form);

const data = {
  name: formData.get("name"),
  description: formData.get("description"),
  activity: formData.get("activity"),
  image: formData.get("image"),
};

axios.put(`/api/bucket/${bucketList._id}`, data).then((_)=>{
  renderBucketList()
}).catch((error)=>{
  console.log(error)
})
})
const page = document.getElementById("page")
page.replaceChildren(form)
 };

