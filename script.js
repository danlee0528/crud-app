
function sortTable(n) {
    var table, rows, switching, i, x, y, k, shouldSwitch;
    switching = true;
    
    while (switching) {
        table = document.getElementById("usertable");
        switching = false;
        rows = table.rows;
         
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[n].innerHTML.toLowerCase();
            y = rows[i + 1].getElementsByTagName("td")[n].innerHTML.toLowerCase();
            
            // returns 0 if two strings are equal
            // returns -1 if str 1 is sorted before str2
            // return 1 if str1 is sorted after str2 
            k = x.localeCompare(y);
            
            if (k == -1) {
                shouldSwitch = false;
            }else if (k == 1){
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
        console.log("Still Sorting");
    } 
    alert("Sorted!");
}

function sortTableByNumber(n){
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("usertable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        // 3 is the age column
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    alert("Sorted!");
}