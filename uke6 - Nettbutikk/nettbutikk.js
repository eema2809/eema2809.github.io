let database = firebase.database();
let skjorter = database.ref("varer/skjorter");
let bukser = database.ref("varer/bukser");
let main = document.querySelector("main");
function visVare(snapshot){
  let vare = snapshot.val();
  main.innerHTML+=`
    <article>
      <img src="bilder/${vare.bilde}">
      <h1>${vare.merke}${vare.modell}</h1>
      <p>${vare.pris}</p>
    </article>
  `;
}
function visAlleVarer(){
  bukser.on("child_added",visVare);
  skjorter.on("child_added",visVAre);
}
visAlleVarer();
