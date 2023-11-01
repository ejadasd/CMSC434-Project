function openProfilePage() {
    window.location.href = 'profilepage.html';
    loadProfileValues();
}

document.getElementById('userName').textContent = localStorage.getItem('name') || '';

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