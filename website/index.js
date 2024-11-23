// Recommended: All functions declared here

function namedCity() {
  const ListOfAllPelements = document.querySelectorAll("#cities p");  
 ListOfAllPelements.forEach(pElement => {
    if (pElement.textContent === cityFromUser) {  
      pElement.classList.add("target"); 
    }
  }); 
}

function createTable() {
  const tabell = document.querySelector("#table"); 
  tabell.style.width = "100%"; 

  //skapa tomma celler överst, och fyll dem med id-nummer (ÖVERSTA RADEN)
  const topCell = document.createElement("div");
  topCell.classList.add("cell"); 
  topCell.classList.add("head_column"); 
  topCell.textContent = "";
  tabell.appendChild(topCell); 

    for ( let a = 0; a < cities.length; a++) {
      const topCell = document.createElement("div");
      topCell.classList.add("cell"); 
      topCell.classList.add("head_column"); 
      topCell.textContent = cities[a].id; 
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
          const cell = document.createElement("div");
          cell.classList.add("cell");
          tabell.appendChild(cell);

          let distanceValue = null; 
          for (let distance of distances) { 
              if (distance.city1 === cities[i].id) { //kontrollera om city1(id) matchar id för den satden som finns på index [i] i cities. 
                if (distance.city2 === cities[j].id); //måste ha i på ena och j på andra eftersom ajg vill matcha städer från rader med städer från kolumner 
                  distanceValue = distance.distance; //båda måset matcha för att distanceValue ska få ett nytt värde 
                  break;
              }
              if (distance.city2 === cities[i].id) {
                if (distance.city1 === cities[j].id); 
                  distanceValue = distance.distance; 
              }
          }

          if (distanceValue !== null) { // !== betyder "strikt olika", så här menar vi att om vi har hittat ett värde så ska textContent fyllas i, och om vi inte hittar ett värde (alltså att distanceValue förblir null) då ska else if gälla. 
              cell.textContent = distanceValue / 10;
          } else if (i === j) {
              cell.textContent = "";
          }
          
      if (j % 2 === 0) {
        cell.classList.add("even_col"); //ger grå bakgrundfärg på varannan kolumn
      } 

      if (i % 2 === 0) {
        cell.classList.add("even_row"); // ger fetstild underlinje till varannan rad
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
  
    //  Filtrera avstånd som är relaterade till staden
    let relatedDistances = distances.filter(function(dist) { //en anonym funktion som körs tillfälligt (definieras på plats) och är utan namn. "Dist" representerar varje objekt i distance och innehåller avståndsinformationen mellan två städer. 
      return dist.city1 === citiesObjectId || dist.city2 === citiesObjectId; 
    }); //filter används för att skapa en ny array som kommer innehålla objekt där villkoret är sant. Objekten kommer innehålla den valda stadens id på antingen city 1 eller city 2. Den går igenom distance-arrayen. 
    // return är för att jag ska komma åt värdet utanför scopet
    // om return får värdet true så kommer objektet att ingå i arrayen soom filter skapar. De objekt som fylls på i arrayen är de som innehåller samma id som antingen city1 eller city 2 har.  

    //  Hitta närmaste och längst bort baserat på avstånd
    let nearest = null;
    let farthest = null;
      for (let i = 0; i < relatedDistances.length; i++) { //relatedDistances en array med 38 objekt och alla 38 objekt ska loopas igeno
            let dist = relatedDistances[i]; //för varje varv i loopen hämtas det aktuella objektet från arrayen med hjälp av index [i]. Det blir 38 objekt, där [i] får värdet av cityFromUser´s index på den valda staden      
          if (nearest === null || dist.distance < nearest.distance) { //är nearest = null eller är det aktuella objektet (dist.distance) mindre än det nuvarande avståndet. 
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
   
    //stad blir grön
    if (cityNames.includes(nearestCity.name)) {
      const ListOfAllPelements = document.querySelectorAll("#cities p");  
      ListOfAllPelements.forEach(pElement => {
        if (pElement.textContent === nearestCity.name) {  
        pElement.classList.add("closest"); 
        pElement.textContent = `${nearestCity.name} ligger ${nearest.distance / 10} mil bort`;
      }
    }); 
   }

   //stad blir blå
   if (cityNames.includes(farthestCity.name)) {
    const ListOfAllPelements = document.querySelectorAll("#cities p");  
    ListOfAllPelements.forEach(pElement => {
      if (pElement.textContent === farthestCity.name) {  
      pElement.classList.add("furthest"); 
      pElement.textContent = `${farthestCity.name} ligger ${farthest.distance / 10} mil bort`;
    }
    }); 
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
const foundCity = cities.find(function(city) {
  return city.name === cityFromUser;
});
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
namedCity ();
createTable(); 
findClosestAndFurtherst();
