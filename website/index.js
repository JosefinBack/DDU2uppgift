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
  const tabell = document.querySelector("#table"); // Grid-layout

  tabell.style.width = "100%"; 
  const rows = 40; 
  const columns = 40;

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
      emptyCell.textContent = cities[a-1].id; ///hoppa över första cellen och fyller i alla celler 
    }
  }

  // Iterera över städer och lägg till namn i griden
  for (let i = 0; i < cityNames.length; i++) {
    // Skapa och lägg till namn på städer i den första kolumnen
    let namesRow = document.createElement("div");
    namesRow.textContent = `${cities[i].id}` + " - " + cityNames[i]; // Namnen på städerna
    namesRow.classList.add("head_row");
    namesRow.classList.add("cell");
    namesRow.style.display = "grid"; //var tvungen att ha style grid för annars blev inte storleken rätt
    tabell.appendChild(namesRow);

    if ((i + 2) % 2 === 0) {
      namesRow.classList.add("even_row");
      cell.classList.add("even_row");
     }
    

    // Skapa celler för resterande kolumner i samma rad och skapar innehåll för cellerna 
   for (let j = 0; j < cities.length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.display = "grid";

        if ((j + 2) % 2 === 0) {
          cell.classList.add("even_col");
      }

        let distanceValue = null; //värdet av distance
        for (let distance of distances) {
            if ((distance.city1 === cities[i].id && distance.city2 === cities[j].id)) {
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

        tabell.appendChild(cell);
    }
  }
}


//hitta närmsate staden och staden längts bort
function findClosestAndFurtherst() {
  // Hitta staden i `cities` och hämta dess ID
  const userCityData = cities.find(city => city.name === cityFromUser); //.find() går igenom varje elemnt i arrayen och returnerar det första värdet som blir true

  if (userCityData) {
    const userCityId = userCityData.id; 
  
    //  Filtrera avstånd som är relaterade till staden
    const relatedDistances = distances.filter(
      dist => dist.city1 === userCityId || dist.city2 === userCityId
    );

    //  Hitta närmaste och längst bort baserat på avstånd
    let nearest = relatedDistances[0];
    let farthest = relatedDistances[0];

    relatedDistances.forEach(dist => {
      if (dist.distance < nearest.distance) nearest = dist;
      if (dist.distance > farthest.distance) farthest = dist;
    }); 

    // Hämta namnen på städerna
    const nearestCityId = nearest.city1 === userCityId ? nearest.city2 : nearest.city1;
    const farthestCityId = farthest.city1 === userCityId ? farthest.city2 : farthest.city1;

    const nearestCity = cities.find(city => city.id === nearestCityId);
    const farthestCity = cities.find(city => city.id === farthestCityId);


    //console.log(`${nearestCity.name} (${nearest.distance}`)
   // console.log(`${farthestCity.name} (${farthest.distance}`)

    document.getElementById("closest").textContent = `${nearestCity.name}`; //sätter namnen i h3 med vilken stad som är närmast och längst bort 
    document.getElementById("furthest").textContent = `${farthestCity.name}`; 
   
    //stad blir grön
    if (cityNames.includes(nearestCity.name)) {
      const allPelements = document.querySelectorAll("#cities p");  
      allPelements.forEach(pElement => {
      if (pElement.textContent === nearestCity.name) {  
      pElement.classList.add("closest"); 
      pElement.textContent = `${nearestCity.name} ligger ${nearest.distance / 10} mil bort`;
      }
    }); 
   }

   //stad blir blå
   if (cityNames.includes(farthestCity.name)) {
    const allPelements = document.querySelectorAll("#cities p");  
    allPelements.forEach(pElement => {
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
greyTable = document.getElementById("table"); 

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
  h2.textContent = cityFromUser + "not found in the database";
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
