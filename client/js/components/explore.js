function renderExploreForm(bucketList){
    const page = document.getElementById("page");
    const h2 = document.createElement("h2");
    h2.textContent = `Let's explore ${bucketList.name}!`;
    const form = document.createElement("form");
  
    form.innerHTML = `
  <label for="days">How many days would you like to go ${bucketList.name} for?:</label>
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
        days: formData.get("days"),
        budget: formData.get("budget"),
        activity: activitesString
      };
  
      //GPT post items from form
      const prompt = `I want to go to ${bucketList.name} for ${data.days} days. I have a budget of ${data.budget} and these are the activities I want to do: ${data.activity}.`;
     console.log(prompt)
      const systemPrompt = `
      You are an AI trained to provide top-tier travel expertise of a professional travel agent. 
      Your mission is to reflect on user input and come up with an itinerary for their trip. Split this itinerary up by morning, afternoon, evening.
      Write an itinerary for each day, based on input below and do NOT ask a question. Do NOT use filler words before or after the response.
      Make sure every new line start with either the day, or "Morning:" "Evening:" or "Afternoon:". Make sure the day, time of day and activities are all on new lines.
      `;
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
        const itineraryDiv = document.createElement("div");
        itineraryDiv.classList.add("itineraryDiv");
        
        // Split the itinerary content by '\n'
        const lines = itineraryContent.split('\n');
      
        // Loop through each line
        lines.forEach((line) => {
          let element;
      
          // Check the first few characters to determine the type of the line
          if (line.startsWith('Day ')) {
            // Create a new <h2> element
            element = document.createElement('h2');
          } else if (line.startsWith('Morning:') || line.startsWith('Afternoon:') || line.startsWith('Evening:')) {
            // Create a new <h3> element
            element = document.createElement('h3');
          } else if (line === '') {
            // Skip empty lines
            return;
          } else {
            // Create a new <p> element
            element = document.createElement('p');
          }
      
          // Set the text content of the element
          element.textContent = line;
      
          // Append the element to the itineraryDiv
          itineraryDiv.append(element);
        });
      
        // Get the page and replace all its children with the itineraryDiv
        const page = document.getElementById("page");
        const h2 = document.createElement("h2");
        h2.textContent = `Your ${bucketList.name} itinerary!`;

        const backButton = document.createElement('button');
          backButton.textContent = `Back to ${bucketList.name}`;
        backButton.className = "btn-outline-dark btn";
        backButton.addEventListener('click', () => {
            renderBucketPage(bucketList);
  })


        page.replaceChildren(h2, itineraryDiv, backButton);
      }   
      
      };
    