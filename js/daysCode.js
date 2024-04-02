function openModalTemp(value){
    //const value = event.target.id;
    var dayText = value;
    
    alert(dayText)
  }

function openModal(value) {
    
    document.getElementById('day').style.display='block';  
    document.getElementById("dayText").innerHTML = value;
    var dayText = value;
    document.getElementById("enterTask").focus();
    //event.target.value =  "";   
    
    var days = JSON.parse(localStorage.getItem("days"));

   
    document.getElementById("modalList").innerHTML = "";
    
    for (var i = 0; i < days.length; i++) {
        var obj = days[i];
        if (obj['day'] == dayText) {
            var value = obj['todo'];
            addItem(value);
        }
    }
    
}

//***** BELOW HERE, WORKING ON ARRAY *****



function removeItem(value) {
    
    //const value = event.target.id;
    const elem = document.getElementById("modalList");
    var item = document.getElementById(value);
    var str = item.innerText.trimStart();
    //var str = string.trimStart();
    
    var days = JSON.parse(localStorage.getItem("days"));
    var idx = days.findIndex(i => i["todo"] === str);
    //var obj = days.find(obj => obj["todo"] === str);
    
    days.splice(idx, 1);
    localStorage.setItem("days", JSON.stringify(days));  
    
    elem.removeChild(item);       
}

function getModalInput() {
    //var input = document.getElementById("enterTask");
    
    var value = document.getElementById("enterTask").value;
    
    addItem(value);
    createDaysArray(value);
}

function addItem(value){
   
    const elem = document.getElementById("modalList");
    const input = document.getElementById("enterTask");
    //var value = input.value;
    var length = document.getElementById("modalList").getElementsByTagName("li").length;
    var itemId = length + 1;
    var listItem = document.createElement("li");
    
                
    listItem.setAttribute("id", itemId);
    //listItem.addEventListener("click", removeItem);
    //listItem.setAttribute("onclick","removeItem()");
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
var tm = new Date().toLocaleTimeString(); // 11:18:48 AM;
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