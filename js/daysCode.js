function openModal(value) {
    
    var x = document.getElementById("lstDays");
    var days = JSON.parse(localStorage.getItem("days"));
    var dayText = value;
    
    x.className = x.className.replace(" w3-show", "");
    document.getElementById('day').style.display='block';  
    document.getElementById("dayText").innerHTML = value;
    document.getElementById("enterTask").focus();
   
    document.getElementById("modalList").innerHTML = "";
    
    for (var i = 0; i < days.length; i++) {
        var obj = days[i];
        if (obj['day'] == dayText) {
            var value = obj['todo'];
            addItem(value);
        }
    }
}

function removeItem(value) {
    
    const elem = document.getElementById("modalList");
    var item = document.getElementById(value);
    var str = item.innerText.trimStart();
     
    var days = JSON.parse(localStorage.getItem("days"));
    var idx = days.findIndex(i => i["todo"] === str);
    
    days.splice(idx, 1);
    localStorage.setItem("days", JSON.stringify(days));  
    
    elem.removeChild(item);       
}

function getModalInput() {
        
    var value = document.getElementById("enterTask").value;
    
    addItem(value);
    createDaysArray(value);
}

function addItem(value){
   
    const elem = document.getElementById("modalList");
    const input = document.getElementById("enterTask");
    var length = elem.getElementsByTagName("li").length;
    var itemId = length + 1;
    var listItem = document.createElement("li");
                    
    listItem.setAttribute("id", itemId);
    let i = document.createElement("i");
    i.classList.add("fa","fa-trash")
    listItem.innerHTML = i.outerHTML + " " + value;
   
    input.value = "";
    elem.appendChild(listItem);
    
}

function createDaysArray(value) {

//Get the array from local storage and add to it.
//get value from getModalInput()
//If the value isn't an empty string, create object and
//push into Array and save to storage
//If the value is an empty string, alert user  

var days = JSON.parse(localStorage.getItem("days"));

var nd = document.getElementById("dayText").innerHTML
var tm = new Date().toLocaleTimeString(); 
var dt = new Date().toLocaleDateString(); 

    if (value !== "") {
        var obj = {
            "todo": value,
            "checked": "false",
            "bold": "true",
            "day" : nd,
            "time" : tm,
            "date" : dt
        };
        
        days.push(obj);  
        localStorage.setItem("days", JSON.stringify(days));  
    } else {
        alert("Enter a Task");
      
    }
}    

function dropDown() {
    var x = document.getElementById("lstDays");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
        var x = document.getElementById("lstDays");
        x.className = x.className.replace(" w3-show", "");
    }
  }

  