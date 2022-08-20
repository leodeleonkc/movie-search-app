"use strict";
// Search Button
const searchButton = document.getElementById("search-go");

// Search Query
const searchQuery = document.getElementById("search-query");

// DOM HTML Container
const dynamicHtml = document.getElementById("dynamic-html");
const exploreImg = document.querySelector(".explore");
const invalidSearch = document.querySelector(".invalid-search");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  findMovie();
});

// Array of search results from initial fetch (empty for now)
let movies;

async function findMovie() {
  // Fetch the initial search query
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=98a9f83d&s=${searchQuery.value}&type=movie`
  );
  const firstData = await res.json();

  // Invalid response action
  if (firstData.Response === "True") {
    movies = Object.values(firstData.Search);
    // Loop through the returned object & new fetch request utilizing imdbID
    Render();
  } else {
    exploreImg.classList.add("hidden");
    invalidSearch.classList.remove("hidden");
  }
}

async function Render() {
  dynamicHtml.innerHTML = "";
  for (let { imdbID } of movies) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=98a9f83d&i=${imdbID}`
    );
    const data = await res.json();

    console.log(data);

    // Render HTML elements

    exploreImg.classList.add("hidden");
    invalidSearch.classList.add("hidden");
    dynamicHtml.innerHTML += `
            <article class="row" id="content">
            <div class="movie-poster col-md-3">
              <img
                src="${data.Poster}"
                alt="Movie Poster"
                class="movie-poster-img"
                onerror="this.onerror=null; this.src='images/default.jpg'"
              />
            </div>
            <div class="col-md-8">
              <div class="movie-title-and-rating">
                <h2 class="movie-name">
                  ${data.Title} <span class="rated">${data.Rated}</span>
                </h2>
              </div>
              <div class="movie-small-deets movie-deets">
              <p class="movie-deets year">🎬 ${data.Year}</p>
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
                <p class="movie-plot">
                  ${data.Plot}
                </p>
              </div>
              <hr>
            </div>
          </article>
            `;
  }
}
