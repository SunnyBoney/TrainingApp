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
  if(totalScore < 10) return "Niveau 0";
  if(totalScore < 20) return "Niveau 1";
  if(totalScore < 30) return "Niveau 2";
  if(totalScore < 40) return "Niveau 3";
  if(totalScore < 50) return "Niveau 1";
  if(totalScore < 60) return "Niveau 2";
  if(totalScore < 70) return "Niveau 3";
  if(totalScore < 80) return "Niveau 1";
  if(totalScore < 90) return "Niveau 2";
  return "Divinté";
}
  
// Limites des rangs pour chaque exercice

let reps_r1_tractions = 2;
let reps_r2_tractions = 4;
let reps_r3_tractions = 10;
let reps_r4_tractions = 17;

let reps_r1_pompes = 13;
let reps_r2_pompes = 17;
let reps_r3_pompes = 18;
let reps_r4_pompes = 30;

let reps_r1_gainage = 60;
let reps_r2_gainage = 90;
let reps_r3_gainage = 120;
let reps_r4_gainage = 180;

// Points pour chaque rang de chaque exercice

let nb_points_r1_tractions = 5.3;
let nb_points_r2_tractions = 2.5;
let nb_points_r3_tractions = 1;
let nb_points_r4_tractions = 0.2;

let nb_points_r1_pompes = 0.8;
let nb_points_r2_pompes = 0.57;
let nb_points_r3_pompes = 0.55;
let nb_points_r4_pompes = 0.1;

let nb_points_r1_gainage = 0.1667;
let nb_points_r2_gainage = 0.1167;
let nb_points_r3_gainage =0.0667;
let nb_points_r4_gainage = 0.0250;

//setup toutes les fonctions à 0 par défault
let nb_reps_r1_tractions = 0;
let nb_reps_r2_tractions = 0;
let nb_reps_r3_tractions = 0;
let nb_reps_r4_tractions = 0;

let nb_reps_r1_pompes = 0;
let nb_reps_r2_pompes = 0;
let nb_reps_r3_pompes = 0;
let nb_reps_r4_pompes = 0;

let nb_reps_r1_gainage = 0;
let nb_reps_r2_gainage = 0;
let nb_reps_r3_gainage = 0;
let nb_reps_r4_gainage = 0;


//Lorsque le test est soumi

function submitTest() {

  // Récupération des valeurs saisies
  const tractions = parseFloat(document.getElementById('tractions').value) || 0;
  const pompes    = parseFloat(document.getElementById('pompes').value) || 0;
  const gainage   = parseFloat(document.getElementById('gainage').value) || 0;

//CALCUL DU SCORE

// Calcul des points pour chaque rang de chaque exercice

  // Repartition des reps dans chaque rangs

let temp_tractions = tractions;
let temp_pompes = pompes;
let temp_gainage = gainage;


//tractions de rang 4
if(temp_tractions>(reps_r1_tractions + reps_r2_tractions + reps_r3_tractions)){
  nb_reps_r4_tractions = temp_tractions - (reps_r1_tractions + reps_r2_tractions + reps_r3_tractions);
  temp_tractions = temp_tractions - nb_reps_r4_tractions
};

//tractions de rang 3
if(temp_tractions>(reps_r1_tractions + reps_r2_tractions)){
  nb_reps_r3_tractions = temp_tractions - (reps_r1_tractions + reps_r2_tractions);
  temp_tractions = temp_tractions - nb_reps_r3_tractions
};

//tractions de rang 2
if(temp_tractions>reps_r1_tractions){
  nb_reps_r2_tractions = temp_tractions - reps_r1_tractions;
  temp_tractions = temp_tractions - nb_reps_r2_tractions
};

//tractions de rang 1
if(temp_tractions>0){
  nb_reps_r1_tractions = temp_tractions;
};

//pompes de rang 4
if(temp_pompes>(reps_r1_pompes + reps_r2_pompes + reps_r3_pompes)){
  nb_reps_r4_pompes = temp_pompes - (reps_r1_pompes + reps_r2_pompes + reps_r3_pompes);
  temp_pompes = temp_pompes - nb_reps_r4_pompes
};

//pompes de rang 3
if(temp_pompes>(reps_r1_pompes + reps_r2_pompes)){
  nb_reps_r3_pompes = temp_pompes - (reps_r1_pompes + reps_r2_pompes);
  temp_pompes = temp_pompes - nb_reps_r3_pompes
};

//pompes de rang 2
if(temp_pompes>reps_r1_pompes){
  nb_reps_r2_pompes = temp_pompes - reps_r1_pompes;
  temp_pompes = temp_pompes - nb_reps_r2_pompes
};

//pompes de rang 1
if(temp_pompes>0){
  nb_reps_r1_pompes = temp_pompes;
};


//gainage de rang 4
if(temp_gainage>(reps_r1_gainage + reps_r2_gainage + reps_r3_gainage)){
  nb_reps_r4_gainage = temp_gainage - (reps_r1_gainage + reps_r2_gainage + reps_r3_gainage);
  temp_gainage = temp_gainage - nb_reps_r4_gainage
};

//gainage de rang 3
if(temp_gainage>(reps_r1_gainage + reps_r2_gainage)){
  nb_reps_r3_gainage = temp_gainage - (reps_r1_gainage + reps_r2_gainage);
  temp_gainage = temp_gainage - nb_reps_r3_gainage
};

//gainage de rang 2
if(temp_gainage>reps_r1_gainage){
  nb_reps_r2_gainage = temp_gainage - reps_r1_gainage;
  temp_gainage = temp_gainage - nb_reps_r2_gainage
};

//gainage de rang 1
if(temp_gainage>0){
  nb_reps_r1_gainage = temp_gainage;
}

  //Nombres de points pour chaque rangs 
  let score_r1_tractions = nb_reps_r1_tractions*nb_points_r1_tractions;
  let score_r2_tractions = nb_reps_r2_tractions*nb_points_r2_tractions;
  let score_r3_tractions = nb_reps_r3_tractions*nb_points_r3_tractions;
  let score_r4_tractions = nb_reps_r4_tractions*nb_points_r4_tractions;

  let score_r1_pompes = nb_reps_r1_pompes*nb_points_r1_pompes;
  let score_r2_pompes = nb_reps_r2_pompes*nb_points_r2_pompes;
  let score_r3_pompes = nb_reps_r3_pompes*nb_points_r3_pompes;
  let score_r4_pompes = nb_reps_r4_pompes*nb_points_r4_pompes;

  let score_r1_gainage = nb_reps_r1_gainage*nb_points_r1_gainage;
  let score_r2_gainage = nb_reps_r2_gainage*nb_points_r2_gainage;
  let score_r3_gainage = nb_reps_r3_gainage*nb_points_r3_gainage;
  let score_r4_gainage = nb_reps_r4_gainage*nb_points_r4_gainage;


  let score_total_tractions = score_r1_tractions+score_r2_tractions+score_r3_tractions+score_r4_tractions;
  let score_total_pompes = score_r1_pompes+score_r2_pompes+score_r3_pompes+score_r4_pompes;
  let score_total_gainage = score_r1_gainage+score_r2_gainage+score_r3_gainage+score_r4_gainage;

  
  //pour ceux qui ne font pas de tractions
  
  if(pompes<14){
    if(score_total_tractions<(score_total_pompes+score_total_gainage)/2){
      score_total_tractions = (score_total_pompes+score_total_gainage)/2
    }
  }

  // Score total
  const totalScore = score_total_tractions + score_total_pompes + score_total_gainage;
  
    //Détérmination du type

      //détérmination de la faiblesse
          
      function def_faiblesse(a, b, c) {
        if (a < b && a < c) {
          return "Tractions";
        } else if (b < c) {
          return "Pompes";
        } else {
          return "Gainage";
        }
      }  

      let faiblesse = def_faiblesse(score_total_tractions, score_total_pompes, score_total_gainage);



      //détérmination de cosmos
    let prc_score_tractions = score_total_tractions/totalScore;
    let prc_score_pompes = score_total_pompes/totalScore;
    let prc_score_gainage = score_total_gainage/totalScore;

    function cosmos(a, b, c) {
      if (a < 0.32 || b < 0.32 || c < 0.32) {
        return "Type";
      } else {
        return "Cosmos";
      }
    }
    
      

  // Ici, on détermine le type en fonction de la faiblesse et de l'écart entre les scores

  let type = "XXX"

  if (faiblesse == "Tractions") {
    if (score_total_pompes > score_total_gainage) {
      if (score_total_pompes - score_total_gainage > score_total_gainage - score_total_tractions) {
        type = "Feu";
      } else {
        type = "Pierre";
      }
    } else if (score_total_gainage - score_total_pompes > score_total_pompes - score_total_tractions) {
      type = "Terre";
    } else {
      type = "Pierre";
    }
  } else if (faiblesse == "Pompes") {
    if (score_total_tractions > score_total_gainage) {
      if (score_total_tractions - score_total_gainage > score_total_gainage - score_total_pompes) {
        type = "Eau";
      } else {
        type = "Plante";
      }
    } else if (score_total_gainage - score_total_tractions > score_total_tractions - score_total_pompes) {
      type = "Terre";
    } else {
      type = "Plante";
    }
  } 

  else if (faiblesse == "Gainage") {
    if (score_total_tractions > score_total_pompes) {
      if (score_total_tractions - score_total_pompes > score_total_pompes - score_total_gainage) {
        type = "Eau";
      } else {
        type = "Electrique";
      }
    } else if (score_total_pompes - score_total_tractions > score_total_tractions - score_total_gainage) {
      type = "Feu";
    } else {
      type = "Electrique";
    }
  }

  if (cosmos(prc_score_tractions, prc_score_pompes, prc_score_gainage) === "Type") {
    finaltype = type}
    else {finaltype = "Cosmos"}


  // Détermination du niveau global
  let globalLevel;
  if (totalScore < 40) {
    globalLevel = 0;
  } else if (totalScore < 70) {
    globalLevel = 1;
  }
    else if (totalScore > 90) {
      globalLevel = 2;
    }
  else {
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
    "Cosmos":        ["Singularité", "Cosmos", "Infinie", "Universelle"]
  };

  let finalTypeName = finalNames[finaltype] ? finalNames[finaltype][globalLevel] : finaltype;


  // Construction du résultat final
  let affichageFinal = finalTypeName + " " + subLevel;
  let afftotalscroe = Math.floor(totalScore) + " / 100"

  // Affichage du résultat final
  document.getElementById('typeDisplay').textContent = affichageFinal;
  document.getElementById('scoredisplay').textContent = afftotalscroe;

  // Passage à la page de résultat avec animation

  currentPage = totalPages;
    showPage(currentPage);

    
  showLoadingAnimation()

 // animation pour les résultats
 function showLoadingAnimation(callback) {
  const overlay = document.getElementById("loadingOverlay");
  overlay.style.display = "flex";
  
  setTimeout(() => {
    overlay.style.display = "none";
    callback();
  }, 10000);
}

}
