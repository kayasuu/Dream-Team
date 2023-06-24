function chatGPTform() {
  const page = document.getElementById("page");
  const h2 = document.createElement("h2");
  h2.textContent = "ChatGPT Feed";
  const form = document.createElement("form");
  form.innerHTML = `
<label for="name">Destination:</label>
<input type="text" name="name">
<label for="activity">Activity:</label>
<input type="text" name="activity">
<input type="submit">
`;
  page.replaceChildren(h2, form);

  form.addEventListener("submit", (event) => {
    
    event.preventDefault();
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      activity: formData.get("activity")
    };

    //GPT post items from form
    const prompt = `I want to go to ${data.name} and I want to do ${data.activity}.`;

    axios.post("/api/gpt", { prompt })
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