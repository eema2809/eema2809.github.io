//html
const info = document.querySelector("#info");
const bildecontainer = document.querySelector("#bildecontainer");

//Database
const db = firebase.database();

// Få tak i URL-parameter

var url_string = window.location.href;
var url = new URL(url_string);
var pid = url.searchParams.get("pid");
console.log(pid);


//finner riktig prosjekt
const prosjekt = db.ref("portofølje/prosjekter/" + pid);

function byttBilde(bilde) {
  bildecontainer.style.backgroundImage = `url("${bilde}")`;
}

function visProsjekt(snap) {
  const data = snap.val();

  const bilder = data.bilder;
  const forsidebilde = bilder[0];

  bildecontainer.style.backgroundImage = `url("${forsidebilde}")`;

  let bilderad = `<div class="bilderad">`;

  for(const bilde of bilder) {
    bilderad += `<img src="${bilde}"  onmouseover="byttBilde('${bilde}')">`
  }

  bilderad += `</div>`;

  info.innerHTML =`
    <h1>${data.tittel}</h1>
    <p><strong>Sammendrag: </strong> ${data.beskrivelse}</p>
    ${bilderad}
  `;

}


//hendelselytter
prosjekt.on("value", visProsjekt);
