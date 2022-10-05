//**Button**

// MenuBars au responsive
const menuBars = document.querySelector(".icon");
menuBars.addEventListener("click", () => {
  // recuperer les element du DOM la barre de navigation et le main
  const x = document.getElementById("myTopnav");
  const y = document.querySelector("main");
  //utilisation de methode native: toggle
  // if (x.className === "topnav") {
  //   x.className += " responsive";
  // } else {
  //   x.className = "topnav";
  // }
  x.classList.toggle("responsive");
  y.classList.toggle("responsive-main");
});

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

// Bouton (x) et (Fermer)

const btnClose = document.querySelectorAll(".btn-x");
btnClose.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "none";
    // Relancer le formulaire
    document.querySelector(".modal-body").style.display = "block";
    // caché le message de validation
    document.querySelector(".validation").style.display = "none";
  })
);

//**Les champs Formulaire**

let inputValid = {
  first: false,
  last: false,
  email: false,
  birth: false,
  city: false,
};

// creer des regEx
const pattern = {
  name: /^([A-Za-zéèê]{2,})([ ])?([A-Za-zéèê]{2,})?$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  date_naissance: /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/,
};

//---Nom et prenom---
const prenomInput = document.querySelector("#first");
prenomInput.addEventListener("input", () => {
  // tester si la valeur entrer respect le regEx name
  if (pattern.name.test(prenomInput.value)) {
    document.querySelector(".prenom-valide").innerText = "";
    inputValid.first = true;
  } else {
    document.querySelector(".prenom-valide").innerText =
      "Veuillez entrer un prenom valide, minimum 2 lettres.";
  }
});

// Refaire la meme chose pour verifier le nom
const nomInput = document.querySelector("#last");
nomInput.addEventListener("input", () => {
  // tester si la valeur entrer respect le regEx name
  if (pattern.name.test(nomInput.value)) {
    document.querySelector(".nom-valide").innerText = "";
    inputValid.last = true;
  } else {
    document.querySelector(".nom-valide").innerText =
      "Veuillez entrer une nom valid, minimum 2 lettres.";
  }
});

//---Email---
const emailInput = document.querySelector("#email");
emailInput.addEventListener("input", () => {
  // tester si la valeur entrer respect le regEx email
  if (pattern.email.test(emailInput.value)) {
    document.querySelector(".email-valide").innerText = "";
    inputValid.email = true;
  } else {
    document.querySelector(".email-valide").innerText =
      "Coucou,Veuillez entrer un email valide!";
  }
});

//---la date de naissance---
const dateMin = new Date("2012-01-01"); // Age minimum "10ans"
const dateMax = new Date("1923-01-01"); // Age maximum "99ans"

const birthInput = document.querySelector("#birthdate");
birthInput.addEventListener("input", () => {
  let date = new Date(birthInput.value);
  // tester si la valeur entrer respect le regEx date_naissance
  // Comparer la date entrer avec age min et max
  if (
    date.getTime() > dateMin.getTime() ||
    date.getTime() < dateMax.getTime() ||
    !pattern.date_naissance.test(birthInput.value)
  ) {
    document.querySelector(".birth-valide").innerText =
      "Vous devez entrer une date de naissance valide 'le joeur doit avoir entre 10ans à 99ans'.";
  } else {
    document.querySelector(".birth-valide").innerText = "";
    inputValid.birth = true;
  }
});

//---nombres de tournois---
const quantityInput = document.querySelector("#quantity");
quantityInput.addEventListener("change", () => {
  // si le champs est vide
  if (!quantityInput.value) {
    document.querySelector(".quantity-valide").innerText =
      "Veuillez entrer un chiffre";
  } else {
    document.querySelector(".quantity-valide").innerText = "";
  }
});

//---City---
const cityChecked = document.querySelectorAll("[name=location]");
let cityValid = "";
cityChecked.forEach((city) =>
  city.addEventListener("input", () => {
    if (!city.value) {
      document.querySelector(".city-valide").innerText =
        "Veuillez choisir une ville";
    } else {
      cityValid = city.value;
      document.querySelector(".city-valide").innerText = "";
      inputValid.city = true;
    }
  })
);
//---Condition generale---
const condition = document.querySelector("#checkbox1");
condition.addEventListener("change", () => {
  // si la case n'est pas coché
  if (condition.checked !== true) {
    document.querySelector(".condition").innerText =
      "Veuillez accépter les conditions d'utilisation";
  } else {
    document.querySelector(".condition").innerText = "";
  }
});

//---Si utilisateur souhaite etre prevenu au prochain evenement---
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
const submitForm = document.querySelector("[name=reserve]");
submitForm.addEventListener("submit", (e) => {
  // Empecher la gestion du submit par defaut
  e.preventDefault();
  // si tous les champs sont valid
  if (
    inputValid.first &&
    inputValid.last &&
    inputValid.email &&
    inputValid.birth &&
    inputValid.city &&
    quantityInput.value &&
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
