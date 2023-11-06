// WorkoutCurrent.js


let curr_exercises = [] 


document.addEventListener("DOMContentLoaded", (event) => {
    let data = localStorage.getItem("exercise");
    curr_exercises = JSON.parse(data);
    console.log(curr_exercises);
    displayCurrExercises()
})



function deleteExercise2(exerciseId) {
    curr_exercises = curr_exercises.filter((exercise) => exercise.id !== exerciseId);
    storeAndProcessExercisesInLocalStorage()
    displayCurrExercises();
  }
  function editExercise2(exerciseId) {
    document.getElementById(`view-${exerciseId}2`).style.display = "none";
    document.getElementById(`form-${exerciseId}2`).style.display = "block";
  }


function storeAndProcessExercisesInLocalStorage(){
  let storedExercise = JSON.stringify(curr_exercises);
  localStorage.setItem("exercise", storedExercise);
}
function saveExercise2(exerciseId) {
    const form = document.getElementById(`form-${exerciseId}2`);
    const inputs = form.getElementsByClassName("editable2");
  
    const updatedExercise = {
      name: inputs[0].value,
      muscles: inputs[1].value.split(",").map((m) => m.trim()),
      instructions: inputs[2].value,
      weight: parseInt(inputs[3].value),
      reps: parseInt(inputs[4].value),
      difficulty: inputs[5].value,
    };
    if (updatedExercise.reps <= 0 || updatedExercise.weight <= 0){
      alert("Please Enter in Repetitions or Weight Greater Than 0.")
    } else{
      const exerciseIndex = curr_exercises.findIndex((e) => e.id === exerciseId);
      curr_exercises[exerciseIndex] = {
        ...curr_exercises[exerciseIndex],
        ...updatedExercise,
      };
    
      document.getElementById(`view-${exerciseId}2`).style.display = "block";
      document.getElementById(`form-${exerciseId}2`).style.display = "none";
      
      storeAndProcessExercisesInLocalStorage()
      displayCurrExercises();
    }

  }



  function displayCurrExercises() {
    const list = document.getElementById("curr-exercise-list");
    list.innerHTML = "";
  
  
    curr_exercises.forEach((exercise) => {
      const exerciseDiv = document.createElement("div");
      exerciseDiv.className = "exercise2";
  
      const formHTML = `
    <div id="form-${exercise.id}2" class="exercise-form2" style="display:none;">
    <label>Name:</label> <input type="text" class="editable2" value="${
      exercise.name
    }"><br>
    <label>Muscles:</label> <input type="text" class="editable2" value="${exercise.muscles.join(
      ", "
    )}"><br>
    <label>Instructions:</label> <textarea class="editable2">${
      exercise.instructions
    }</textarea><br>
    <label>Weight (lbs):</label> <input type="number" class="editable2"  value="${
      exercise.weight
    }"><br>
    <label>Rep:</label> <input type="number" class="editable2" value="${
      exercise.reps
    }"><br>
    <label>Difficulty:</label> <select class="editable2">
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
    <button type="button" onclick="saveExercise2(${exercise.id})">Save</button>
    </div>`;
  
      exerciseDiv.innerHTML = `
    <div id="view-${exercise.id}2">
    <h3>${exercise.name}</h3>
    <p><strong>Muscles:</strong> ${exercise.muscles.join(", ")}</p>
    <p><strong>Instructions:</strong> ${exercise.instructions}</p>
    <p><strong>Weight (lbs):</strong> ${exercise.weight}</p>
    <p><strong>Reps:</strong> ${exercise.reps}</p>
    <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
    <button onclick="editExercise2(${exercise.id})">Edit</button>
    <button onclick="deleteExercise2(${exercise.id})">Delete</button>
    </div>
    ${formHTML}
    `;
      list.appendChild(exerciseDiv);
    });
  }