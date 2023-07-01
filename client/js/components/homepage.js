function renderHomePage(){
    const page = document.getElementById("page");
    page.innerHTML = `
    <div class="centre">
    <h2>Welcome to Bucket List</h2>
    <p class="display-p">
    Welcome to Bucket List, the ultimate destination for travel enthusiasts and adventure seekers! Curate your dream destinations and activities, and let us help you bring your bucket list to life. 
    Add your coveted travel spots from around the globe and the thrilling activities you're eager to experience. Our platform makes it effortless to organise and prioritise your travel goals.
    <br/>    <br/>
    Explore the world with ease using our AI assistant, ChatGPT. Generate personalised itineraries based on your destination, number of days, and preferred activities. Whether it's a weekend getaway or a month-long adventure, 
    ChatGPT optimises your time and ensures every moment counts. Join our community of travel enthusiasts, share your bucket list destinations, and get inspired by others. Your dreams of adventure are just a click away. Start building your travel story with Bucket List today!
    </p>
    <div class="img-div d-flex align-items-center">
    <img class="mx-auto" src="https://i.ibb.co/d4Px2MB/bucket-list-AI-pic.png" alt="person sits on a big silver bucket slightly hunched over looking at a book, positioned on a cliff looking over at a lake and some mountains"></img>
    </div>
    </div>
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