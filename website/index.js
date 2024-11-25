// Recommended: All functions declared here

function createTable() {
  const tabell = document.querySelector("#table"); 
  tabell.style.width = "100%";

  const topCell = document.createElement("div");
  topCell.classList.add("cell"); 
  topCell.classList.add("head_column"); 
  topCell.textContent = "";
  tabell.appendChild(topCell); 

    for (let i = 0; i < cities.length; i++) {
      const topCell = document.createElement("div");
      topCell.classList.add("cell"); 
      topCell.classList.add("head_column"); 
      topCell.textContent = cities[i].id; 
      tabell.appendChild(topCell); 
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
        const DistanceCell = document.createElement("div");
        DistanceCell.classList.add("cell");
        tabell.appendChild(DistanceCell);

        let distanceValue = null; 
        for (let distance of distances) { 
            if (distance.city1 === cities[i].id) {
              if (distance.city2 === cities[j].id) {
                 distanceValue = distance.distance; 
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
  
      let relatedDistances = [];
      
      for (let i = 0; i < distances.length; i++) {
        let dist = distances[i]; 
          if (dist.city1 === citiesObjectId || dist.city2 === citiesObjectId) {
            relatedDistances.push(dist);
          }
        }  
 
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

        document.getElementById("closest").textContent = `${nearestCity.name}`; 
        document.getElementById("furthest").textContent = `${farthestCity.name}`; 

    function newColorOnCity (pElement, className, text) { 
      pElement.classList.add(className); 
      if (text) {
        pElement.textContent = text;  
      }
    }
      let cityPElements = document.querySelectorAll(".cityBox"); 
  
      for (let i = 0; i < cityPElements.length; i++) { 
        let pElement = cityPElements[i]; 
        if (pElement.textContent === nearestCity.name) {
          newColorOnCity(pElement, "closest", `${nearestCity.name} ligger ${nearest.distance / 10} mil bort`);
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
for (let city of cities) {
  cityNames.push(city.name) 
}

for( let i = 0; i < cityNames.length; i++) { 
  let divCities = document.getElementById("cities");
  let pElement = document.createElement("p"); 
  pElement.classList.add("cityBox");  
  pElement.textContent = cityNames[i]; 
  divCities.appendChild(pElement);  
}

let foundCity = null;

for (let i = 0; i < cityNames.length; i++) {
  if (cities[i].name === cityFromUser) {
    foundCity = cities[i];
    break; 
  }
}

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

createTable(); 
findClosestAndFurtherst();
