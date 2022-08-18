"use strict";
// Search Button
const searchButton = document.getElementById("search-go");

// Search Query
const searchQuery = document.getElementById("search-query");

// DOM HTML Container
const dynamicHtml = document.getElementById("dynamic-html");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  findMovie();
});

function findMovie() {
  fetch(`http://www.omdbapi.com/?apikey=98a9f83d&t=${searchQuery.value}`)
    .then((response) => response.json())
    // .then((data) => console.log(data));
    .then((data) => {
      dynamicHtml.innerHTML = `
    <article class="row" id="content">
    <div class="movie-poster col-md-3">
      <img
        src="${data.Poster}"
        alt="Movie Poster"
        class="movie-poster-img"
      />
    </div>
    <div class="col-md-8">
      <div class="movie-title-and-rating">
        <h2 class="movie-name">
          ${data.Title} <span class="rated">${data.Rated}</span>
        </h2>
      </div>
      <div class="movie-small-deets movie-deets">
        <p class="movie-deets rating">⭐️ ${data.imdbRating}</p>
        <p class="movie-duration">${data.Runtime}</p>
        <p class="movie-category"> ${data.Genre} </p>
        <p class="watchlist">
          <strong
            ><i class="bi bi-plus-circle-fill"></i> Watchlist</strong
          >
        </p>
      </div>
      <div class="movie-description">
        <p class="movie-info-text">
          ${data.Plot}
        </p>
      </div>
    </div>
  </article>
    `;
    });
}
