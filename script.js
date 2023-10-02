const apiKey = "7bb6a191";
//event listener for search input field.
const inputField = document.getElementById("searchInput");
console.log(inputField);
inputField?.addEventListener("keyup", () => {
  let query = inputField.value;
  if (query.length > 0) {
    searchMovies(query)
      .then((results) => {
        console.log(results);
        displaySearchResults(results);
        // Store the search results in LocalStorage
        localStorage.setItem("searchResults", JSON.stringify(results));
      })
      .catch((error) => console.error("Error searching movies:", error));
  }
});

//function to search the movie.
async function searchMovies(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data.Search || [];
}

// Function to display search results on the index.html page
function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById("searchResults");
  searchResultsContainer.innerHTML = "";

  results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("card", "col-md-4", "mt-3");
    movieCard.innerHTML = `
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <button class="btn btn-primary btn-sm favourite-button" data-imdbid="${movie.imdbID}">Add to Favourites</button>
                <a href="movieDetail.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button">Details</a>
            </div>
        `;
    searchResultsContainer.appendChild(movieCard);
  });

  const favouriteButtons = document.querySelectorAll(".favourite-button");
  favouriteButtons.forEach((button) => {
    button.addEventListener("click", addToFavourites);
  });
}

// Function to add a movie to favourites
async function addToFavourites(event) {
  const imdbID = event.target.dataset.imdbid;
  console.log(imdbID);
  const movie = await getMovieDetails(imdbID);
  console.log(movie);
  if (movie) {
    const favouritesList = JSON.parse(localStorage.getItem("favourites")) || [];
    console.log(favouritesList);
    if (!favouritesList.some((m) => m.imdbID === movie.imdbID)) {
      favouritesList.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favouritesList));
      alert(`${movie.Title} has been added to your favourites!`);
    } else {
      alert(`${movie.Title} is already in your favourites!`);
    }
  }
}

// Function to get movie details by IMDb ID
async function getMovieDetails(imdbID) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
  );
  const data = await response.json();
  console.log(data);
  return data.Response === "True" ? data : null;
}

// Automatically display the search results from previous search
const previousSearchResults = JSON.parse(localStorage.getItem("searchResults"));
if (previousSearchResults && previousSearchResults.length > 0) {
  displaySearchResults(previousSearchResults);
}
