document.getElementById('userName').textContent = localStorage.getItem('name') || '';
 
 // Function to load user data into input fields
 function loadUserData() {
    // Fetch user data from a database or any other source
    const userData = {
      name: "Brian Perry",
      dob: "10/10/1991",
      age: 31,
      weight: 165,
      height: "5'9",
      sex: "Male",
      rank: "Beginner",
      gym: "Epply",
    };

    // Populate input fields with user data
    document.getElementById('nameInput').value = userData.name;
    document.getElementById('dobInput').value = userData.dob;
    document.getElementById('ageInput').value = userData.age;
    document.getElementById('weightInput').value = userData.weight;
    document.getElementById('heightInput').value = userData.height;
    document.getElementById('sexInput').value = userData.sex;
    document.getElementById('rankInput').value = userData.rank;
    document.getElementById('gymInput').value = userData.gym;
  }

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

// You can also send the updated data to your server here if needed
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


  // Attach a click event listener to the profile icon element
  document.getElementById('profile-icon').addEventListener('click', openProfilePage);

  // Function to navigate to the profile page
  function openProfilePage() {
    // Replace 'profile.html' with the actual URL of your profile page
    window.location.href = 'profilepage.html';
  }

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