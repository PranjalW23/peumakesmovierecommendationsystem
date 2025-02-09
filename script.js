const API_KEY = '1060c5dc97a1880eeb055acc75415df0'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchMovies();
    }
});

async function searchMovies() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();

    displayMovies(data.results, "trendingContainer"); 
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
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


async function fetchMovies(url, containerId) {
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.results.forEach(movie => {
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

async function fetchTrendingMovies() {
    await fetchMovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, "trendingContainer");
}

async function fetchNewMovies() {
    await fetchMovies(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`, "newMoviesContainer");
}

async function fetchGenreMovies() {
    const genreId = document.getElementById("genreSelect").value;
    await fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`, "genreMoviesContainer");
}
async function getRecommendations() {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    const data = await response.json();

    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = ""; // Clear old results

    if (data.results.length === 0) {
        recommendationsContainer.innerHTML = "<p>No similar movies found.</p>";
        return;
    }

    data.results.slice(0, 6).forEach(movie => { // Show up to 6 similar movies
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

        recommendationsContainer.appendChild(movieCard);
    });
}

searchMovies();
fetchTrendingMovies();
fetchNewMovies();
fetchGenreMovies();
getRecommendations();
