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
        cell.textContent = distances[i][key]; 
        cell.classList.add("cell"); 
        row.appendChild(cell); 
      }
      tabell.appendChild(row); 
    } 
    const greyTable = document.getElementById("table"); 
    greyTable.appendChild(tabell); 
  }