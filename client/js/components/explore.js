function renderExplore(email, username) {
  const page = document.getElementById("page");
  const paragraph = document.createElement("p");
  paragraph.textContent = "Loading..."; // Aiming to update this later to something more creative
  page.replaceChildren(paragraph);
  
  axios.get("/api/bucket").then((response) => {
    const userItems = []
    response.data.forEach((item) => {
        if (item["createdBy"] !== email) {
          console.log("success")
          userItems.push(item)
        }
        console.log(`${item["createdBy"]} -- ${email}`)
        console.log(item["createdBy"] != email)
      })
    const listElements = userItems.map((bucketList) => 
      renderExploreList(bucketList)
    );
    page.replaceChildren(...listElements);
});
}

function renderExploreList(bucketList) {
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
    renderBucketPageExplore(bucketList);
  })

  div.append(name, reflections, image);
  console.log("bucketlist is working!");
  return div;
}

//added another page for buttons etc
 function renderBucketPageExplore(bucketList){
  const page = document.getElementById("page");

  const name = document.createElement("h2");
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
  } else {
    heading.textContent = "The itinerary for this Bucket List Item:"
    itinDescription.innerHTML = description
    itinerarySection.append(heading, itinDescription)
  }

  page.innerHTML = "";
  page.append(name, reflections, image, itinerarySection);
  
  console.log("page is working!");
  return page;
}
