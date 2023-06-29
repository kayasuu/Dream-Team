function renderHomePage(){
    const page = document.getElementById("page");
    page.innerHTML = `
    <h2>Welcome to Bucket List</h2>
    <p class="me-5">
    Below is an example of how you can use our app to create new bucket list items & get some help planning an itinerary.
     </p>
`
axios.get("/api/bucket").then((response) => {
    const listElements = response.data.map((bucketList) =>
        renderHomePageList(bucketList)
    );
    page.append(listElements[0]);
  });
}

function renderHomePageList(bucketList){
    const div = document.createElement("div");
    div.classList.add("home-page-div");
  
    const btnDiv = document.createElement("div")
    btnDiv.setAttribute("class", "btn-div")
  
    const name = document.createElement("h2");
    name.textContent = bucketList.name;
  
    const description = document.createElement("p");
    description.textContent = bucketList.description;
    description.classList.add("mb-1");
  
    const image = document.createElement("img");
    image.src = bucketList.image;

    const deleteButton =  document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn-outline-dark btn";
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = "btn-outline-dark btn";
  
    const exploreButton = document.createElement('button');
    exploreButton.textContent = 'Plan Itinerary';
    exploreButton.className = "btn-outline-dark btn";

    btnDiv.append(editButton, deleteButton, exploreButton)
  
    div.append(name, description, image, btnDiv);
    return div
}