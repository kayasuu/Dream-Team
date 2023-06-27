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

  const btnDiv = document.createElement("div")
  btnDiv.setAttribute("class", "btn-div")

  const name = document.createElement("h2");
  name.textContent = bucketList.name;

  const description = document.createElement("p");
  description.textContent = bucketList.description;

  const activity = document.createElement("p");
  activity.textContent = bucketList.activity;

  const image = document.createElement("img");
  image.src = bucketList.image;


  const deleteButton =  document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn-outline-secondary btn";

  deleteButton.addEventListener("click", () => {
     axios.delete(`api/bucket/${bucketList._id}`).then((_)=> {
         renderBucketList();
     })
  })
 
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = "btn-outline-secondary btn";

  editButton.addEventListener('click', () => {
     renderEditForm(bucketList);
  })

  const exploreButton = document.createElement('button');
  exploreButton.textContent = 'Explore';
  exploreButton.className = "btn-outline-secondary btn";

  exploreButton.addEventListener('click', () => {
     renderExploreForm(bucketList);
  })

  btnDiv.append(editButton, deleteButton, exploreButton)

  div.append(name, description, activity, image, btnDiv);
  console.log("bucketlist is working!");
 return div;
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
 }

function renderExploreForm(bucketList){
  const page = document.getElementById("page");
  const h2 = document.createElement("h2");
  h2.textContent = "Let's explore!";
  const form = document.createElement("form");

  form.innerHTML = `
<label for="name">I want to go to:</label>
<br>
<input type="text" name="name" value="${bucketList.name}">
<br>
<label for="days">How many days would you like to go for?:</label>
<br>
<select name="days" id="number">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  <option value="11">11</option>
  <option value="12">12</option>
</select>
<br>
<label for="activities">How much do you want to spend on this trip?:</label>
<br>
<select name="budget">
  <option value="" disabled selected></option>
  <option value="budget-friendly">Budget-friendly</option>
  <option value="standard">Standard</option>
  <option value="luxury">Luxury</option>
</select>
<br>
<label for="activities">Things I want to do:</label><br>
<input type="checkbox" name="activities" value="Sightseeing"> Sightseeing and exploring popular landmarks<br>
<input type="checkbox" name="activities" value="Museums"> Visiting museums and art galleries<br>
<input type="checkbox" name="activities" value="LocalCuisine"> Trying local cuisine and dining at popular restaurants<br>
<input type="checkbox" name="activities" value="Shopping"> Shopping at local markets and malls<br>
<input type="checkbox" name="activities" value="CityTours"> Going on guided city tours<br>
<input type="checkbox" name="activities" value="ScenicWalks"> Taking scenic walks or hikes<br>
<input type="checkbox" name="activities" value="Beach"> Relaxing on beaches or by the pool<br>
<input type="checkbox" name="activities" value="WaterSports"> Participating in water sports like snorkeling or surfing<br>
<input type="checkbox" name="activities" value="HistoricalSites"> Exploring historical sites and ruins<br>
<input type="checkbox" name="activities" value="CulturalEvents"> Attending cultural festivals and events<br>
<input type="checkbox" name="activities" value="WildlifeSafari"> Going on wildlife safaris or nature tours<br>
<input type="checkbox" name="activities" value="BoatCruise"> Taking boat or river cruises<br>
<input type="checkbox" name="activities" value="AdventureActivities"> Trying adventure activities like zip-lining or bungee jumping<br>
<input type="checkbox" name="activities" value="LiveMusic"> Enjoying live music performances or theater shows<br>
<input type="checkbox" name="activities" value="WineTours"> Going on wine or brewery tours<br>
<input type="checkbox" name="activities" value="CookingClasses"> Taking cooking classes or food tours<br>
<input type="checkbox" name="activities" value="ArtsCrafts"> Engaging in local arts and crafts workshops<br>
<input type="checkbox" name="activities" value="ReligiousSites"> Visiting religious or spiritual sites<br>
<input type="checkbox" name="activities" value="Cycling"> Going on cycling or biking tours<br>
<input type="checkbox" name="activities" value="NationalParks"> Exploring national parks and hiking trails<br>
<br>
<input type="submit">
`;
//clarify drop down menu
//budget
//input type: checkbox
//explore itineraries by type: for activities. 
//
  page.replaceChildren(h2, form);

  form.addEventListener("submit", (event) => {
    
    event.preventDefault();
    const formData = new FormData(form);

    const activites = []
    for(let data of formData.entries()){
      if (data[0] === 'activities') {
        activites.push(data[1])
      }
    }
    let activitesString = ""
    for (i = 0; i < activites.length; i++) {
      if (i < activites.length-1) {
        activitesString += activites[i] + ' and '
      } else {
      activitesString += activites[i] + '.'
      }
    }
    console.log(activitesString)
    const data = {
      name: formData.get("name"),
      days: formData.get("days"),
      budget: formData.get("budget"),
      activity: activitesString
    };

    //GPT post items from form
    const prompt = `I want to go to ${data.name} for ${data.days} days. I have a budget of ${data.budget} and these are the activities I want to do: ${data.activity}.`;
   const systemPrompt = `
    You are an AI trained to provide top-tier travel expertise of a professional travel agent. 
    Your mission is to reflect on user input and come up with an itinerary for their trip. Split this itinerary up by morning, afternoon, evening.
    Write an itinerary for each day, based on input below and do NOT ask a question. Provide answer in JSON (NO CHARACTERS OUTSIDE OBJECT), separating by days and morning/afternoon/evening. 
    `;
    console.log(prompt);
    axios.post("/api/gpt", { prompt, systemPrompt })
    .then((response) => {
      console.log("Itineraries generated")
      console.log("Response data: ", response.data);
      renderItinerary(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    

    //functions to render itinerary
    renderItinerary();

  }).catch((error)=>{
    console.log(error)
  });


function renderItinerary(itineraryContent) {
  if (!document.querySelector(".itineraryDiv")) {
  // Create a new div and add the class "itineraryDiv"
  const itineraryDiv = document.createElement("div");
  itineraryDiv.classList.add("itineraryDiv");
  // Append the itinerary div to the page
  const page = document.getElementById("page");
  page.append(itineraryDiv);
}
const itineraryDiv = document.querySelector(".itineraryDiv")
itineraryDiv.textContent = '';

  // Set the div's content to the itinerary passed into this function
  itineraryDiv.textContent = itineraryContent;

}};