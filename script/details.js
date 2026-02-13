const detailsDiv = document.getElementById("details");
const api = "https://api.tvmaze.com/shows/";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const movieCastApi = `https://api.tvmaze.com/shows/${movieId}/cast`;
const movieImagesApi = `https://api.tvmaze.com/shows/${movieId}/images`;

const castLimit = 5;
let allCast = [];

function renderCast(limit) {
  const castList = document.getElementById("castList");
  castList.innerHTML = "";

  const items = limit ? allCast.slice(0, limit) : allCast;

  items.forEach((item) => {
    const actor = item.person;
    const img = actor.image && actor.image.medium ? actor.image.medium : "";
    const card = document.createElement("div");
    card.className = "cast-card";

    card.innerHTML = `
      ${img ? `<img class="cast-img" src="${img}" alt="${actor.name}">` : ""}
      <div class="cast-name">${actor.name}</div>
    `;
    castList.appendChild(card);
  });
}

function loadCast() {
  fetch(movieCastApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allCast = data;
      renderCast(castLimit);

      const showAllBtn = document.getElementById("showAllCastBtn");
      showAllBtn.addEventListener("click", () => {
        renderCast(null);
        showAllBtn.style.display = "none";
      });
    })
    .catch((err) => {
      statusText.textContent = "Error, try again later";
      console.error(err);
    });
}

function getMovieDetails() {
  fetch(`${api}${movieId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      detailsDiv.innerHTML = `
  <div class="movie-grid">
    <div class="movie-poster">
      ${data.image ? `<img src="${data.image.original}" alt="img">` : ""}
    </div>
    <div class="movie-info">
      <h1 class="movie-title">${data.name}</h1>
      <h3 class="movie-year"><strong>Year:</strong> ${data.premiered ? data.premiered.slice(0, 4) : "N/A"}</h3>
      <h3 class="movie-rating"><strong>Rating:</strong> ${data.rating && data.rating.average ? data.rating.average : ""}</h3>
      <div class="card-meta"><strong>Genre:</strong> ${data.genres ? data.genres.join(", ") : ""}</div>
      <div class="movie-summary">${data.summary || ""}</div>
      <a href="${data.url}" target="_blank"><button class="watch-btn">Watch Now</button></a>
    </div>
  </div>
  <div class="cast-section">
    <h2 class="cast-title">Actors</h2>
    <div id="castList" class="cast-grid"></div>
    <button id="showAllCastBtn" class="watch-btn">Show all actors</button>
  </div>
`;
      loadCast();
    })
    .catch((err) => {
      statusText.textContent = "Error, try again later";
      console.error(err);
    });
}

getMovieDetails();

const toTopbtn = document.getElementById("toTopbtn");

window.addEventListener("scroll", () => {
  toTopbtn.hidden = window.scrollY < 500;
});

toTopbtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
