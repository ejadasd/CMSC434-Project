const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'f7fc2024';
const APP_key = '0eed8476b12866be3ebb676637ee23b2';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=30`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
}

function generateHTML(results){

    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                <button onclick="save('${result.recipe.url}','${result.recipe.label}');"><ion-icon name="bookmark-outline"></ion-icon></button>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
            <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}

function save(link, label) {
    var new_data = {name: label, url: link};

    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);

    localStorage.setItem('data', JSON.stringify(old_data));
}

function view() {
    var list = [];
    if (localStorage.getItem('data') != null) {
        list = JSON.parse(localStorage.getItem('data'));
    }
    let genHTML = '';
    for (let value of list) {
        genHTML += 
        `
        <div class="item">
            <div class="flex-container">
                <h1 class="title">${value.name}</h1>
                <a class="view-button" href="${value.url}" target="_blank">View Recipe</a>
            </div>
        </div>
        `;
    }

    searchResultDiv.innerHTML = genHTML;
}