// get user click to add event listener
let createBtn = document.querySelector("#create_button")
createBtn.addEventListener("click", handleClick);


function handleClick(e) {
    // get user text input for search and store in a var
    const searchInput = e.target.parentElement.children[0].value;
    // console.log(searchInput)
    // clearing text-input to reset the input field
    e.target.parentElement.children[0].value = "";

    // create card based on user input and append the card to the body
    let createdCard = createCard(searchInput);
    document.querySelector("#my_div").appendChild(createdCard);
}


function createCard(userInput) {
    // create a div to store created cards
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "20rem";
    card.style.height = "auto";

    // add title, and buttons to the created card
    card.innerHTML = `
    <div class="card-body">
    <h5 class="card-title text-center">${userInput}</h5>
    <button name="movie_btn" class="btn btn-primary">Display Movies</button>
    <button name="gif_btn"  class="btn btn-primary">Display Gifs</button>
    </div>`;

    // create event listeners to created buttons inside the card
    const movieBtn = card.children[0].children[1];
    movieBtn.addEventListener("click", getMovies);

    const gifBtn = card.children[0].children[2];
    gifBtn.addEventListener("click", getGifs)

    // console.log(card);

    return card;
}


function getMovies(e) {
    // get searchKeyword from the card
    const searchKeyWord = e.target.parentElement.children[0].innerHTML;
    console.log(searchKeyWord);

    // create URL to make API calls
    const apiKey = "f192a57a";
    const URL = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchKeyWord}`;
    console.log(URL);

    // fetch data using the URL above, parse to JSON, and storing the resulting data (res.Search)
    fetch(URL)
        .then((response) => response.json())
        .then((res) => {
            const movies = res.Search;
            console.log(movies);
            document.getElementById("container").innerHTML = ""; // setting the container to blank so it will load the content in slow networks
            displayMovies(movies);  // delegating below to show gifs in container
        })
        .catch((err) => console.log(err));
}


function displayMovies(films) {
    // using for-of loop to extract title, year adn posterUrl to display ot the user
    for (const film of films) {
        const title = film.Title;
        const year = film.Year;
        const posterUrl = film.Poster;

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = `
            <img src = ${posterUrl} class = "card-img-top" alt=${title}>
            <div class="card-body">
            <p class="card-text">
            Title: ${title} <br>
            Year: ${year} </p>
            </div>
            `;
        document.getElementById("container").appendChild(card);

    }
}


function getGifs(e) {
    const searchKeyWord = e.target.parentElement.children[0].innerHTML;
    console.log(searchKeyWord);

    // build url using api key and limit to 12 results
    const apiKey = "HnjTa3OFMAQ4fU1Ee82yCcyU4I6NsKwl";
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchKeyWord}&limit=12`; // using apiKey and user input to create the url
    // console.log(URL);

    // use the created URL to make GET request to get data from API and store that data in a variable
    fetch(URL)
        .then((response) => response.json())
        .then((gifs) => {
            const giphies = gifs.data;
            // console.log(giphies);
            document.getElementById("container").innerHTML = ""; // setting the container to blank so it will load the content in slow networks
            showGifs(giphies);  // delegating below to show gifs in container
        })
        .catch((err) => console.log(err));
}

function showGifs(gifs) {
    for (const gif of gifs) {
        const title = gif.title;
        const imageUrl = gif.images.fixed_height_small.url;

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = `
            <img src=${imageUrl} class="card-img-top" alt=${title}>
            <div class="card-body">
            <p class="card-text">
            ${title}</p>
            </div>
            `;
        document.getElementById("container").appendChild(card);
    }
}