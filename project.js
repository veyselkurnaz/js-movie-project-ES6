const form = document.getElementById("movie-form");
const titleElement = document.querySelector('#title');
const directorElement = document.querySelector('#director');
const urlElement = document.querySelector('#url');
const cardBody = document.querySelectorAll(".card-body")[1]; //We have 2 card-body class, we want second one
const clear = document.getElementById("clear-movies");



//Load all event

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addMovie);
    document.addEventListener("DOMContentLoaded", function () {
        let movies = Storage.getMoviesFromStorage();
        UI.loadAllMovies(movies);
    });

    cardBody.addEventListener("click", deleteMovie);
    clear.addEventListener("click", clearAllMovies);
}

function addMovie(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        //error
        UI.displayMessages("Please fill out all required fields", "danger")
    } else {
        //New Movie
        const newMovie = new Movie(title, director, url);
        UI.addMovieToUI(newMovie); // Add movie to UI
        Storage.addMovieToStorage(newMovie); // Add movie to Browser's Local Storage
        UI.displayMessages("Movie successfully added", "success")
    }

    UI.clearInputs(titleElement, urlElement, directorElement);

    e.preventDefault();
}

function deleteMovie(e) {
    if (e.target.id === "delete-movie") {
        UI.deleteMovieFromUI(e.target);
        Storage.deleteMovieFromStorage(e.target.previousElementSibling.previousElementSibling.textContent);
        //We got the name of the movie in the top line

        UI.displayMessages("Successfully deleted", "success");
    }
}

function clearAllMovies() {
    if (confirm("Are you sure ?")) {
        UI.clearAllMoviesFromUI();
        Storage.clearAllMoviesFromStorage();
    }
}