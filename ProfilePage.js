document.getElementById('userName').textContent = localStorage.getItem('name') || '';
 
// Function to update the user's profile
function updateProfile() {
// Get updated data from input fields
const updatedName = document.getElementById('nameInput').value;
const updatedDob = document.getElementById('dobInput').value;
const updatedAge = document.getElementById('ageInput').value;
const updatedWeight = document.getElementById('weightInput').value;
const updatedHeight = document.getElementById('heightInput').value;
const updatedSex = document.getElementById('sexInput').value;
const updatedRank = document.getElementById('rankInput').value;
const updatedGym = document.getElementById('gymInput').value;

// Save the updated data to local storage
localStorage.setItem('name', updatedName);
localStorage.setItem('dob', updatedDob);
localStorage.setItem('age', updatedAge);
localStorage.setItem('weight', updatedWeight);
localStorage.setItem('height', updatedHeight);
localStorage.setItem('sex', updatedSex);
localStorage.setItem('rank', updatedRank);
localStorage.setItem('gym', updatedGym);
}

// Function to populate input fields with saved profile data
function populateProfileData() {
document.getElementById('nameInput').value = localStorage.getItem('name') || '';
document.getElementById('dobInput').value = localStorage.getItem('dob') || '';
document.getElementById('ageInput').value = localStorage.getItem('age') || '';
document.getElementById('weightInput').value = localStorage.getItem('weight') || '';
document.getElementById('heightInput').value = localStorage.getItem('height') || '';
document.getElementById('sexInput').value = localStorage.getItem('sex') || '';
document.getElementById('rankInput').value = localStorage.getItem('rank') || '';
document.getElementById('gymInput').value = localStorage.getItem('gym') || '';
}

// Call populateProfileData when the page loads to fill in the input fields with saved data
populateProfileData();


document.getElementById('profile-icon').addEventListener('click', openProfilePage);

function openTab(event, tabName) {
    // Get all elements with class "box" and hide them
    var tabs = document.querySelectorAll(".box");
    tabs.forEach(function (tab) {
        tab.style.display = "none";
    });

    // Get all elements with class "tab-button" and remove the "active" class
    var tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    // Show the selected tab and set the button as "active"
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
}

// Initially, show the Home tab and set the Home button as "active"
openTab(null, "homeScreen");