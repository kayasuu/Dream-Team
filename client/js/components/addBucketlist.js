function addBucketListForm(email, username) {
  const page = document.getElementById("page");
  page.classList.add('centre')
  const h2 = document.createElement("h2");
  h2.textContent = "Add to your Bucketlist";

  const container = document.createElement("div");
  container.classList.add("d-flex", "justify-content-center", "align-items-center");
  container.style.height = "30vh";  

  const form = document.createElement("form");
  form.innerHTML = `
<label for="name" class="form-label mb-0">Destination:</label>
<input type="text" name="name" class="form-control reflections mb-1">
<label for="reflections" class="form-label mb-0">Reflections:</label>
<input type="text" name="reflections" class="form-control reflections mb-1" placeholder="Why do you want to go here? Why is it special to you? Any interesting info!">
<br><br>
<input type="submit" class="btn btn-outline-dark">
`;

container.appendChild(form);
  page.replaceChildren(h2, container);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
      const formData = new FormData(form);
  
      const data = {
        name: formData.get("name"),
        reflections: formData.get("reflections"),
        image: [],
        savedBy: [],
        likedBy: [],
        itinerary: {},
        createdBy: email
      };
      axios.get(`/api/unsplash/${data.name}`)
      .then((response) => {
        const imageUrl = response.data; 
  
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `Image of ${data.name}`;
  
        // Update data.image with the image URL
        data.image.push(imageUrl);
  
        console.log("Pic generated");
  
        // Now send the POST request to /api/bucket
        axios.post("/api/bucket", data).then((_) => {
          console.log("Bucketlist Item added")
          renderBucketList(email);
        }).catch((error)=>{
          console.log(error)
        });
  
      })
      .catch((error) => {
        console.error("Error generating pic: ", error);
      });


      console.log(data)

  })
}
