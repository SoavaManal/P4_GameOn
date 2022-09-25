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

//----la fonctionnalité du bouton (x) close----
//Recupérer le button du DOM
const btnClose = document.querySelector(".close");
//au click en ajoute le style display="none"
btnClose.addEventListener("click", () => {
  modalbg.style.display = "none";
});

//---Valider les champs du formulaire----

// Nom et prenom
//fonction pour verifier les noms et prenoms
const validName = (test) => {
  //creer le regEx qui verifie que le nom doit contenir minimum 2 lettres
  let name = new RegExp("^[A-Za-zéèê]{2,}$");
  return name.test(test);
};

//Récuperer input du prenom
const prenomInput = document.querySelector("#first");
//ecouter le mouvement en "change"
prenomInput.addEventListener("change", () => {
  //Utilisation de la fonction validName pour verifier la valeur entrer
  //si la fonction return false
  if (!validName(prenomInput.value)) {
    //affichage d'un message d'erreur
    document.querySelector(".prenom-valide").innerText =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  } else {
    document.querySelector(".prenom-valide").innerText = "";
  }
});

//recuperer l'input nom
const nomInput = document.querySelector("#last");
nomInput.addEventListener("change", () => {
  //verrifier le nom avec la fonction valid name
  if (!validName(nomInput.value)) {
    document.querySelector(".nom-valide").innerText =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  } else {
    document.querySelector(".prenom-valide").innerText = "";
  }
});

// Email
//fonction verrifie l'email
const validEmail = (test) => {
  //creer un regEx pour la validation des emails
  //Le regEx utiliser et récuperer du site regexr.com
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return email.test(test);
};

//recuperer l'inpt email
const emailInput = document.querySelector("#email");
emailInput.addEventListener("change", () => {
  if (!validEmail(emailInput.value)) {
    document.querySelector(".email-valide").innerText =
      "Veuillez entrer un email valide!";
  } else {
    document.querySelector(".email-valide").innerText = "";
  }
});

//verrifier la validité de la date de naissance
const valideBirth = (test) => {
  const birthday = new RegExp(
    "^(([19][0-9]{2})|([200][1-4]))(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$"
  );
  return birthday.test(test);
};

const birthInput = document.querySelector("#birthdate");
birthInput.addEventListener("change", () => {
  console.log(birthInput.value);
  if (!valideBirth(birthInput.value)) {
    document.querySelector(".birth-valide").innerText =
      "Vous devez entrer une date de naissance valide.";
  } else {
    document.querySelector(".birth-valide").innerText = "";
  }
});

//le champs de quantité
//recuperer element de la DOM
const quantityInput = document.querySelector("#quantity");
//ecouter le mouvement en "change"
quantityInput.addEventListener("change", () => {
  //si il n'a aucun valeur entrer
  if (!quantityInput.value) {
    document.querySelector(".quantity-valide").innerText =
      "Veuillez entrer un chiffre";
  } else {
    document.querySelector(".quantity-valide").innerText = "";
  }
});

// City
//recuperer les inputs radio
const cityChecked = document.querySelectorAll("[name=location]");
let cityValid = Boolean;
for (let city of cityChecked) {
  city.addEventListener("change", () => {
    if (!city.value) {
      cityValid = false;
      console.log(cityValid);
    } else {
      cityValid = true;
      console.log(cityValid);
    }
  });
  !cityValid
    ? (document.querySelector(".city-valide").innerText =
        "Veuillez choisir une ville")
    : (document.querySelector(".city-valide").innerText = "");
}

// Condition generale
//recuperer element
const condition = document.querySelector("#checkbox1");
condition.addEventListener("change", () => {
  //si la case n'est pas coché
  if (condition.checked !== true) {
    //afficher un message d'erreur
    document.querySelector(".condition").innerText =
      "Veuillez accépter les conditions d'utilisation";
  } else {
    document.querySelector(".condition").innerText = "";
  }
});

//----envoi du donner au localestorage----

const submitForm = document.querySelector("[name=reserve]");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    // validName(prenomInput.value) &&
    // validName(nomInput.value) &&
    // validEmail(emailInput.value) &&
    valideBirth(birthInput) &&
    birthInput.value !== null //&&
    // quantityInput.value &&
    // cityValid &&
    // condition.checked
  ) {
    console.log("toute est bon");
    // const player = {
    //   prenom: prenomInput.value,
    //   nom: nomInput.value,
    //   email: emailInput.value,
    //   date_aissance: birthInput.value,
    //   nb_tournois: quantityInput.value,
    //   ville: cityChecked,
    // };
    // window.localStorage.setItem("player", player);
  } else {
    console.log("manque de champs");
  }
});
