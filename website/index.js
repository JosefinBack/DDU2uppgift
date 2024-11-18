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
  const tabell = document.createElement("table"); 
  tabell.id = "table";  

  const headerRow = document.createElement("tr"); 
  const emptyHeader = document.createElement("th"); 
  headerRow.appendChild(emptyHeader); 

  for (let i = 0; i < cities.length; i++) {
    const headerCell = document.createElement("th");
    headerCell.textContent =i; 
    headerRow.appendChild(headerCell);
  }
  tabell.appendChild(headerRow); 

for (let i = 0; i < distances.length; i++) {
 const row = document.createElement("tr");
  const rowHeader = document.createElement("th"); 
  rowHeader.textContent = cityNames[i];  
row.appendChild(rowHeader);
  
    for ( let key in distances[i]) { 
      const cell = document.createElement("td");
      cell.textContent = distances[key]; 
      cell.classList.add("cell"); 
      row.appendChild(cell); 
    }
    tabell.appendChild(row); 
  } 
  const greyTable = document.getElementById("table"); 
  greyTable.appendChild(tabell); 
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
  pElement.classList.add("cityBox"); //blir en liten grå prick i slutet...hur får jag bort den? 
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



