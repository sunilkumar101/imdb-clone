// Automatically display favorites movie after favourites.html page is loaded
document.addEventListener('DOMContentLoaded',()=> {
    displayFavourites();
});

// Function to display favourites movies
function displayFavourites() {
    const favouritesListContainer = document.getElementById('favouritesList');
    favouritesListContainer.innerHTML = '';

    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favouritesList.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your favourites list is empty.';
        favouritesListContainer.appendChild(emptyMessage);
    } else {
        favouritesList.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('card', 'col-md-4', 'mb-4');
            movieCard.innerHTML = `
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <button class="btn btn-danger btn-sm remove-button" data-imdbid="${movie.imdbID}">Remove from favourite list</button>
                    <a href="movie.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button">Details</a>
                </div>
            `;
            favouritesListContainer.appendChild(movieCard);
        });
    }

    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromFavourites);
    });
}

// Function to remove a movie from the favorites list
function removeFromFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    const movieToRemove = favouritesList.find(movie => movie.imdbID === imdbID);
    if (movieToRemove) {
        const updatedFavouritesList = favouritesList.filter(movie => movie.imdbID !== imdbID);
        localStorage.setItem('favourites', JSON.stringify(updatedFavouritesList));
        alert(`${movieToRemove.Title} has been removed from your favorites!`);
        displayFavourites(); // Refresh the favorites list
    } else {
        alert('Movie not found in favorites!');
    }
}

