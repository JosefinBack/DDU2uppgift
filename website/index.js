// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

let cityFromUser = prompt("Write the name of a city");

h2 = document.querySelector("h2");
h2.textContent = cityFromUser; 

const cityNames = [];
for (const city of cities) {
  cityNames.push(city.name) 
}

for( let i = 0; i <= cityNames.length; i++) {

  let divCities = document.getElementById("cities");

  let pElement = document.createElement("p"); 
  pElement.classList.add("cityBox"); //blir en liten grå prick i slutet...hur får jag bort den? 
  pElement.textContent = cityNames[i]; 
  divCities.appendChild(pElement); 
}

let net = document.getElementById("table");

let columns = document.querySelector("grid")

//när jag skriver in en stad som finns i arrayen så ska den staden markeras svart. 

//när staden finns i arrayen så ska den staden som ligger närmast markeras grön och den som ligge rlängst bort ska bli blå

for (let i = 0; i < city[i]; i++) {
  for (j = 0; j < city[j]; ++j) {

  }
}





