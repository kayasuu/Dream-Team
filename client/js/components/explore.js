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

  page.innerHTML = "";
  page.append(name, reflections, image);

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
