const accessKey = "r_jh1BIjqddG3svVVUzS0tO_IEQjojBgXmWmTcV5JUg";

const formEl = document.querySelector('form');
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector('.search-results');
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;    // take the input from the search bar
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}` // making an url to get all the items, but this one only gets the items to the console
    const response = await fetch(url);  // to take the data to us we need to fetch the data from the console using fetch function
    const data = await response.json(); // and after that we convert that data to be readable by us we use .json() function

    // console.log(data);
    if(page == 1) {
        searchResultsEl.innerHTML = "";
    }

    const results = data.results;       // it becomes an array of the data items

    results.map((result) => {   // we were looping throungh an array
        const imageWrapper = document.createElement('div');     // creating a new element to store the image and the anchor tag
        imageWrapper.classList.add('search-result');    // assign a class search-result to imageWrapper

        const image = document.createElement('img'); // creating a new element image to store the images src and alt_description
        image.src = result.urls.small;  // creating a source of the image
        image.alt = result.alt_description; // creating a alternative of the image

        const imageLink = document.createElement('a'); // creating a anchor tag to store the link of the image 
        imageLink.href = result.links.html; // storing the link
        imageLink.target = "_blank";    // making sure that the page should be open in the next tab
        imageLink.textContent = result.alt_description; // storing the alt descriptiont to the textContent

        imageWrapper.appendChild(image);    // append the image to the imageWrapper
        imageWrapper.appendChild(imageLink);    // append the imageLink to the imageWrapper

        searchResultsEl.appendChild(imageWrapper);  // append the imageWrapper to the searchResults 
    })

    page++;  // for showing the show more button after we search 

    if(page > 1) {
        showMoreButtonEl.style.display = "block";   // whenever the page becomes greater than 1 show more button will display
    } 
}

formEl.addEventListener("submit", (event) => {
    // event.preventDefault();         // to prevent the default value of the page
    page = 1;
    searchImages();     // calling the function
});

showMoreButtonEl.addEventListener("click", () => {
    searchImages();
})



