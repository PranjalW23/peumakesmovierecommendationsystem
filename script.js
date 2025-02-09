const API_KEY = '1060c5dc97a1880eeb055acc75415df0';  // Replace with your API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function searchMovies() {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();

    displayMovies(data.results);
}

function displayMovies(movies) {
    const container = document.getElementById("moviesContainer");
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
        `;

        movieCard.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        container.appendChild(movieCard);
    });
}
