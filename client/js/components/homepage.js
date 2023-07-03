function renderHomePage(){
    const page = document.getElementById("page");
    page.classList.add('centre')
    page.innerHTML = `
    <div class="centre" id="homepage">
    <h2>Welcome to BucketList.AI</h2>
    <p class="display-p">
    Welcome to BucketList.AI, a place to log, explore and build your bucket list and reflect back on your journeys. Let us help you bring your bucket list to life!
    Our platform makes it effortless to map out, explore ideas and visualise your travel goals.
    <br/>    <br/>
    Explore the world with ease using our AI assistant, we call it BucketList.AI! Generate personalised itineraries based on your destination, number of days, preferred activities and budget. Whether it's a weekend getaway or a month-long adventure, 
    BucketList.AI optimises your time and ensures every moment counts. Join our community of travel enthusiasts, share what's on your bucket list, and get inspired by others. Your dreams of adventure are just a click away. Start building your travel story with Bucket List today!
    </p>
    <div class="img-div d-flex align-items-center">
    <img class="mx-auto" src="https://i.ibb.co/d4Px2MB/bucket-list-AI-pic.png" alt="person sits on a big silver bucket slightly hunched over looking at a book, positioned on a cliff looking over at a lake and some mountains"></img>
    </div>
    </div>
`
}

