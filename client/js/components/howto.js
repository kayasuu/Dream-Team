function howTo(){
    const page = document.getElementById("page");
    page.classList.add('centre');
    page.innerHTML = `
    <div class="centre" id="howto">
    <h2>How To</h2>
<h4 class="mb-1">Home</h4>
<p>
    Very simple! A welcome page to our website. We hope you have a memorable experience! Don't forget to signup or login
    to make use of all our features.
</p>
<h4 class="mb-1">BucketList</h4>
<p class="mb-1">
    <strong>Add to your Bucket List</strong>
</p>
<p class="mb-1">
    This is where you can get creative and add in a destination and a reflection that represents all the where places you want to
    visit in your lifetime. We've got some handy AI tools to make things easy, but don't worry about that now. Your
    reflection can really be anything, but maybe think about why you've picked this destination and what you might want
    to do there.
</p>
<p class="mb-1">
    <strong>See your Bucket List</strong>
</p>
<p class="mb-1">
    Your feed of your bucket list journeys feel free to edit, and remove from here. Also discover the Plan
        Itinerary section, where you can use an AI integrated consultant to help you build your journey.
</p>
<p class="mb-1">
    Below is an example of how you can use our app to create new bucket list items & get some help planning an
    itinerary.
</p>
<br/>
<img src="https://i.ibb.co/xfwZvvx/Screenshot-2023-07-04-at-7-05-30-pm.png"></img>
</div>
<br/>
<h4>Explore</h4>
<p class="display-p mb-1">
    Explore is a shared feed where things get exciting and you can start seeing other peoples itineraries. Feel free to
    add from this as well or scroll to discover.<br />EXPLORE EVERYONE'S DREAM DESTINATIONS!
</p>
</div>
    `

}