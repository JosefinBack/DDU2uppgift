// Recommended: All functions declared here

function createTable() {
  const tabell = document.querySelector("#table"); 
  tabell.style.width = "100%"; 

  //skapa tomma celler överst, och fyll dem med id-nummer (ÖVERSTA RADEN)
  const topCell = document.createElement("div");
  topCell.classList.add("cell"); 
  topCell.classList.add("head_column"); 
  topCell.textContent = "";
  tabell.appendChild(topCell); 

    for ( let i = 0; i < cities.length; i++) {
      const topCell = document.createElement("div");
      topCell.classList.add("cell"); 
      topCell.classList.add("head_column"); 
      topCell.textContent = cities[i].id; 
      tabell.appendChild(topCell); 
    }

  // Iterera över städer och lägg till namn i griden
  for (let i = 0; i < cities.length; i++) {
    // Skapa och lägg till namn på städer i den första kolumnen
    let namesRow = document.createElement("div");
    namesRow.textContent = `${cities[i].id}` + " - " + cities[i].name; // Namnen på städerna
    namesRow.classList.add("head_row");
    namesRow.classList.add("cell");
    tabell.appendChild(namesRow);

    if (i % 2 === 0) {
      namesRow.classList.add("even_row"); //fetsilad underlinje under namnen som finns på en jämn rad
     } 

    // Skapa celler för resterande kolumner i samma rad och skapar innehåll för cellerna 
    for (let j = 0; j < cities.length; j++) {
          const DistanceCell = document.createElement("div");
          DistanceCell.classList.add("cell");
          tabell.appendChild(DistanceCell);
          
          let distanceValue = null; 
          for (let distance of distances) { 
              if (distance.city1 === cities[i].id) { //kontrollera om city1(id) matchar id för den satden som finns på index [i] i cities. 
                if (distance.city2 === cities[j].id) {//måste ha i på ena och j på andra eftersom ajg vill matcha städer från rader med städer från kolumner 
                   distanceValue = distance.distance; //båda måste matcha för att distanceValue ska få ett nytt värde 
                  break;
                } 
                 
              }
              if (distance.city2 === cities[i].id) {
                if (distance.city1 === cities[j].id) {
                  distanceValue = distance.distance; 
                }
              }
          }
        
        if (distanceValue !== null) { 
          DistanceCell.textContent = distanceValue / 10;
        } else {
          DistanceCell.textContent = "";
        }
        
      if (j % 2 === 0) {
        DistanceCell.classList.add("even_col"); 
      } 

      if (i % 2 === 0) {
        DistanceCell.classList.add("even_row"); 
      }
    }
  }
}


//hitta närmsate staden och staden längts bort
function findClosestAndFurtherst() {
  // Hitta staden i `cities` och hämta dess ID
  let citiesObject = null; //skapar en variabel som är tom
    for (let i = 0; i < cities.length; i++) { // går igenom alla städer i cities
      if (cities[i].name === cityFromUser) { // Jämför stadens namn på ett visst index med inmatningen från användaren
        citiesObject = cities[i]; // om det ovan stämmer så ger vi variablen citiesObject värdet av objektet som innehåller stadens namn
        break; // avsluta loopen 
      
      }  
    }

  if (citiesObject !== null) {  // !== betyder stirkt olika, så vi säger att om citiesObject INTE är null, så ska följande hända (blir bara null ifall om staden inte finns)
        const citiesObjectId = citiesObject.id; //vi hämtar stadens id (den staden osm skrivs in i prompt)
  
        let relatedDistances = []; // Skapar en tom array för att lagra de relaterade avstånden.

        for (let i = 0; i < distances.length; i++) {
          let dist = distances[i]; // Hämtar det aktuella avståndsobjektet från distances-arrayen
          if (dist.city1 === citiesObjectId || dist.city2 === citiesObjectId) {
            relatedDistances.push(dist); // gör en array med objekt. Objekten som innehåller t.ex. samma siffra på city 1 kommer att läggas till i arrayen.  
          }
        }   

    //  Hitta närmaste och längst bort baserat på avstånd
    let nearest = null;//vi behöver ett startvärde och därför deklarerar vi variabeln innan loopen börjar 
    let farthest = null;
      for (let i = 0; i < relatedDistances.length; i++) { //relatedDistances en array med 38 objekt och alla 38 objekt ska loopas igeno
            let dist = relatedDistances[i]; //för varje varv i loopen hämtas det aktuella objektet från arrayen med hjälp av index [i]. Det blir 38 objekt, där [i] får värdet av cityFromUser´s index på den valda staden      
          if (nearest === null || dist.distance < nearest.distance) { //är nearest = null eller är det aktuella objektet (dist.distance) mindre än det nuvarande avståndet. Man måste ha med === null för att vid första iterationen så har nearest värdet null, och om man skulle försöka jämföra mer nearest.distance så får man fel, eftersom det inte finns ett värde i nearerst. 
            nearest = dist; 
          }
          if (farthest === null || dist.distance > farthest.distance) {
            farthest = dist; 
          }
      }

    // Hämta namnen på städerna
    let nearestCityId;
      if (nearest.city1 === citiesObjectId) { // om city1 i objektet som representerar nearest är samma som citiesObjectID (vilket är id från valda staden), då ska följande gälla
        nearestCityId = nearest.city2; // I objektet med avstånd så är en av city1 eller city2 den staden som jag skriv i propmt, och den staden vill vi inte använda som närmast eller längst bort, så därför måste vi välja den andra staden. 
    } else {
      nearestCityId = nearest.city1; 
    }
    
    let farthestCityId;
      if (farthest.city1 === citiesObjectId) {
        farthestCityId = farthest.city2; 
    } else {
      farthestCityId = farthest.city1;
    }

    let nearestCity;
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].id === nearestCityId) { //loopa igenom alla objekt i arrayen cities där vi kontrollerar om stadens id är samma som nearestCityId
          nearestCity = cities[i]; //nearestCity blir då objektet som finns på plats [i] 
          break; 
        }
      }

      let farthestCity;
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].id === farthestCityId) { 
          farthestCity = cities[i];  
          break; 
        }
      }

      document.getElementById("closest").textContent = `${nearestCity.name}`; //sätter namnen i h3 med vilken stad som är närmast och längst bort 
      document.getElementById("furthest").textContent = `${farthestCity.name}`; 

//skapar en funktion inom funktionen för att ge färger till de olika städerna (svart, grön och blå)
    function newColorOnCity (pElement, className, text) { //skapar en funktion med parametrar 
      pElement.classList.add(className); 
      if (text) {
        pElement.textContent = text; //denna rad måste vara med för att textcontent endast kommer med ifall om det finns ett textvärde. 
      }
    }
    let cityPElements = document.querySelectorAll(".cityBox"); 

    for (let i = 0; i < cityPElements.length; i++) { //en loop där vi går igenom alla element inom cityPElements 
      let pElement = cityPElements[i]; //Vi tilldelar värdet av cityPElements till variabeln pElement
      if (pElement.textContent === nearestCity.name) {
        newColorOnCity(pElement, "closest", `${nearestCity.name} ligger ${nearest.distance / 10} mil bort`); //anropar funktionen med argument 
      }
      if (pElement.textContent === farthestCity.name) {
        newColorOnCity(pElement, "furthest", `${farthestCity.name} ligger ${farthest.distance / 10} mil bort`); 
      }
      if (pElement.textContent === cityFromUser) {
        newColorOnCity(pElement, "target"); 
      }
    }
  }
}


// Recommended: constants with references to existing HTML-elements

pElement = document.querySelector("p");
h2 = document.querySelector("h2");
title = document.querySelector("title"); 

// Recommended: Ask for the city name and then the rest of the code

let cityFromUser = prompt("Write the name of a city");

const cityNames = [];
for (const city of cities) {
  cityNames.push(city.name) 
}

//Skapar p-element för varje stad och fyller i namnen 
for( let i = 0; i < cityNames.length; i++) { //lenght= hur många gånger loopen ska köras
  let divCities = document.getElementById("cities");
  let pElement = document.createElement("p"); 
  pElement.classList.add("cityBox");  
  pElement.textContent = cityNames[i]; //namnen på städerna
  divCities.appendChild(pElement);  
}

//h2-innehåll görs med en .find på array
let foundCity = null;

for (let i = 0; i < cities.length; i++) {
  if (cities[i].name === cityFromUser) {
    foundCity = cities[i];
    break; // Avsluta loopen när rätt stad hittats
  }
}

if (foundCity) {
  h2.textContent = `${foundCity.name} (${foundCity.country})`;
} else {
  h2.textContent = cityFromUser + " not found in the database";
}
//fixar namnet i title 
if (cityNames.includes(cityFromUser)) {
  title.textContent = cityFromUser;
}
else {
  title.textContent = "Not found";
} 

//anropa funktioner
createTable(); 
findClosestAndFurtherst();
