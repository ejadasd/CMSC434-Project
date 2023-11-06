// WorkoutPageGraph.js
document.addEventListener("DOMContentLoaded", (event) => {
    // need to process exercise objects into data used by chart.js
    let data = localStorage.getItem("exercise195");

    curr_exercises = JSON.parse(data);
    processed_exercises = processExerciseData(curr_exercises);
    // This is hardcoded data to show the previous work
    if(processed_exercises.hasOwnProperty("Dumbbell-Press")){
      processed_exercises["Dumbbell-Press"].reps.push(...[5, 10, 12, 15])
      processed_exercises["Dumbbell-Press"].weight.push(...[80, 50, 30, 20])
    } else {
      processed_exercises["Dumbbell-Press"] = {reps: [5, 10, 12, 15], weight: [80, 50, 30, 20]}
    }
    

    document.getElementById("exerciseSelect").addEventListener("change", (e) => {
        let selectedExercise = processed_exercises[e.target.value];
        updateGraph(selectedExercise)
      })
    let first_option_element = populateSelect(processed_exercises)
    updateGraph(processed_exercises[first_option_element.textContent])
})


function updateGraph(selectedExercise){
    let context = document.getElementById("exerciseChart").getContext("2d");
    let sortedExerciseData = selectedExercise.reps.map((rep, index) => {
      return {rep: rep, weight: selectedExercise.weight[index]};}).sort((a, b) => a.rep - b.rep)
    let sortedReps = sortedExerciseData.map(data => data.rep)
    let sortedWeights = sortedExerciseData.map(data => data.weight);

    if (window.myChart){
      window.myChart.destroy();
    }
    window.myChart = new Chart(context, {
      type: "bar", 
      data:{
        labels: sortedReps.map(String),
        datasets: [{
          label: "Number of Reps Lifted At Specified Weight", 
          data: sortedWeights,
          backgroundColor: "rgba(0,123,255,0.5)",
          borderColor: "rgba(0,123,255,1)",
          borderWidth: 1
        }]
      },
      options: {
        scales:{
          y: {
            beginAtZero: true,
            title:{
              display: true,
              text: "Weight Used (lbs)",
              font: {
                size: 25
              }
            },
            ticks:{
              font:{
                size: 25
              }
            }
          },
          x:{
            title:{
              display: true,
              text: "Number of Reps",
              font: {
                size: 25
              }
            },
            ticks:{
              font:{
                size:25
              }
            }
          }
        },
        plugins:{
          legend:{
            labels:{
              font:{
                size: 20
              }
            }
          }
        }
      }
    })
  }


function processExerciseData(data){
    // I am going to add some more exercise data into this array to simulate the storage of previous exercises from different days. Since it would be weird for the user to add multiple instances of a speicfic workout into the current workout.
    let processedData = {};
    data.forEach((exercise) => {
      if (!processedData[exercise.name]){
        processedData[exercise.name] = {weight: [], reps: []}
      }
      processedData[exercise.name].weight.push(exercise.weight);
      processedData[exercise.name].reps.push(exercise.reps);
    })
    return processedData;
  
    // it should return something like "{push up: {weight: [10,15], reps: [12, 13]}, pull up: {weight: [10,15], reps: [12, 13]}}"
  }


function populateSelect(processed_exercises){
    let select_element = document.getElementById("exerciseSelect");
    let last_text_content_element;

    for (let exerciseName in processed_exercises){
            let curr_option = document.createElement("option");
            curr_option.value = exerciseName;
            curr_option.textContent = exerciseName;
            last_text_content_element = exerciseName;
            select_element.appendChild(curr_option);
    }
    return select_element.options[0];
    // this should reutnr the first option element from the exerciseSelect children
}