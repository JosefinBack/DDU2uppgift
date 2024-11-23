// Recommended: All functions declared here

function namedCity() {
  const listOfAllPelements = document.querySelectorAll("#cities p");  
  listOfAllPelements.forEach(pElement => {
    if (pElement.textContent === cityFromUser) {  
      pElement.classList.add("target"); 
    }
  }); 
}

function createTable() {
  const tabell = document.querySelector("#table"); 
  tabell.style.width = "100%"; 
  const rows = 40; 

  for ( let a = 0; a <= cities.length; a++) {
    const topCell = document.createElement("div");
    topCell.classList.add("cell"); 
    topCell.classList.add("head_column"); 
    tabell.appendChild(topCell); 

    if (a === 0) {
      topCell.textContent = ""; 
    } else {
      topCell.textContent = cities[a-1].id; 
    }
  }

  for (let i = 0; i < cities.length; i++) {
    let namesRow = document.createElement("div");
    namesRow.textContent = `${cities[i].id}` + " - " + cities[i].name; 
    namesRow.classList.add("head_row");
    namesRow.classList.add("cell");
    tabell.appendChild(namesRow);

    if (i % 2 === 0) {
      namesRow.classList.add("even_row"); 
     } 
 
    for (let j = 0; j < cities.length; j++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          tabell.appendChild(cell);

          let distanceValue = null; 
          for (let distance of distances) { 
              if ((distance.city1 === cities[i].id && distance.city2 === cities[j].id)) 
                  distanceValue = distance.distance; 
                  break;
              }
              if (distance.city2 === cities[i].id && distance.city1 === cities[j].id) { 
                  distanceValue = distance.distance;
              }
          }

          if (distanceValue !== null) { 
              cell.textContent = distanceValue / 10;
          } else if (i === j) {
              cell.textContent = "";
          }
          
      if (j % 2 === 0) {
        cell.classList.add("even_col"); 
      } 

      if (i % 2 === 0) {
        cell.classList.add("even_row"); 
      }
     
    }
  }


function findClosestAndFurtherst() {
  let citiesObject = null;
    for (let i = 0; i < cities.length; i++) { 
      if (cities[i].name === cityFromUser) { 
        citiesObject = cities[i]; 
        break; 
      }
    }

  if (citiesObject !== null) {  
        const citiesObjectId = citiesObject.id;
  
    let relatedDistances = distances.filter(function(dist) { 
      return dist.city1 === citiesObjectId || dist.city2 === citiesObjectId; 
    });  
 
    let nearest = null;
    let farthest = null;
      for (let i = 0; i < relatedDistances.length; i++) { 
            let dist = relatedDistances[i];     
          if (nearest === null || dist.distance < nearest.distance) { 
            nearest = dist; 
          }
          if (farthest === null || dist.distance > farthest.distance) {
            farthest = dist; 
          }
      }

    let nearestCityId;
      if (nearest.city1 === citiesObjectId) { 
        nearestCityId = nearest.city2;  
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
        if (cities[i].id === nearestCityId) { 
          nearestCity = cities[i];
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
   
    if (cityNames.includes(nearestCity.name)) {
      const alllistOfAllPelements = document.querySelectorAll("#cities p");  
      alllistOfAllPelements.forEach(pElement => {
      if (pElement.textContent === nearestCity.name) {  
      pElement.classList.add("closest"); 
      pElement.textContent = `${nearestCity.name} ligger ${nearest.distance / 10} mil bort`;
      }
    }); 
   }

   if (cityNames.includes(farthestCity.name)) {
    const alllistOfAllPelements = document.querySelectorAll("#cities p");  
    alllistOfAllPelements.forEach(pElement => {
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

for( let i = 0; i < cityNames.length; i++) { 
  let divCities = document.getElementById("cities");
  let pElement = document.createElement("p"); 
  pElement.classList.add("cityBox");  
  pElement.textContent = cityNames[i]; 
  divCities.appendChild(pElement);  
}

const foundCity = cities.find(function(city) {
  return city.name === cityFromUser;
});
if (foundCity) {
  h2.textContent = `${foundCity.name} (${foundCity.country})`;
} else {
  h2.textContent = cityFromUser + " not found in the database";
}

if (cityNames.includes(cityFromUser)) {
  title.textContent = cityFromUser;
}
else {
  title.textContent = "Not found";
} 

namedCity ();
createTable(); 
findClosestAndFurtherst();
