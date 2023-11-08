// Function to update the profile
function updateProfile() {
    // Get the values from the input fields
    const name = document.getElementById("nameInput").value;
    const dob = document.getElementById("dobInput").value;
    const age = document.getElementById("ageInput").value;
    const startWeight = document.getElementById("weightInputStart").value;
    const currWeight = document.getElementById("weightInputCurr").value;
    const heightFeet = document.getElementById("heightFeet").value;
    const heightInches = document.getElementById("heightInches").value;
    const sex = document.getElementById("sexInput").value;
    const rank = document.getElementById("rankInput").value;
    const gym = document.getElementById("gymInput").value;
  
    // Save the updated profile data to localStorage
    const profileData = {
      name,
      dob,
      age,
      startWeight,
      currWeight,
      heightFeet,
      heightInches,
      sex,
      rank,
      gym,
    };
    localStorage.setItem("profileData0101-02", JSON.stringify(profileData));
  
    // Update the displayed name
    document.getElementById("userName").textContent = name;
  }
  
  // Function to load the profile data when the page loads
  function loadProfileData() {
    const storedProfileData = localStorage.getItem("profileData0101-02");
    if (storedProfileData) {
      const profileData = JSON.parse(storedProfileData);
  
      // Set the input field values
      document.getElementById("nameInput").value = profileData.name;
      document.getElementById("dobInput").value = profileData.dob;
      document.getElementById("ageInput").value = profileData.age;
      document.getElementById("weightInputStart").value = profileData.startWeight;
      document.getElementById("weightInputCurr").value = profileData.currWeight;
      document.getElementById("heightFeet").value = profileData.heightFeet;
      document.getElementById("heightInches").value = profileData.heightInches;
      document.getElementById("sexInput").value = profileData.sex;
      document.getElementById("rankInput").value = profileData.rank;
      document.getElementById("gymInput").value = profileData.gym;
  
      // Update the displayed name
      document.getElementById("userName").textContent = profileData.name;
    }
  }
  
  // Call the loadProfileData function when the page loads
  window.addEventListener("load", loadProfileData);
  

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
