function addBucketListForm(email, username) {
  const page = document.getElementById("page");
  const h2 = document.createElement("h2");
  h2.textContent = "Add to your Bucketlist";
  const form = document.createElement("form");
  form.innerHTML = `
<label for="name" class="form-label mb-0">Destination:</label>
<input type="text" name="name" class="form-control">
<label for="reflections" class="form-label mb-0">Reflections:</label>
<input type="text" name="reflections" class="form-control reflections mb-1" placeholder="Why do you want to go here? Why is it special to you? Any interesting info! text">
<input type="submit" class="btn btn-outline-dark">
`;
  page.replaceChildren(h2, form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
      const formData = new FormData(form);
  
      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
        activity: formData.get("activity"),
        image: [],
        savedBy: [],
        likedBy: [],
        itinerary: {},
        createdBy: email
      };
      axios.get(`https://api.unsplash.com/search/photos?query=${data.name}&orientation=landscape&client_id=&client_id=TBALEKkzPYCBQoYCWtt2avUIHsybpzoz4Nkoi-Gvz2Y`)
      .then((response) => {
        // The first result's URL is used, you may want to add error checking
        const imageUrl = response.data.results[0].urls.small; 
  
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
