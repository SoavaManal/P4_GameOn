// Menu bars au responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// La fonctionnalité du bouton (x) et (Fermer)
// Recupérer les buttons du DOM

const btnClose = document.querySelectorAll(".btn-x");
// au click en ajoute le style display="none"
btnClose.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "none";
    // Relancer le formulaire
    document.querySelector(".modal-body").style.display = "block";
    // caché le message de validation
    document.querySelector(".validation").style.display = "none";
  })
);

// Valider les champs du formulaire

//---Nom et prenom---
// fonction pour tester la validité du nom et prénom
const validName = (test) => {
  // créer un regEx :le nom doit contenir minimum 2 lettres
  let name = new RegExp("^[A-Za-zéèê]{2,}$");
  return name.test(test);
};

// Récuperer input prenom du DOM
const prenomInput = document.querySelector("#first");
// écouter le mouvement en "change"
prenomInput.addEventListener("change", () => {
  // verifier la valeur entrer à l'aide de fonction validName
  // si la fonction return false
  if (!validName(prenomInput.value)) {
    // affichage d'un message d'erreur
    document.querySelector(".prenom-valide").innerText =
      "Veuillez entrer 2 caractères ou plus.";
  } else {
    document.querySelector(".prenom-valide").innerText = "";
  }
});

// Refaire la meme chose pour verifier le nom
const nomInput = document.querySelector("#last");
nomInput.addEventListener("change", () => {
  if (!validName(nomInput.value)) {
    document.querySelector(".nom-valide").innerText =
      "Veuillez entrer 2 caractères ou plus.";
  } else {
    document.querySelector(".nom-valide").innerText = "";
  }
});

//---Email---
// fonction por tester la validité de l'email
const validEmail = (test) => {
  // creer un regEx pour la validation des emails
  // Le regEx utiliser et récuperer du site regexr.com
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return email.test(test);
};

// verrifier la valeur entrer
const emailInput = document.querySelector("#email");
emailInput.addEventListener("change", () => {
  if (!validEmail(emailInput.value)) {
    document.querySelector(".email-valide").innerText =
      "Veuillez entrer un email valide!";
  } else {
    document.querySelector(".email-valide").innerText = "";
  }
});

//---la date de naissance---
const valideBirth = (test) => {
  //regex accepte les date de type aaaa-mm-jj ou aaaa/mm/jj
  const birthday =
    /19[0-9]{2}|200[01234]{1}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;
  return birthday.test(test);
};

const birthInput = document.querySelector("#birthdate");
birthInput.addEventListener("change", () => {
  console.log(birthInput.value);
  if (!birthInput.value || !valideBirth(birthInput.value)) {
    document.querySelector(".birth-valide").innerText =
      "Vous devez entrer une date de naissance valide '18ans ou plus'.";
  } else {
    document.querySelector(".birth-valide").innerText = "";
  }
});

//---nombres de tournois---
// recuperer element de la DOM
const quantityInput = document.querySelector("#quantity");
// ecouter le mouvement en "change"
quantityInput.addEventListener("change", () => {
  // si il n'a aucun valeur entrer
  if (!quantityInput.value) {
    document.querySelector(".quantity-valide").innerText =
      "Veuillez entrer un chiffre";
  } else {
    document.querySelector(".quantity-valide").innerText = "";
  }
});

//---City---
//recuperer les inputs radio
const cityChecked = document.querySelectorAll("[name=location]");
let cityValid = "";
cityChecked.forEach((city) =>
  city.addEventListener("change", () => {
    if (city.value) {
      cityValid = city.value;
    }
  })
);
// Condition generale
// recuperer element
const condition = document.querySelector("#checkbox1");
condition.addEventListener("change", () => {
  // si la case n'est pas coché
  if (condition.checked !== true) {
    // afficher un message d'erreur
    document.querySelector(".condition").innerText =
      "Veuillez accépter les conditions d'utilisation";
  } else {
    document.querySelector(".condition").innerText = "";
  }
});

// Si utilisateur souhaite etre prevenu au prochain evenement
// creer un varriable boolean qui prend la valeur false par defaut
let prevenu = false;
const utilisateurPrevenu = document.querySelector("#checkbox2");
utilisateurPrevenu.addEventListener("change", () => {
  // si l'element est coché la varriable prend la valeur true
  if (utilisateurPrevenu.checked === true) {
    prevenu = true;
  }
});

// Envoi du donner au localestorage + affichage du message de validation
// Récuperer element (form)
const submitForm = document.querySelector("[name=reserve]");
// Ecouter l'evenemnt en "Submit"
submitForm.addEventListener("submit", (e) => {
  // Empecher la gestion du submit par defaut
  e.preventDefault();
  // si tous les champs sont valid
  if (
    validName(prenomInput.value) &&
    validName(nomInput.value) &&
    validEmail(emailInput.value) &&
    valideBirth(birthInput.value) &&
    quantityInput.value &&
    cityValid &&
    condition.checked
  ) {
    console.log("toute est bon");
    // creer un objet avec les donnees saisi au formulaire
    let player = {
      prenom: prenomInput.value,
      nom: nomInput.value,
      email: emailInput.value,
      date_aissance: birthInput.value,
      nb_tournois: quantityInput.value,
      ville: cityValid,
      prochaineEvenement: prevenu,
    };
    console.log(player);
    // Transformer les données en JSON
    player = JSON.stringify(player);
    // Sauvegarder les données au locale storage
    window.localStorage.setItem("player", player);
    // Caché le formulaire
    document.querySelector(".modal-body").style.display = "none";
    // Mise a jour du fomulaire
    document.querySelector("[name=reserve]").reset();
    // Afficher le message de validation
    document.querySelector(".validation").style.display = "block";
  } else {
    console.log("il manque des champs");
    // Sinon afficher une alert avec un message erreur
    window.alert("Veillez remplir les champs qui manque");
  }
});
//test
