// Recommended: All functions declared here

function namedCity() {
  const pElements = document.querySelectorAll("#cities p");  
  pElements.forEach(pElement => {
    if (pElement.textContent === cityFromUser) {  
      pElement.classList.add("target"); 
    }
  });
}

// Recommended: constants with references to existing HTML-elements

pElement = document.querySelector("p");
h2 = document.querySelector("h2");

// Recommended: Ask for the city name and then the rest of the code

let cityFromUser = prompt("Write the name of a city");

h2.textContent = cityFromUser; 

const cityNames = [];
for (const city of cities) {
  cityNames.push(city.name) 
}

for( let i = 0; i < cityNames.length; i++) {
  let divCities = document.getElementById("cities");
  let pElement = document.createElement("p"); 
  pElement.classList.add("cityBox"); //blir en liten grå prick i slutet...hur får jag bort den? 
  pElement.textContent = cityNames[i]; 
  divCities.appendChild(pElement);  
}

 
namedCity (); 




//let net = document.getElementById("table");

//let columns = document.querySelector("grid")



//när staden finns i arrayen så ska den staden som ligger närmast markeras grön och den som ligger längst bort ska bli blå
/*
for (let i = 0; i < city[i]; i++) {
  for (j = 0; j < city[j]; ++j) {

  }
}

*/



