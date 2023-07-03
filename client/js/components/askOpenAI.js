function renderExploreForm(bucketList){
  const page = document.getElementById("page");
  page.classList.add('centre')
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
<label for="budget">How much do you want to spend on this trip?:</label>
<br>
<select name="budget">
  <option value="" disabled selected></option>
  <option value="budget-friendly">Budget-friendly</option>
  <option value="standard">Standard</option>
  <option value="luxury">Luxury</option>
</select>
<br>
<label for="activities">Things I want to do:</label><br>
<div class="row justify-content-center">
    <div class="col-lg-6 col-md-12 activity-div text-center" id="localCulture">
    <img src="https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80" alt="Local Culture">
    <p>Explore local culture</p>
  </div>
  <div class="col-lg-6 col-md-12 activity-div text-center" id="nature">
    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80" alt="Nature">
    <p>Wander in nature</p>
  </div>
  <div class="col-lg-6 col-md-12 activity-div text-center" id="cityLife">
    <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80" alt="City Life">
    <p>Enjoy city life</p>
  </div>
  <div class="col-lg-6 col-md-12 activity-div text-center" id="quietMoments">
    <img src="https://images.unsplash.com/flagged/photo-1569744068983-6dfc2f27deb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="Quiet Moments">
    <p>Seek quiet moments</p>
  </div>
  <div class="col-lg-6 col-md-12 activity-div text-center" id="localFoods">
    <img src="https://images.unsplash.com/photo-1545984929-f28d9e323a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1006&q=80" alt="Local Foods">
    <p>Taste local foods</p>
  </div>
  <div class="col-lg-6 col-md-12 activity-div text-center" id="touristLandmarks">
  <img src="https://images.unsplash.com/photo-1646518540529-51da7a19c1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" alt="Tourist Landmarks">
  <p>Visit tourist landmarks</p>
</div>
<div class="col-lg-6 col-md-12 activity-div text-center" id="hiddenGems">
  <img src="https://images.unsplash.com/photo-1674311667887-05784577c91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Hidden Gems">
  <p>Find hidden gems</p>
</div>
<div class="col-lg-6 col-md-12 activity-div text-center" id="locals">
  <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tbXVuaXRpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" alt="Outdoor Sports">
  <p>Meet new people</p>
</div>
<div class="col-lg-6 col-md-12 activity-div text-center" id="nightlife">
  <img src="https://images.unsplash.com/photo-1545128485-c400e7702796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Nightlife">
  <p>Experience nightlife</p>
  </div>
</div>
<br>
<input type="submit" class="btn btn-outline-dark">
`;


  page.replaceChildren(h2, form);

  const activityImgs = document.querySelectorAll(".activity-div img");
  activityImgs.forEach((img) => {
    img.addEventListener('click', (event) => {
      event.target.parentNode.classList.toggle('selected');
    });
  });

  form.addEventListener("submit", (event) => {
    
    const paragraph = document.createElement("p");
    paragraph.textContent = "Loading! Please be patient while BucketList.AI builds your itinerary 👷‍♂️ 🔨 🧰 🤖  "; // Aiming to update this later to something more creative
    page.appendChild(paragraph);

    event.preventDefault();
    const formData = new FormData(form);

    const activities = []
    const selectedDivs = document.querySelectorAll(".activity-div.selected");
    for(let div of selectedDivs){
      activities.push(div.textContent)
    }

    let activitiesString = ""
    for (i = 0; i < activities.length; i++) {
      if (i < activities.length-1) {
        activitiesString += activities[i] + ' and '
      } else {
        activitiesString += activities[i] + '.'
      }
    }

    const data = {
      days: formData.get("days"),
      budget: formData.get("budget"),
      activity: activities
    };

    //GPT post items from form
    const prompt = `I want to go to ${bucketList.name} for ${data.days} days. I want the cost to be ${data.budget} and these are the activities I want to do: ${data.activity}.`;
   console.log(prompt)
    const systemPrompt = `
    You are an AI trained to provide top-tier travel expertise of a professional travel agent. 
    Your mission is to reflect on user input and come up with a DETAILED itinerary for their trip, PRIMARILY DESIGNED BASED ON USER ACTIVITIES. Include references to cities, towns and significant icons where possible.
    Split this itinerary up by morning, afternoon, evening.
    Write an itinerary for each day, based on input below and do NOT ask a question. Do NOT use filler words before or after the response.
    Make sure every new line start with either the day, or "Morning:" "Evening:" or "Afternoon:". Make sure the day, time of day and activities are all on new lines.
    Do NOT use "-" in answer.
    `;
  
    const patchData = {
      itinerary: {
        length: data["days"],
        budget: data["budget"],
        activity: activities,
        description: ''
      }
    } 
    axios.patch(`/api/bucket/${bucketList._id}`, patchData)
    .then(
    axios.post("/api/gpt", { prompt, systemPrompt })
    .then((response) => {
    
      console.log("Itineraries generated")
      console.log("Response data: ", response.data);
      renderItinerary(response.data);
    }))
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
    
      // get the page and replace all its children with the itineraryDiv
      const page = document.getElementById("page");
      const h2 = document.createElement("h2");
      h2.textContent = `Your ${bucketList.name} itinerary!`;

      //place pic here:
      const image = document.createElement("img");
      image.src = bucketList.image;


      const backButton = document.createElement('button');
        backButton.textContent = `Back to ${bucketList.name}`;
      backButton.className = "btn-outline-dark btn";
      backButton.addEventListener('click', () => {
        const itinData = { itinerary : "" };
        axios.patch(`/api/bucket/${bucketList._id}`, itinData).then((_) => {
          console.log("Itin cleared")
          renderBucketList(email);
        });
      })

      const saveButton = document.createElement('button');
        saveButton.textContent = `Save to ${bucketList.name}`;
      saveButton.className = "btn-outline-dark btn";
      saveButton.addEventListener('click', () => {
        const itinData = { "itinerary.description" : document.querySelector(".itineraryDiv").innerHTML };
        axios.patch(`/api/bucket/${bucketList._id}`, itinData).then((response) => {
          console.log("Itin added")
          renderBucketPage(response.data);
        });
      })

      page.replaceChildren(h2, image, itineraryDiv, backButton, saveButton);
    }   
    
    };
  