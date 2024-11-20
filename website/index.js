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
  const rows = cityNames.length; //???
  const columns = 40;
  tabell.style.gridTemplateColumns = `80 px repeat(${columns}, 1fr)`;
  tabell.style.gridTemplateRows = `repeat(${rows + 1}, 1fr)`;
  greyTable.appendChild(tabell);

  //skapa tomma celler överst, och fyll dem med id-nummer (ÖVERSTA RADEN)
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

//h2-innehåll görs med en .find på array
const foundCity = cities.find(function(city) {
  return city.name === cityFromUser;
});
if (foundCity) {
  h2.textContent = foundCity.name + " (" + foundCity.country + ")";
} else {
  h2.textContent = cityFromUser + "not found in the database";
}

//Skapar p-element för varje stad och fyller i namnen 
for( let i = 0; i < cityNames.length; i++) { //lenght= hur många gånger loopen ska köras
  let divCities = document.getElementById("cities");
  let pElement = document.createElement("p"); 
  pElement.classList.add("cityBox");  
  pElement.textContent = cityNames[i]; //namnen på städerna
  divCities.appendChild(pElement);  
}


//närmaste staden ska bli görn och staden 
let closestCity = null;
let furthestCity = null;
let closestDistance = distances.length;
let furthestDistance = 0; 

for (let path of distances) {
  if (path.city1 == cityFromUser.id) {
    if (path.distance < closestDistance) {
      closestDistance = path.distance;
      closestCity = path.city1; 
    }
    if (path.distance > furthestDistance) {
      furthestDistance = path.distance; 
      furthestCity = path.city2; 
    }
  }
}

let closestCityObject = null;
let furthestCityObject = null;
for (let city of cities) {
  if (city.id == closestCity) {
    closestCityObject = city;
  }
  if (city.id == furthestCity) {
    furthestCityObject = city;
  }
}

console.log(closestCity);
console.log(furthestCity); 

console.log(closestDistance);
console.log(furthestDistance);

//fixar namnet i title 
if (cityNames.includes(cityFromUser)) {
  title.textContent = cityFromUser;
}
else {
  title.textContent = "Not found";
} 

//anropa funktioner
namedCity ();
createTable(); 
