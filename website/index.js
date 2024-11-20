// Recommended: All functions declared here

function namedCity() {
  const pElements = document.querySelectorAll("#cities p");  
  pElements.forEach(pElement => {
    if (pElement.textContent === cityFromUser) {  
      pElement.classList.add("target"); 
    }
  }); 
}


/* Hur Felicia fixar så att namnet på landet dyker upp bakom namnet på staden
function userObject (cityFromUser) {
  let cityObject = null; //null = false;
  for (let city of cities) { 
    if (cityFromUser == cities[city].name){
      cityObject = cities[city];
    break;
    }
  }
  if (cityObject === null) {
    h2.textContent = `${cityFromuser} finns inte i databasen`; 
  }
  return cityObject
}

//console.log(userObject(cityFromUser).name + userObject(cityFromUser).country)
*/

function createTable() {
  
  const tabell = document.createElement("div"); // Grid-layout
  tabell.id = "table"; 

  tabell.style.width = "85vw"; 
  const rows = cityNames.length;
  const columns = 40;
  tabell.style.gridTemplateColumns = `80 px repeat(${columns}, 1fr)`;
  tabell.style.gridTemplateRows = `repeat(${rows + 1}, 1fr)`;
  greyTable.appendChild(tabell);

  //skapa tomma celler överst, och fyll dem med id-nummer
  for ( let a = 0; a < columns; a++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("cell"); 
    emptyCell.classList.add("head_column"); 
    emptyCell.style.display = "grid";
    tabell.appendChild(emptyCell); 

    if (a=== 0) {
      emptyCell.textContent = ""; 
    } else {
      emptyCell.textContent = cities[a-1].id; ///hoppa över första cellen
    }
  }

  // Iterera över städer och lägg till namn i griden
  for (let i = 0; i < rows; i++) {
    // Skapa och lägg till namn på städer i den första kolumnen
    let namesRow = document.createElement("div");
    namesRow.textContent = `${cities[i].id}` + " - " + cityNames[i]; // Namnen på städerna
    namesRow.classList.add("head_row");
    namesRow.classList.add("cell");
    namesRow.style.display = "grid"; 
    tabell.appendChild(namesRow);

    // Skapa celler för resterande kolumner i samma rad
    for (let j = 1; j < columns; j++) {
      const cell = document.createElement("div");
      cell.textContent = "Hej"; 
      cell.classList.add("cell"); 
      cell.style.display = "grid"; 
      tabell.appendChild(cell); 
    }
  }
}

// Recommended: constants with references to existing HTML-elements

pElement = document.querySelector("p");
h2 = document.querySelector("h2");
title = document.querySelector("title"); 
greyTable = document.getElementById("table"); 

// Recommended: Ask for the city name and then the rest of the code

let cityFromUser = prompt("Write the name of a city");

const cityNames = [];
for (const city of cities) {
  cityNames.push(city.name) 
}

//h2-innehåll
//h2.textContent = cityFromUser; 
const foundCity = cities.find(function(city) {
  return city.name.toLowerCase() === cityFromUser.toLowerCase();
 
});
// Kontrollera om staden finns i listan
if (foundCity) {
  // Om staden hittas, visa namnet och landet i <h2>
  h2.textContent = foundCity.name + " (" + foundCity.country + ")";
} else {
  // Om staden inte hittas, visa ett meddelande
  h2.textContent = cityFromUser + " not found in the database";
}



//det namnet från cityFromUser ska jag sedan hitta i arrayen och då ta värdet från country


for( let i = 0; i < cityNames.length; i++) { //lenght= hur många gånger loopen ska köras
  let divCities = document.getElementById("cities");
  let pElement = document.createElement("p"); 
  pElement.classList.add("cityBox");  
  pElement.textContent = cityNames[i]; 
  divCities.appendChild(pElement);  
}

if (cityNames.includes(cityFromUser)) {
  title.textContent = cityFromUser;
}
else {
  title.textContent = "Not found";
} 


namedCity ();
createTable(); 
//userObject(); 





//när staden finns i arrayen så ska den staden som ligger närmast markeras grön och den som ligger längst bort ska bli blå
/*
for (let i = 0; i < city[i]; i++) {
  for (j = 0; j < city[j]; ++j) {

  }
}

*/



