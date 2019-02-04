// Variabler som referer til html-elementene
const skjema = document.querySelector("#skjema");
const inpNavn = document.querySelector("#inpNavn");
const inpTelefon = document.querySelector("#inpTelefon");
const inpEpost = document.querySelector("#inpEpost");
const secKontakter = document.querySelector("#secKontakter")

// Variabler som referer til firebase-databasen
const db = firebase.database();
const kontakter = db.ref("kontakter");

// Registrere ny kontakt
function registrerKontakt(hendelse){
  hendelse.preventDefault(); // Hindrer at skjemaet gjør at vi går til en ny nettside
  const key = inpTelefon.value;
  const data = {
    "navn":inpNavn.value,
    "epost":inpEpost.value
  };
  const kontakt = kontakter.child(key);
  kontakt.set(data);

  skjema.reset();
}

skjema.addEventListener("submit", registrerKontakt);


// Få kontaktene til å dukke opp på siden
function visKontakt(snapshot){
  const telefon = snapshot.key;
  const kontakt = snapshot.val();
  secKontakter.innerHTML += `
  <div>${kontakt.navn}</div>
  <div>${telefon}</div>
  <div>${kontakt.epost}</div>`;
}


kontakter.on("child_added",visKontakt)
