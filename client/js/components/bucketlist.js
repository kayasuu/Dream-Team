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

  div.append(name, description, activity, image);
  console.log("bucketlist is working!");
  return div;
}
