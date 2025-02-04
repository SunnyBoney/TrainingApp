// Chargement des tests précédents depuis localStorage et affichage dans l'ordre décroissant
function loadPreviousTests() {
  const container = document.getElementById("previousTests");
  let tests = JSON.parse(localStorage.getItem("previousTests") || "[]");
  const containerDiv = document.getElementById("previousTestsContainer");
  if (tests.length === 0) {
    containerDiv.style.display = "none";
  } else {
    containerDiv.style.display = "block";
    container.innerHTML = "";
    // Parcours en ordre décroissant (les plus récents en premier)
    for (let i = tests.length - 1; i >= 0; i--) {
      const test = tests[i];
      const div = document.createElement("div");
      div.className = "test-record";
      // Stockage des données du test dans data-test en JSON
      div.dataset.test = JSON.stringify(test);
      div.innerHTML = `<strong>${test.name}</strong> - ${test.result} <em>(${test.date})</em><br>
        Tractions: ${test.tractions} | Pompes: ${test.pompes} | Gainage: ${test.gainage}`;
      // Rendre le div cliquable pour afficher le test enregistré
      div.onclick = function() {
        viewTest(this);
      };
      container.appendChild(div);
    }
  }
}

// Appel au chargement lors de l'ouverture de la page
loadPreviousTests();

// Navigation entre les pages
let currentPage = 1;
const totalPages = 4;

function showPage(pageNumber) {
  // Pages d'exercices (pages 1 à 3)
  for (let i = 1; i <= 3; i++) {
    const page = document.getElementById("page" + i);
    if (page) {
      page.classList.toggle("active", i === pageNumber);
    }
  }
  // Gestion de la page de résultat
  if (pageNumber === totalPages) {
    document.getElementById("resultPage").classList.add("active");
  } else {
    document.getElementById("resultPage").classList.remove("active");
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {  // pages 1 à 3 pour les exercices
    currentPage++;
    showPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}

// Détermine le sous-niveau en fonction du score total (par tranche de 10)
function getSubLevel(totalScore) {
  if(totalScore < 10) return "Niveau 1";
  if(totalScore < 20) return "Niveau 2";
  if(totalScore < 30) return "Niveau 3";
  if(totalScore < 40) return "Niveau 1";
  if(totalScore < 50) return "Niveau 2";
  if(totalScore < 60) return "Niveau 3";
  if(totalScore < 70) return "Niveau 1";
  if(totalScore < 80) return "Niveau 2";
  if(totalScore < 90) return "Niveau 3";
  return "Max";
}
  


function submitTest() {
  // Récupération des valeurs saisies
  const tractions = parseFloat(document.getElementById('tractions').value) || 0;
  const pompes    = parseFloat(document.getElementById('pompes').value) || 0;
  const gainage   = parseFloat(document.getElementById('gainage').value) || 0;

  // Calcul des points pour chaque exercice (max 33 points)
  const pointsTractions = Math.min(33 * (tractions / 25), 33);
  const pointsPompes    = Math.min(33 * (pompes / 50), 33);
  const pointsGainage   = Math.min(33 * (gainage / 5), 33);

  // Score total
  const totalScore = pointsTractions + pointsPompes + pointsGainage;

  // Pourcentages par discipline
  let perTractions = 0, perPompes = 0, perGainage = 0;
  if (totalScore > 0) {
    perTractions = pointsTractions / totalScore;
    perPompes    = pointsPompes    / totalScore;
    perGainage   = pointsGainage   / totalScore;
  }

  // Détermination du type principal (type brut)
  let typeBrut = "";
  if (totalScore === 0) {
    typeBrut = "Mixte"; // Par défaut
  } else {
    if (perPompes > 0.55) {
      typeBrut = "Feu";
    } else if (perTractions > 0.55) {
      typeBrut = "Eau";
    } else if (perGainage > 0.55) {
      typeBrut = "Terre";
    } else if (perGainage < 0.20) {
      typeBrut = "Electricité";
    } else if (perPompes < 0.20) {
      typeBrut = "Plante";
    } else if (perTractions < 0.20) {
      typeBrut = "Pierre";
    } else {
      typeBrut = "Mixte";
    }
  }

  // Détermination du niveau global
  let globalLevel;
  if (totalScore < 30) {
    globalLevel = 0;
  } else if (totalScore > 60) {
    globalLevel = 2;
  } else {
    globalLevel = 1;
  }

  // Sous-niveau (par tranche de 10)
  const subLevel = getSubLevel(totalScore);

  // Tableaux de noms finaux pour chaque type en fonction du niveau global
  const finalNames = {
    "Eau":           ["Flaque", "Eau", "Glace"],
    "Feu":           ["Etincelle", "Feu", "Lave"],
    "Terre":         ["Boue", "Terre", "Seisme"],
    "Electricité":   ["Pile", "Electricité", "Foudre"],
    "Pierre":        ["Gravier", "Pierre", "Diamant"],
    "Plante":        ["Feuille", "Plante", "Foret"],
    "Mixte":         ["Singularité", "Cosmos", "Infinie"]
  };

  let finalTypeName = finalNames[typeBrut] ? finalNames[typeBrut][globalLevel] : typeBrut;

  // Gestion de l'ascendant (seulement si le type principal est Mixte)
  let ascendant = "";
  if (typeBrut === "Mixte" && !(finalTypeName === "Infinie" && subLevel === "Max")) {
    const minPercentage = Math.min(perTractions, perPompes, perGainage);
    if (minPercentage === perTractions) {
      ascendant = "Pierre";
    } else if (minPercentage === perPompes) {
      ascendant = "Plante";
    } else if (minPercentage === perGainage) {
      ascendant = "Electricité";
    }
  }

  // Construction du résultat final
  let affichageFinal = finalTypeName + " " + subLevel;
  if (ascendant !== "") {
    affichageFinal += " Ascendant " + ascendant;
  }

  // Texte d'explication en fonction du nom final (sans le sous-niveau)
  const explanationMapping = {
    "Flaque": "Votre potentiel reste modeste, continuez à vous entraîner.",
    "Eau": "Votre équilibre discret laisse entrevoir une force naissante.",
    "Glace": "Votre calme et votre puissance se manifestent avec élégance.",
    "Etincelle": "Votre énergie prometteuse illumine vos débuts.",
    "Feu": "Votre passion et votre intensité font de vous un véritable moteur.",
    "Lave": "Votre puissance ardente est difficile à contenir.",
    "Boue": "Votre force humble se transforme en détermination.",
    "Terre": "Votre stabilité et votre constance sont vos meilleurs atouts.",
    "Seisme": "Votre impact est énorme, vous êtes une force de la nature.",
    "Pile": "Votre énergie constante vous permet de relever tous les défis.",
    "Electricité": "Votre dynamisme électrise tout autour de vous.",
    "Gravier": "Votre solidité et votre persévérance font votre force.",
    "Pierre": "Votre résilience inébranlable vous définit.",
    "Feuille": "Votre adaptabilité et votre fraîcheur vous démarquent.",
    "Plante": "Votre vitalité et votre capacité à évoluer sont remarquables.",
    "Singularité": "Votre profil unique vous distingue nettement.",
    "Cosmos": "Votre équilibre mystérieux ouvre un vaste univers de possibilités.",
    "Infinie": "Votre potentiel est infini, vous avez atteint le sommet."
  };
  const explanationText = explanationMapping[finalTypeName] || "Votre profil est unique.";
  // On ajoute les valeurs d'exercices dans l'explication
  const fullExplanation = explanationText + ` (Tractions: ${document.getElementById('tractions').value}, Pompes: ${document.getElementById('pompes').value}, Gainage: ${document.getElementById('gainage').value})`;
  document.getElementById("explanation").textContent = fullExplanation;

  // Affichage du résultat final (sans afficher le score)
  document.getElementById('typeDisplay').textContent = affichageFinal;

  // Passage à la page de résultat
  currentPage = totalPages;
  showPage(currentPage);
}

// Fonction appelée lors du clic sur un test enregistré
function viewTest(element) {
  const record = JSON.parse(element.dataset.test);
  document.getElementById('typeDisplay').textContent = record.result;
  const fullExplanation = record.explanation + ` (Tractions: ${record.tractions}, Pompes: ${record.pompes}, Gainage: ${record.gainage})`;
  document.getElementById("explanation").textContent = fullExplanation;
  currentPage = totalPages;
  showPage(currentPage);
}

// Gestion de la modal d'enregistrement
function openSaveModal() {
  document.getElementById("saveModal").style.display = "flex";
  document.getElementById("saveInputContainer").style.display = "none";
}

function dontSave() {
  closeSaveModal();
  restartTestNow();
}

function showSaveInput() {
  document.getElementById("saveInputContainer").style.display = "block";
}

function saveTest() {
  const testName = document.getElementById("testName").value.trim();
  if(testName === "") {
    alert("Veuillez saisir un nom pour le test.");
    return;
  }
  // Création de l'objet test avec les informations enregistrées
  const record = {
    name: testName,
    result: document.getElementById("typeDisplay").textContent,
    explanation: document.getElementById("explanation").textContent,
    date: new Date().toLocaleString(),
    tractions: document.getElementById("tractions").value,
    pompes: document.getElementById("pompes").value,
    gainage: document.getElementById("gainage").value
  };
  let tests = JSON.parse(localStorage.getItem("previousTests") || "[]");
  tests.push(record);
  localStorage.setItem("previousTests", JSON.stringify(tests));
  closeSaveModal();
  restartTestNow();
  loadPreviousTests();
}


function closeSaveModal() {
  document.getElementById("saveModal").style.display = "none";
  document.getElementById("testName").value = "";
}

function restartTestNow() {
  document.getElementById('tractions').value = "";
  document.getElementById('pompes').value = "";
  document.getElementById('gainage').value = "";
  currentPage = 1;
  showPage(currentPage);
}

// Variables pour le chronomètre
let timerInterval;
let elapsedTime = 0; // temps écoulé en millisecondes

// Fonction pour mettre à jour l'affichage du chronomètre
function updateDisplay() {
  let totalSeconds = Math.floor(elapsedTime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  // Formater avec deux chiffres
  const format = (unit) => unit < 10 ? "0" + unit : unit;
  document.getElementById("timerDisplay").textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

// Gestion du bouton Démarrer/Arrêter
document.getElementById("startStopButton").addEventListener("click", function() {
  if (this.textContent === "Démarrer") {
    timerInterval = setInterval(function() {
      elapsedTime += 1000; // ajouter 1 seconde
      updateDisplay();
    }, 1000);
    this.textContent = "Arrêter";
  } else {
    clearInterval(timerInterval);
    this.textContent = "Démarrer";
  }
});

// Gestion du bouton Réinitialiser
document.getElementById("resetButton").addEventListener("click", function() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  document.getElementById("startStopButton").textContent = "Démarrer";
});
