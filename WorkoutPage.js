// Fake database of workouts
const workouts = [
  {
    name: 'Push-Up',
    muscles: 'Chest, Triceps',
    steps: 'Hands on ground, push up and down',
    level: 'Beginner'
  },
  {
    name: 'Squat',
    muscles: 'Legs, Glutes',
    steps: 'Stand, go down, stand up',
    level: 'Beginner'
  },
  {
    name: 'Deadlift',
    muscles: 'Back, Legs',
    steps: 'Lift barbell from ground',
    level: 'Advanced'
  }
];

// User's workouts
const userWorkouts = [];

// Fill in the workout list
const workoutList = document.getElementById('workout-list');
workouts.forEach((workout, index) => {
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item';
  listItem.innerHTML = `
    <h3>${workout.name} (Level: ${workout.level})</h3>
    <p>Muscles: ${workout.muscles}</p>
    <p>Steps: ${workout.steps}</p>
    <button onclick="addToUserWorkouts(${index})" class="btn btn-primary">Add to My Workouts</button>
  `;
  workoutList.appendChild(listItem);
});

// Function to add workouts to user's list
function addToUserWorkouts(index) {
  userWorkouts.push(workouts[index]);

  // Update user's workout list
  const userWorkoutList = document.getElementById('user-workout-list');
  userWorkoutList.innerHTML = '';
  userWorkouts.forEach(workout => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `
      <h3>${workout.name} (Level: ${workout.level})</h3>
      <p>Muscles: ${workout.muscles}</p>
      <p>Steps: ${workout.steps}</p>
    `;
    userWorkoutList.appendChild(listItem);
  });
}
