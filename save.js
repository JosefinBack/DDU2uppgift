function createTable() {
    const tabell = document.createElement("table"); 
    tabell.id = "table";  
  
    const headerRow = document.createElement("tr"); 
    const emptyHeader = document.createElement("th"); 
    headerRow.appendChild(emptyHeader); 
  
    for (let b = 0; b < cityNames.length; b++) {
        console.log(cityNames.length);
        const headerCell = document.createElement("div");
        tabell.appendChild(headerCell);
        emptyCell.textContent = b; //nummer 0 - 38 (index?)
      } 
  
  for (let i = 0; i < distances.length; i++) {
    const row = document.createElement("tr");
    const rowHeader = document.createElement("th"); 
    rowHeader.textContent = cityNames[i];  
    row.appendChild(rowHeader);
    
      for ( let key in distances[i]) { 
        const cell = document.createElement("td");
        cell.textContent = distances[i][key]; 
        cell.classList.add("cell"); 
        row.appendChild(cell); 
      }
      tabell.appendChild(row); 
    } 
    const greyTable = document.getElementById("table"); 
    greyTable.appendChild(tabell); 
  }


  
function createTable() {
    const tabell = document.getElementById("table"); 
    const greyTable = document.createElement("div");  
    tabell.style.display = "grid"; 
    const row = cityNames.length; 
    const column = 39;  
    tabell.style.gridTemplateColumns = `repeat(${column}, 1fr)`; 
    tabell.style.gridTemplateRows = `repeat(${row}), 1fr`;
      //tabell.id = "table"; 
    greyTable.appendChild(tabell)
  
    for (let i = 0; i <= cities.length; i++) {
      let namesRow = document.createElement("p");
      namesRow.textContent = cityNames[i]; // namnen på städerna
      tabell.appendChild(namesRow); 
      
      for (let k = 0; k < row; k++) {  
        for (let j = 0; j < column; j++) {  
          //const cell = document.createElement('div');  
          //cell.classList.add("cell");  
      
          // Placera stadsnamn i första kolumnen
          if (j === 0) {  
            namesRow.textContent = cityNames[k];  
          }  
      
          //tabell.appendChild(cell);  
        }  
      }
  
    }

  
  for (let i = 0; i < distances.length; i++) {
    //console.log(i); //alla nummer 0 - 740
    
    
    
      for ( let key in distances[i]) { 
  
        ///cell.textContent = distances[i][key];  //siffrona
        //cell.classList.add("cell"); 
        //row.appendChild(cell); 
      }
      //tabell.appendChild(); 
    } 
     
    ; 
  }