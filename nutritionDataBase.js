const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const fil = document.querySelector('.filter');
const sub = document.querySelector('.sub');
const container = document.querySelector('.container');
let searchQuery = '';




let recipeList = [{image: "recipeImage/PomeloNoodleSalad.jpg", label: "Pomelo Noodle Salad", link: "http://www.101cookbooks.com/archives/pomelo-noodles-recipe.html", calo: 1482, carbs: 177, fat: 63, protein: 79},
                {image: "recipeImage/PastaCarbonaraLight.jpg", label: "Pasta Carbonara Light", link: "http://www.self.com/fooddiet/recipes/2010/03/pasta-carbonara-light", calo: 2749, carbs: 388, fat: 69, protein: 134},
                {image: "recipeImage/BakedTofu.jpg", label: "Baked Tofu", link: "https://www.marthastewart.com/1049665/baked-tofu", calo: 775, carbs: 13, fat: 54, protein: 72},
                {image: "recipeImage/ChiaOats.jpg", label: "Chia & Almond Overnight Oats", link: "https://www.bbcgoodfood.com/recipes/chia-almond-overnight-oats", calo: 1538, carbs: 223, fat: 53, protein: 57},
                {image: "recipeImage/Burrito.jpg", label: "Black Bean & Feta Stuffed Burrito", link: "https://www.realsimple.com/food-recipes/browse-all-recipes/black-bean-feta-stuffed-burrito", calo: 2904, carbs: 251, fat: 155, protein: 144},
                {image: "recipeImage/LettuceWrap.png", label: "Vegetarian Lettuce Wraps", link: "http://www.eatingwell.com/recipe/278135/vegetarian-lettuce-wraps/", calo: 701, carbs: 53, fat: 37, protein: 50},
                {image: "recipeImage/EggSandwich.jpg", label: "Egg Salad Sandwich", link: "http://www.myrecipes.com/recipe/egg-salad-sandwich", calo: 1991, carbs: 171, fat: 103, protein: 90},
                {image: "recipeImage/BakedCauli.jpg", label: "Baked Cauliflower", link: "http://honestcooking.com/delicious-side-dish-baked-cauliflower/", calo: 221, carbs: 31, fat: 9, protein: 11},
                {image: "recipeImage/pizza.jpg", label: "Chorizo, Caper & Rocket Pizza", link: "http://www.bbcgoodfood.com/recipes/1506638/chorizo-caper-and-rocket-pizza", calo: 1029, carbs: 119, fat: 42, protein: 39},
                {image: "recipeImage/salmon.jpg", label: "Red Pistou Salmon", link: "http://www.frenchrevolutionfood.com/2011/05/french-in-a-flash-so-easy-red-pistou-salmon/", calo: 427, carbs: 3, fat: 28, protein: 35}];



function save(link, label) {


    var new_data = {name: label, url: link};
    var test =[];
    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', '[]');
        var old_data = JSON.parse(localStorage.getItem('data'));
        old_data.push(new_data);

        localStorage.setItem('data', JSON.stringify(old_data));
    }
    else {
        test = JSON.parse(localStorage.getItem('data'));
        if (test.some(e => e.name == label)) {
            alert("This recipe is already saved!");
        }
        else{
            var old_data = JSON.parse(localStorage.getItem('data'));
            old_data.push(new_data);

            localStorage.setItem('data', JSON.stringify(old_data));
        }
    }

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
                <button onclick="delete_recipe('${value.name}')"><ion-icon name="close-circle-outline"></ion-icon></button>
            </div>
        </div>
        `;
    }
    fil.style.visibility = 'hidden';
    sub.style.visibility = 'hidden';
    searchResultDiv.innerHTML = genHTML;
}

function delete_recipe (label) {
    var temp = [];
    var index = 0;
    var list = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < list.length; i++) {
        if (list[i].name == label) {
            index = i;
        }
    }

    list.splice(index,1);
    localStorage.setItem('data', JSON.stringify(list));
    temp = JSON.parse(localStorage.getItem('data'));
    let genHTML = '';
    if (temp.length == 0) {
        searchResultDiv.innerHTML = 
        `
        <div class="item">
        </div>
        `
    }
    else {
        for (let value of temp) {
            genHTML += 
            `
            <div class="item">
                <div class="flex-container">
                    <h1 class="title">${value.name}</h1>
                    <a class="view-button" href="${value.url}" target="_blank">View Recipe</a>
                    <button onclick="delete_recipe('${value.name}')"><ion-icon name="close-circle-outline"></ion-icon></button>
                </div>
            </div>
            `;
        }

        searchResultDiv.innerHTML = genHTML;
    }
}

function sort_arr() {
    let nutri_fact = document.getElementById("feature").value;
    let condi = document.getElementById("sort").value
    let html = '';
    if (nutri_fact == "Calories") {
        if (condi == "Ascending") {
            recipeList.sort(function(a,b) {
                return a.calo - b.calo
            });
        }
        else if (condi == "Descending") {
            recipeList.sort(function(a,b) {
                return b.calo - a.calo
            });
        }

        for (let value of recipeList) {
            html += 
            `
            <div class="item">
                <img src="${value.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${value.label}</h1>
                    <a class="view-button" href="${value.link}" target="_blank">View Recipe</a>
                    <button class="icon" onclick="save('${value.link}','${value.label}')"><ion-icon name="bookmark-outline"></ion-icon></button>
                </div>
                <p class="item-data">Calories: ${value.calo} g</p>
                <p class="item-data">Carbs: ${value.carbs} g</p>
                <p class="item-data">Fat: ${value.fat} g</p>
                <p class="item-data">Protein: ${value.protein} g</p>
            </div>
            `;
        }
    }
    else if (nutri_fact == "Carbs") {
        if (condi == "Ascending") {
            recipeList.sort(function(a,b) {
                return a.carbs - b.carbs
            });
        }
        else if (condi == "Descending") {
            recipeList.sort(function(a,b) {
                return b.carbs - a.carbs
            });
        }

        for (let value of recipeList) {
            html += 
            `
            <div class="item">
                <img src="${value.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${value.label}</h1>
                    <a class="view-button" href="${value.link}" target="_blank">View Recipe</a>
                    <button onclick="save('${value.link}','${value.label}')"><ion-icon name="bookmark-outline"></ion-icon></button>
                </div>
                <p class="item-data">Calories: ${value.calo} g</p>
                <p class="item-data">Carbs: ${value.carbs} g</p>
                <p class="item-data">Fat: ${value.fat} g</p>
                <p class="item-data">Protein: ${value.protein} g</p>
            </div>
            `;
        }
    }
    else if (nutri_fact == "Fat") {
        if (condi == "Ascending") {
            recipeList.sort(function(a,b) {
                return a.fat - b.fat
            });
        }
        else if (condi == "Descending") {
            recipeList.sort(function(a,b) {
                return b.fat - a.fat
            });
        }

        for (let value of recipeList) {
            html += 
            `
            <div class="item">
                <img src="${value.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${value.label}</h1>
                    <a class="view-button" href="${value.link}" target="_blank">View Recipe</a>
                    <button onclick="save('${value.link}','${value.label}')"><ion-icon name="bookmark-outline"></ion-icon></button>
                </div>
                <p class="item-data">Calories: ${value.calo} g</p>
                <p class="item-data">Carbs: ${value.carbs} g</p>
                <p class="item-data">Fat: ${value.fat} g</p>
                <p class="item-data">Protein: ${value.protein} g</p>
            </div>
            `;
        }
    }
    else if (nutri_fact == "Protein") {
        if (condi == "Ascending") {
            recipeList.sort(function(a,b) {
                return a.protein - b.protein
            });
        }
        else if (condi == "Descending") {
            recipeList.sort(function(a,b) {
                return b.protein - a.protein
            });
        }

        for (let value of recipeList) {
            html += 
            `
            <div class="item">
                <img src="${value.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${value.label}</h1>
                    <a class="view-button" href="${value.link}" target="_blank">View Recipe</a>
                    <button onclick="save('${value.link}','${value.label}')"><ion-icon name="bookmark-outline"></ion-icon></button>
                </div>
                <p class="item-data">Calories: ${value.calo} g</p>
                <p class="item-data">Carbs: ${value.carbs} g</p>
                <p class="item-data">Fat: ${value.fat} g</p>
                <p class="item-data">Protein: ${value.protein} g</p>
            </div>
            `;
        }
    }


    searchResultDiv.innerHTML = html;
}