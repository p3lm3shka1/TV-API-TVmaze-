const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const statusText = document.getElementById("status");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

const allShowsApi = "https://api.tvmaze.com/shows";
const searchShows = "https://api.tvmaze.com/search/shows?q=";

function getAllShows() {
  results.innerHTML = "";
  fetch(allShowsApi)
    .then((r) => r.json())
    .then((data) => {
      statusText.textContent = `Found movies: ${data.length}`;
      renderMovies(data);
      console.log(data);
    })
    .catch((err) => {
      statusText.textContent = "Error, try again later";
      console.error(err);
    });
}

getAllShows();

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const value = searchInput.value.trim();
    if (value.length < 2) {
      getAllShows();
    } else {
      searchMovies(value);
    }
  }
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim().length === 0) {
    getAllShows();
  }
});

function searchMovies(value) {
  statusText.textContent = "Searching...";
  results.innerHTML = "";

  fetch(searchShows + encodeURIComponent(value))
    .then((r) => r.json())
    .then((data) => {
      const movies = data.map((item) => item.show);
      statusText.textContent = `Found movies: ${movies.length}`;
      renderMovies(movies);
    })
    .catch((err) => {
      statusText.textContent = "Error, try again later";
      console.error(err);
    });
}

function renderMovies(movies) {
  results.innerHTML = "";
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

    div.addEventListener("click", () => openModal(movie));
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openModal(movie);
    });

    results.appendChild(div);
  });
}

function openModal(movie) {
  const summary = movie.summary || "<em>No summary provided.</em>";
  const url = movie.url || "#";
  const img =
    movie.image?.original ||
    movie.image?.medium ||
    "https://via.placeholder.com/420x600?text=No+Image";

  modalContent.innerHTML = `
    <div class="modal-layout">
      <img class="modal-poster" src="${img}" alt="${movie.name}" />
      <div class="modal-info">
        <h2>${movie.name}</h2>
        <div class="modal-body">${summary}</div>
        <div class="modal-link">
          <a href="${url}" target="_blank" rel="noopener">Open on TVMaze →</a>
        </div>
      </div>
    </div>
  `;
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
  modalContent.innerHTML = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Scroll-to-top button
const startbtn = document.querySelector(".startbtn");

window.addEventListener("scroll", () => {
  startbtn.hidden = window.scrollY < 1000;
});

startbtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
