const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const statusText = document.getElementById("status");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const hero = document.querySelector(".hero");

const allShowsApi = "https://api.tvmaze.com/shows";
const searchShows = "https://api.tvmaze.com/search/shows?q=";

const pageSize = 18;
let allMovies = [];
let currentIndex = 0;

function getAllShows() {
  results.innerHTML = "";
  currentIndex = 0;

  fetch(allShowsApi)
    .then((r) => r.json())
    .then((data) => {
      allMovies = data;
      statusText.textContent = "Found movies: " + allMovies.length;
      renderNextPage();
      console.log(data);
    })
    .catch((err) => {
      statusText.textContent = "Error, try again later";
      console.error(err);
    });
}

function renderNextPage() {
  const nextMovies = allMovies.slice(currentIndex, currentIndex + pageSize);
  renderMovies(nextMovies);
  currentIndex += pageSize;

  if (currentIndex >= allMovies.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

loadMoreBtn.addEventListener("click", function () {
  renderNextPage();
});

getAllShows();

function hideHero() {
  if (hero) hero.style.display = "none";
}

function showHero() {
  if (hero) hero.style.display = "flex";
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const value = searchInput.value.trim();
    if (value.length < 2) {
      showHero();
      getAllShows();
    } else {
      hideHero();
      searchMovies(value);
    }
  }
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim().length === 0) {
    showHero();
    getAllShows();
  }
});

function searchMovies(value) {
  statusText.textContent = "Searching...";
  results.innerHTML = "";
  currentIndex = 0;

  fetch(searchShows + encodeURIComponent(value))
    .then((r) => r.json())
    .then((data) => {
      allMovies = data.map((item) => item.show);
      statusText.textContent = "Found movies: " + allMovies.length;
      renderNextPage();
    })
    .catch((err) => {
      statusText.textContent = "Error, try again later";
      console.error(err);
    });
}

function renderMovies(movies) {
  movies.forEach((movie) => {
    const rating = movie.rating?.average ?? "N/A";
    const year = movie.premiered ? movie.premiered.slice(0, 4) : "—";
    const genres = movie.genres?.join(", ") || "—";
    const img = movie.image?.medium ?? "";

    const div = document.createElement("div");
    div.className = "card";
    div.tabIndex = 0;

    div.innerHTML = `
      <img class="card-img" src="${img}" alt="${movie.name}" />
      <div class="card-overlay">
        <div class="card-title">${movie.name}</div>
        <div class="card-meta">Rating: ${rating}</div>
        <div class="card-meta">Premiere: ${year}</div>
        <div class="card-meta">Genre: ${genres}</div>
      </div>
    `;

    const imgElement = div.querySelector(".card-img");
    if (imgElement) {
      imgElement.addEventListener("click", function () {
        window.location.href = "./details.html?id=" + movie.id;
      });
    }

    results.appendChild(div);
  });
}

const toTopbtn = document.getElementById("toTopbtn");

window.addEventListener("scroll", () => {
  toTopbtn.hidden = window.scrollY < 1000;
});

toTopbtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
