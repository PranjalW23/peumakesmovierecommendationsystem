const API_KEY = '1060c5dc97a1880eeb055acc75415df0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function getMovieDetails() {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const movie = await response.json();

    document.getElementById("movieDetails").innerHTML = `
        <div class="movie-detail">
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <div class="info">
                <h1>${movie.title}</h1>
                <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;

    getRecommendations();
}

async function getRecommendations() {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    const data = await response.json();
    
    const container = document.getElementById("recommendations");
    container.innerHTML = "";

    data.results.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        movieCard.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        container.appendChild(movieCard);
    });
}

getMovieDetails();
