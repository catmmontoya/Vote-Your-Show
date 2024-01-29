const showDisplay = document.querySelector("#showDisplay");
const showForm = document.querySelector("form");

const createShowCard = (showObj) => {
  const newShowCard = document.createElement("section");
  newShowCard.className = "showCard";
  newShowCard.innerHTML = `
    <img src=${showObj.picture} />
    <p>${showObj.name}</p>

    <section>
    <button onclick="updateShow(${showObj.id}, 'downvote')">-</button>
    Popularity: ${showObj.vote}
    <button onclick="updateShow(${showObj.id}, 'upvote')">+</button>
    </section>

    <br/>

    <button onclick="deleteShow(${showObj.id})">Delete Me</button>
    `;

  //   console.log(newShowCard);
  showDisplay.appendChild(newShowCard);
};

const displayAllShows = (showArr) => {
  for (let i = 0; i < showArr.length; i++) {
    createShowCard(showArr[i]);
  }
};

const getAllShows = () => {
  axios.get("/shows").then((res) => {
    displayAllShows(res.data.allShows);
  });
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  let name = document.getElementById("showName");
  let showImg = document.getElementById("showImg");

  let bodyObj = {
    showName: name.value,
    showPic: showImg.value,
  };

  showDisplay.innerHTML = "";
  name.value = "";
  showImg.value = "";

  axios.post("/addShow", bodyObj).then((res) => {
    displayAllShows(res.data.allShows);
  });
};

const updateShow = (id, type) => {
  let bodyObj = {
    voteType: type,
  };
  axios.put(`/updateShow/${id}`, bodyObj).then((res) => {
    showDisplay.innerHTML = "";
    displayAllShows(res.data.allShows);
  });
};

const deleteShow = (id) => {
  axios.delete(`/deleteShow/${id}`).then((res) => {
    showDisplay.innerHTML = "";
    displayAllShows(res.data.allShows);
  });
};

showForm.addEventListener("submit", handleSubmit);

getAllShows();
