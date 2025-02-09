const API_KEY = '1060c5dc97a1880eeb055acc75415df0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function getMovieDetails() {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
    const movie = await response.json();

    const director = movie.credits.crew.find(person => person.job === "Director");

    document.getElementById("movieDetails").innerHTML = `
        <div class="movie-detail">
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <div class="info">
                <h1>${movie.title}</h1>
                <p><strong>Director:</strong> ${director ? director.name : "N/A"}</p>
                <p><strong>Duration:</strong> ${movie.runtime} mins</p>
                <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;

    getCast();
    getRecommendations();
}

async function getCast() {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();

    const container = document.getElementById("castContainer");
    container.innerHTML = data.cast.slice(0, 5).map(actor => `
        <div class="movie-card">
            <img src="${IMG_URL + actor.profile_path}" alt="${actor.name}">
            <h3>${actor.name}</h3>
            <p>${actor.character}</p>
        </div>
    `).join("");
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

getMovieDetails();
getRecommendations();