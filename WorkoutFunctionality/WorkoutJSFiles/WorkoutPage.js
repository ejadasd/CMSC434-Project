// put a reminder somewhere that you might have to tell the TAs to clear their localStorage before running our app.
// I'm just worried as I used the localStorage to persist data store but they might have other people's localStorage overriding our stuff.
// WorkoutPage.js




if(!localStorage.getItem("firstLoadDone921")){
  let mockedData = [
    {
      id: 1,
      name: "Push-up",
      muscles: ["Chest", "Triceps", "Shoulders"],
      instructions:
        "Keep your back straight and lower your body until your chest almost touches the floor.",
      weight: 20,
      reps: 15,
      difficulty: "Beginner",
    },
    {
      id: 2,
      name: "Pull-up",
      muscles: ["Back", "Biceps"],
      instructions:
        "Hang from a bar with your palms facing out and pull yourself up until your chin is level with the bar.",
      weight: 30,
      reps: 10,
      difficulty: "Intermediate",
    },
    {
      id: 3,
      name: "Squat",
      muscles: ["Quadriceps", "Hamstrings", "Glutes"],
      instructions:
        "Keep your feet shoulder-width apart and your back straight. Bend your knees and lower your hips as if you are going to sit on a chair.",
      weight: 30,
      reps: 20,
      difficulty: "Beginner",
    },
  ];
  localStorage.setItem("firstLoadDone921", "true");
  localStorage.setItem("WorkoutDatabase195", JSON.stringify(mockedData));
}

document.getElementById("show-form-btn").addEventListener("click", () => {
  document.getElementById("exercise-form").style.display = "block";
});

document
  .getElementById("new-exercise-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const weightValue = parseInt(document.getElementById("weight").value);
    const repsValue = parseInt(document.getElementById("reps").value);
    if (weightValue <= 0 || repsValue <= 0){
      alert("Please Enter Repetitions or Weight Greater Than 0");
    } else{
      addExercise();
      displayExercises();
      this.reset();
      document.getElementById("exercise-form").style.display = "none";
    }
  });

function addExercise() {
  let exercises = getWorkoutDatabase();
  const newId = exercises.length > 0 ? Math.max(...exercises.map((e) => e.id)) + 1 : 1;
  const newExercise = {
    id: newId,
    name: document.getElementById("exercise-name").value,
    muscles: document
      .getElementById("muscles-targeted")
      .value.split(",")
      .map((m) => m.trim()),
    instructions: document.getElementById("instructions").value,
    weight: parseInt(document.getElementById("weight").value),
    reps: parseInt(document.getElementById("reps").value),
    difficulty: document.getElementById("difficulty").value,
  };
    addToWorkoutDatabase(newExercise);
}

document
  .getElementById("difficulty-filter")
  .addEventListener("change", displayExercises);

function displayExercises() {
  const list = document.getElementById("exercise-list");
  list.innerHTML = "";

  const selectedDifficulty = document.getElementById("difficulty-filter").value;
  let exercises = getWorkoutDatabase();
  let filteredExercises = exercises;

  if (selectedDifficulty !== "all") {
    filteredExercises = exercises.filter(
      (exercise) => exercise.difficulty === selectedDifficulty
    );
  }

  filteredExercises.forEach((exercise) => {
    const exerciseDiv = document.createElement("div");
    exerciseDiv.className = "exercise";

    const formHTML = `
  <div id="form-${exercise.id}" class="exercise-form" style="display:none;">
  <label>Name:</label> <input type="text" class="editable" value="${
    exercise.name
  }"><br>
  <label>Muscles:</label> <input type="text" class="editable" value="${exercise.muscles.join(
    ", "
  )}"><br>
  <label>Instructions:</label> <textarea class="editable">${
    exercise.instructions
  }</textarea><br>
  <label>Weight (lbs):</label> <input type="number" class="editable" value="${
    exercise.weight
  }"><br>
  <label>Reps:</label> <input type="number" class="editable" value="${
    exercise.reps
  }"><br>
  <label>Difficulty:</label> <select class="editable">
  <option value="Beginner" ${
    exercise.difficulty === "Beginner" ? "selected" : ""
  }>Beginner</option>
  <option value="Intermediate" ${
    exercise.difficulty === "Intermediate" ? "selected" : ""
  }>Intermediate</option>
  <option value="Advanced" ${
    exercise.difficulty === "Advanced" ? "selected" : ""
  }>Advanced</option>
  </select><br>
  <button type="button" onclick="saveExercise(${exercise.id})">Save</button>
  </div>`;

    exerciseDiv.innerHTML = `
  <div id="view-${exercise.id}">
  <h3>${exercise.name}</h3>
  <p><strong>Muscles:</strong> ${exercise.muscles.join(", ")}</p>
  <p><strong>Instructions:</strong> ${exercise.instructions}</p>
  <p><strong>Weight (lbs):</strong> ${exercise.weight}</p>
  <p><strong>Reps:</strong> ${exercise.reps}</p>
  <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
  <button onclick="editExercise(${exercise.id})">Edit</button>
  <button onclick="deleteExercise(${exercise.id})">Delete</button>
  <button onclick="addWorkoutFromDatabaseToCurr(${
    exercise.id
  })">Add to Current Workout</button>
  </div>
  ${formHTML}
  `;
    list.appendChild(exerciseDiv);
  });
}

function getWorkoutDatabase() {
  let exercises = localStorage.getItem("WorkoutDatabase195");
  exercises = exercises ? JSON.parse(exercises) : [];
  return exercises;
}
function addToWorkoutDatabase(exercise){
  let exercises = localStorage.getItem("WorkoutDatabase195");
  exercises = exercises ? JSON.parse(exercises) : [];
  exercises.push(exercise);
  exercises = JSON.stringify(exercises);
  localStorage.setItem("WorkoutDatabase195", exercises);
}


function getCurrentWorkouts() {
  let curr_exercises = localStorage.getItem("exercise195");
  curr_exercises = curr_exercises ? JSON.parse(curr_exercises) : [];
  return curr_exercises;
}
function modifyCurrentWorkouts(exercise) {
  console.log("Here 5");
  let curr_exercises = localStorage.getItem("exercise195");
  curr_exercises = curr_exercises ? JSON.parse(curr_exercises) : [];
  curr_exercises.push(exercise);
  console.log(curr_exercises);
  curr_exercises = JSON.stringify(curr_exercises);
  localStorage.setItem("exercise195", curr_exercises);
}

function generateUniqueId(id) {
  let uniqueId = id;
  let curr_exercises = getCurrentWorkouts();
  let idExists = curr_exercises.some((exercise) => exercise.id === uniqueId);
  while (idExists) {
    uniqueId++;
    idExists = curr_exercises.some((exercise) => exercise.id === uniqueId);
  }
  return uniqueId;
}

function addWorkoutFromDatabaseToCurr(exerciseId) {
  if(confirm("Click ok to confirm the addition of this exercise to the workout database")){
    let exercises = getWorkoutDatabase();
    let curr_workout = exercises.find((exercise) => exercise.id === exerciseId);
    // deep copy of curr_workout
    //   issue: Exercises with specific ids; Curr_exercises which will just be copies of the same id ;The issue is if you add multiple of the same exercises into curr_exercises
    let uniqueIdForCopyOfCurrentWorkout = generateUniqueId(exerciseId);
    let copyOfCurrWorkout = structuredClone(curr_workout);
    copyOfCurrWorkout.id = uniqueIdForCopyOfCurrentWorkout;
    modifyCurrentWorkouts(copyOfCurrWorkout);
  }
}

function deleteExercise(exerciseId) {
  let exercises = getWorkoutDatabase();
  exercises = exercises.filter((exercise) => exercise.id !== exerciseId);
  exercises = JSON.stringify(exercises);
  localStorage.setItem("WorkoutDatabase195", exercises);
  displayExercises();
}
// I need to fix the issue where if I add the same exercise in multiple times, it messes up. It's because they have the same id and so if you want to delete one of the exercises within the current exercise list, it deletes both of them.

function saveExercise(exerciseId) {
  const form = document.getElementById(`form-${exerciseId}`);
  const inputs = form.getElementsByClassName("editable");

  const updatedExercise = {
    name: inputs[0].value,
    muscles: inputs[1].value.split(",").map((m) => m.trim()),
    instructions: inputs[2].value,
    weight: parseInt(inputs[3].value),
    reps: parseInt(inputs[4].value),
    difficulty: inputs[5].value,
  };
  if (updatedExercise.weight <= 0 || updatedExercise.reps <= 0) {
    alert("Please Enter in Repetitions or Weight Greater Than 0");
  } else {
    let exercises = getWorkoutDatabase();
    const exerciseIndex = exercises.findIndex((e) => e.id === exerciseId);
    exercises[exerciseIndex] = {
      ...exercises[exerciseIndex],
      ...updatedExercise,
    };

    document.getElementById(`view-${exerciseId}`).style.display = "block";
    document.getElementById(`form-${exerciseId}`).style.display = "none";
    exercises = JSON.stringify(exercises);
    localStorage.setItem("WorkoutDatabase195", exercises);
    displayExercises();
  }
}

function editExercise(exerciseId) {
  document.getElementById(`view-${exerciseId}`).style.display = "none";
  document.getElementById(`form-${exerciseId}`).style.display = "block";
}

displayExercises();
