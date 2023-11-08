window.addEventListener("load", loadProfileData);
window.addEventListener("load", loadData);
window.addEventListener("load", loadWeightGraph);

function openProfilePage() {
    window.location.href = 'ProfilePage.html';
    populateProfileData();
}

function loadProfileData() {
    const storedProfileData = localStorage.getItem("profileData0101-02");
    if (storedProfileData) {
      const profileData = JSON.parse(storedProfileData);

      const userName = profileData.name;
      document.getElementById('userName').textContent = userName;
      const userStartWeight = profileData.startWeight;
      document.getElementById('userStartWeight').textContent = userStartWeight;
      const userHeightFeet = profileData.heightFeet;
      const userHeightInches = profileData.heightInches;
      const userHeight = (userHeightFeet * 12) + userHeightInches/10;
      const userStartBMI = (703 * userStartWeight)/(userHeight*userHeight);
      document.getElementById('userStartBMI').textContent = userStartBMI.toFixed(4);

      const userCurrWeight = profileData.currWeight;
      document.getElementById('userCurrWeight').textContent = userCurrWeight;
      const userCurrBMI = (703 * userCurrWeight)/(userHeight*userHeight);
      document.getElementById('userCurrBMI').textContent = userCurrBMI.toFixed(4);  

      const totalWater = userCurrWeight/2;
      document.getElementById('totalWater').textContent = totalWater;
    }
  }

  //this is currrent weight, water, and calories
function loadData() {
    let waterDrank = JSON.parse(localStorage.getItem('userWater')) || [];
    waterDrank = waterDrank[waterDrank.length-1];
    document.getElementById('waterDrank').textContent = waterDrank;

    let calories = JSON.parse(localStorage.getItem('userCalorie')) || [];
    calories = calories[calories.length-1];
    document.getElementById('calories').textContent = calories;

    let storedTargetCalorie = JSON.parse(localStorage.getItem('targetCalorie')) || [];
    storedTargetCalorie = storedTargetCalorie[storedTargetCalorie.length-1];
    document.getElementById('totalCalories').textContent = storedTargetCalorie;
}

function loadWeightGraph() {
// Retrieve the dynamic graph data from local storage
const graphData = JSON.parse(localStorage.getItem("weightGraph"));

// Create a new chart using the retrieved data
const ctx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(ctx, {
    type: "line",
    data: graphData,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 200,
            },
        },
    },
});
}


document.getElementById('profile-icon').addEventListener('click', openProfilePage);

function openTab(event, tabName) {
    loadProfileValues();

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