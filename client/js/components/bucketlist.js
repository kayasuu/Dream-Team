function renderBucketList() {
  const page = document.getElementById("page");
  const paragraph = document.createElement("p");
  paragraph.textContent = "Loading..."; // Aiming to update this later to something more creative
  page.replaceChildren(paragraph);

  axios.get("/api/bucket").then((response) => {
    const listElements = response.data.map((bucketList) =>
      renderList(bucketList)
    );
    page.replaceChildren(...listElements);
  });
}

function renderList(bucketList) {
  const div = document.createElement("div");
  div.classList.add("bucketListDiv");

  const name = document.createElement("h2");
  name.textContent = bucketList.name;

  const description = document.createElement("p");
  description.textContent = bucketList.description;

  const activity = document.createElement("p");
  activity.textContent = bucketList.activity;

  const image = document.createElement("img");
  image.src = bucketList.image;

  const deleteButton =  document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
     axios.delete(`api/bucket/${bucketList._id}`).then((_)=> {
         renderBucketList();
     })
  })
 
  const editDiv = document.createElement('div');
  editDiv.id = `edit-challenge-${bucketList._id}`;
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
     renderEditForm(bucketList);
  })
  editDiv.append(editButton);
 
  div.append(name, description, activity, image,deleteButton,editDiv);
  console.log("bucketlist is working!");
 return div;
 }