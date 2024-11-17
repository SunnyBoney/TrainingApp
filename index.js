// Références aux éléments HTML
const fileInput = document.getElementById("file-input");
const trainingPreview = document.getElementById("training-preview").querySelector("tbody");
const confirmButton = document.getElementById("confirm-training");

// Fonction pour convertir un CSV en un tableau d'objets JavaScript
function parseCSV(csv) {
  const rows = csv.split("\n").filter(row => row.trim() !== ""); // Élimine les lignes vides
  const headers = rows.shift().split(",");

  return rows.map((row) => {
    const values = row.split(",");
    return headers.reduce((acc, header, index) => {
      acc[header.trim()] = values[index].trim();
      return acc;
    }, {});
  });
}

// Fonction pour afficher les exercices dans le tableau
function displayExercises(exercises) {
  trainingPreview.innerHTML = ""; // Nettoie le tableau

  exercises.forEach((exercise) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${exercise.Nom}</td>
      <td>${exercise.Description}</td>
      <td>${exercise.Séries}</td>
      <td>${exercise.Temps}</td>
    `;

    trainingPreview.appendChild(row);
  });

  // Affiche le bouton de confirmation
  confirmButton.style.display = "block";
}

// Gestion de l'importation de fichier
if (fileInput) {
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const csv = e.target.result;
        const exercises = parseCSV(csv);

        // Affiche les exercices dans le tableau
        displayExercises(exercises);

        // Stocke les exercices dans localStorage
        localStorage.setItem("exercises", JSON.stringify(exercises));
      };

      reader.readAsText(file);
    }
  });
}

// Gestion de la confirmation
if (confirmButton) {
  confirmButton.addEventListener("click", () => {
    window.location.href = "timer.html"; // Redirige vers la page du timer
  });
}

