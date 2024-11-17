// Charger les données depuis localStorage
const exercises = JSON.parse(localStorage.getItem("exercises"));

if (!exercises || exercises.length === 0) {
  alert("Aucun entraînement trouvé. Veuillez importer un fichier.");
  window.location.href = "index.html";
}

// Variables pour gérer les exercices
let currentExerciseIndex = 0;
let currentSeries = exercises[currentExerciseIndex].Séries;

// Références aux éléments HTML
const exerciseNameElement = document.getElementById("exercise-name");
const exerciseDescriptionElement = document.getElementById("exercise-description");
const seriesRemainingElement = document.getElementById("series-remaining");
const timerDisplay = document.getElementById("timer-display");
const startTimerButton = document.getElementById("start-timer");

// Initialiser l'affichage
function loadExercise(index) {
  const exercise = exercises[index];
  currentSeries = parseInt(exercise.Séries);

  exerciseNameElement.textContent = exercise.Nom;
  exerciseDescriptionElement.textContent = exercise.Description;
  seriesRemainingElement.textContent = currentSeries;
}

loadExercise(currentExerciseIndex);

let timerInterval;

// Fonction pour démarrer le timer
function startTimer(duration) {
  let time = duration;
  timerDisplay.textContent = formatTime(time);

  timerInterval = setInterval(() => {
    time--;
    timerDisplay.textContent = formatTime(time);

    if (time <= 0) {
      clearInterval(timerInterval);
      alert("Temps de repos terminé !");
    }
  }, 1000);
}

// Fonction pour formater le temps en mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Gestion du clic sur "Série terminée"
startTimerButton.addEventListener("click", () => {
  if (currentSeries > 1) {
    currentSeries--;
    seriesRemainingElement.textContent = currentSeries;
    startTimer(exercises[currentExerciseIndex].Temps);
  } else {
    if (currentExerciseIndex < exercises.length - 1) {
      currentExerciseIndex++;
      loadExercise(currentExerciseIndex);
    } else {
      alert("Entraînement terminé !");
      window.location.href = "index.html";
    }
  }
});
