function chatGPTform() {
  const page = document.getElementById("page");
  const h2 = document.createElement("h2");
  h2.textContent = "ChatGPT Feed";
  const form = document.createElement("form");
  form.innerHTML = `
  <label for="name">I want to go to:</label>
  <br>
  <input type="text" name="name" placeholder="Destination">
  <br>
  <label for="days">How many days would you like to go for?:</label>
  <br>
  <select name="days">
    <option value="" disabled selected></option>
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
    <option value="13">13</option>
    <option value="14">14</option>
    <option value="14+">14+</option>
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
  <label name="activities" for="activities">Things I want to do:</label>
  <br>
  <fieldset>
  <input type="checkbox" name="activities" value="Museums"> Visiting museums and art galleries<br>
  <input type="checkbox" name="activities" value="Sightseeing"> Sightseeing and exploring popular landmarks<br>
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
  <input type="checkbox" name="activities" value="HotAirBalloon"> Taking hot air balloon rides<br>
  <input type="checkbox" name="activities" value="RoadTrips"> Going on road trips or scenic drives<br>
  <input type="checkbox" name="activities" value="SportsEvents"> Attending sports events or matches<br>
  <input type="checkbox" name="activities" value="WellnessActivities"> Participating in wellness activities like yoga or meditation<br>
  <input type="checkbox" name="activities" value="NightlifeTours"> Going on pub crawls or nightlife tours<br>
  <input type="checkbox" name="activities" value="BotanicalGardens"> Visiting botanical gardens and parks<br>
  <input type="checkbox" name="activities" value="PhotographyTours"> Going on photography tours or workshops<br>
  <input type="checkbox" name="activities" value="AmusementParks"> Visiting amusement parks or theme parks<br>
  <input type="checkbox" name="activities" value="DayTrips"> Taking day trips to nearby towns or cities<br>
  <input type="checkbox" name="activities" value="HelicopterTours"> Going on helicopter or helicopter tours<br>
  </fieldset>
  <input type="submit">
`;
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
    console.log(data)

    // //GPT post items from form
    // const prompt = `I want to go to ${data.name} for ${data.days} days and I want to go ${data.activity}.`;

    // axios.post("/api/gpt", { prompt })
    // .then((response) => {
    //   console.log("Itineraries generated")
    //   console.log("Response data: ", response.data);
    //   renderItinerary(response.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // //functions to render itinerary
    // renderItinerary();

  }).catch((error)=>{
    console.log(error)
  });
}

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

}