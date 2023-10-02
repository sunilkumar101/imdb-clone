const apiKey = "7bb6a191";

//event listener for movie details.
document.addEventListener("DOMContentLoaded", () => {
  console.log("hello");
  const urlParams = new URLSearchParams(window.location.search);
  const imdbID = urlParams.get("id");

  if (imdbID) {
    getMovieDetails(imdbID)
      .then((movie) => {
        if (movie) {
          displayMovieDetails(movie);
        } else {
          const movieDetailsContainer = document.getElementById("movieDetails");
          movieDetailsContainer.innerHTML = "<p>Movie details not found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error in fetching movie details:", error);
        const movieDetailsContainer = document.getElementById("movieDetails");
        movieDetailsContainer.innerHTML =
          "<p>Error fetching movie details.</p>";
      });
  }
});

// function for fetch movie details
async function getMovieDetails(imdbID) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
  );
  const data = await response.json();
  return data.Response === "True" ? data : null;
}

//function to display the movie datails.
function displayMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById("movieDetails");
  movieDetailsContainer.innerHTML = `
        <div class="card mb-2">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p>${movie.Plot}</p>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
            </div>
        </div>
    `;
}
