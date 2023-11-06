window.addEventListener("load", loadProfileData);  

function openProfilePage() {
    window.location.href = 'profilepage.html';
    populateProfileData();
}

function loadProfileData() {
    const storedProfileData = localStorage.getItem("profileData");
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
    }
  }

function loadWaterCaloriesData() {
    const userCurrWeight = localStorage.getItem("userWeight");
    document.getElementById('userCurrWeight').textContent = userCurrWeight;
    const userCurrBMI = (703 * userCurrWeight)/(userHeight*userHeight);
    document.getElementById('userCurrBMI').textContent = userCurrBMI.toFixed(4);

    
}

//   //comes from anthonys work
  
//     document.getElementById('userCurrBMI').textContent = userCurrBMI.toFixed(4);

//     //comes from anthony work
//     const waterDrank = userWaterDrank;
//     const calories = userCalories;
//   const totalCalories = totalCalories;

//   const totalWater = userCurrWeight/2;


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