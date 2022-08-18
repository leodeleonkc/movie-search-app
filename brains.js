"use strict";
// Search Button
const searchButton = document.getElementById("search-go");

// Search Query
const searchQuery = document.getElementById("search-query");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  findMovie();
});

function findMovie() {
  fetch(
    `http://www.omdbapi.com/?apikey=98a9f83d&s=${searchQuery.value}&type=movie`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
