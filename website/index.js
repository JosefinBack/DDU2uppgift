// Recommended: All functions declared here

function namedCity() {
  const pElements = document.querySelectorAll("#cities p");  
  pElements.forEach(pElement => {
    if (pElement.textContent === cityFromUser) {  
      pElement.classList.add("target"); 
    }
  });
}


function createTable() {
  
  const tabell = document.createElement("div"); // Grid-layout
  tabell.id = "table"; 

  tabell.style.width = "1200px"; //inte rätt
  const rows = cityNames.length;
  const columns = 40;
  tabell.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  tabell.style.gridTemplateRows = `repeat(${rows + 1}, 1fr)`;
  greyTable.appendChild(tabell);

  for ( let a = 0; a < columns; a++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("cell"); 
    tabell.appendChild(emptyCell); 

    if (a=== 0) {
      emptyCell.textContent = ""; 
    } else {
      emptyCell.textContent = cities[a-1].id;
    }
  }

  // Iterera över städer och lägg till namn i griden
  for (let i = 0; i < rows; i++) {
    // Skapa och lägg till namn på städer i den första kolumnen
    let namesRow = document.createElement("div");
    namesRow.textContent = cityNames[i]; // Namnen på städerna
    namesRow.classList.add("head_row");
    namesRow.classList.add("cell");
    tabell.appendChild(namesRow);

    // Skapa celler för resterande kolumner i samma rad
    for (let j = 1; j < columns; j++) {
      const cell = document.createElement("div");
      cell.textContent = "Hej"; 
      cell.classList.add("cell"); 
      tabell.appendChild(cell); // Lägg till cellen
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
h2.textContent = cityFromUser; 

const cityNames = [];
for (const city of cities) {
  cityNames.push(city.name) 
}

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





//när staden finns i arrayen så ska den staden som ligger närmast markeras grön och den som ligger längst bort ska bli blå
/*
for (let i = 0; i < city[i]; i++) {
  for (j = 0; j < city[j]; ++j) {

  }
}

*/



