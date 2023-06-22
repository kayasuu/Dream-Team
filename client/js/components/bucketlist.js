function renderBucketList() {

    const page = document.getElementById('page');
    paragraph.textContent = "Loading..." // Aiming to update this later to something more creative
    page.replaceChildren(paragraph);

axios.get('/api/bucketlist').then(response => {
    const listElements = response.data.map(challenge => renderList(bucketlist));
    page.replaceChildren(...listElements)
})
 }

 function renderList(bucketList) {
    const div = document.createElement('div');
    div.classList.add('bucketListDiv');

    const name = document.createElement('h2');
    name.textContent = bucketList.name;

    const description = document.createElement('p');
    description.textContent = bucketList.description; 

    const activity = document.createElement('p');
    activity.textContent = bucketList.activity

    const image = createElement('img');
    image.src = bucketList.image;

    div.append(name, description, activity,image)
    return div;

 }