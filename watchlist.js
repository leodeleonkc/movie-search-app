"use strict";
// Watchlist Container
const dynamicWatchlist = document.getElementById("dynamic-watchlist");

//  Toggle empty watchlist
const emptyWatchlist = document.querySelector(".invalid-search");

// Retrieve Movies from locally hosted array

let retrieveWatchList = JSON.parse(localStorage.getItem("watchList"));
retrieveWatchList.map(async function (imdbID) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=98a9f83d&i=${imdbID}`
  );
  const data = await res.json();

  renderWatchList(data);
});

// Render the movie watchlist

function renderWatchList(data) {
  emptyWatchlist.classList.add("hidden");

  dynamicWatchlist.innerHTML += `
    <article class="row ${data.imdbID}" id="content">
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
          ${data.Title} <span class="rated">(${data.Year}) - ${data.Rated}</span>
        </h2>
      </div>
      <div class="movie-small-deets movie-deets">
        <p class="movie-deets rating">⭐️ ${data.imdbRating}</p>
        <p class="movie-duration">${data.Runtime}</p>
        <p class="movie-category"> ${data.Genre} </p>
         <p class="already-added" onclick="removeFromWatchList('${data.imdbID}')">
          <strong
            ><i class="bi bi-x-circle-fill"></i> Remove</strong
          >
        </p>
        <p class="added hidden">
        <strong
          ><i class="bi bi-clipboard-check-fill"></i> Added!</strong
        >
      </p>
      <p class="already-added hidden">
      <strong
        ><i class="bi bi-exclamation-triangle"></i> Already Added!</strong
      >
    </p>
      </div>
      <div class="movie-description">
        <p class="movie-plot">
          ${data.Plot}
        </p>
      </div>
    </div>
  </article>
    `;
}

function removeFromWatchList(savedImdbID) {
  retrieveWatchList.splice(retrieveWatchList.indexOf(savedImdbID), 1);
  window.localStorage.setItem("watchList", JSON.stringify(retrieveWatchList));
  document.querySelector(`.${savedImdbID}`).remove();
  if (retrieveWatchList.length === 0) emptyWatchlist.classList.remove("hidden");
}
