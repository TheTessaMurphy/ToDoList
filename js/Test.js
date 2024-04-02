function Main() {
    //Get arrays from local storage
    document.getElementById("myTask").focus();

    var transformed = JSON.parse(localStorage.getItem("transformed"));
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var checks = JSON.parse(localStorage.getItem("checks"));    
    
    //Call loadList to create list on page
    loadList(transformed, tasks, checks);   
}

function loadList(transformed) {

    //Get array and create a loop to call createCheckbox to create each checkbox
    //Then call createCheckbox to check or uncheck boxes.
        if (transformed.length != 0){
            transformed.forEach(createCheckbox);
        }
    
    //runs through when page loads or reloads and adds checks and bold.  
    var checkbox = document.querySelectorAll("input[type='checkbox']");
    var labels = document.getElementsByTagName('LABEL');
    
        for (var i = 0; i < transformed.length; i++){
            var obj = transformed[i];
            if (checkbox[i].checked == true ){
                labels[i].classList.add("gray");
            } 
    
            if (obj["bold"]=="true"){
                labels[i].classList.add("bold");
                
            }
        }    
    }

function createCheckbox(obj) {
    //read each task from loadList and create the checkbox and label
    //then append to fieldset so it shows up on the screen
    //and finally, clear input box

    var linebreak = document.createElement("br"); //creates linebreak so checkboxes appear as a list
    var checkboxes = document.createElement("INPUT");
    var label = document.createElement("LABEL");
        
    checkboxes.setAttribute("type", "checkbox");
    checkboxes.setAttribute("class", "w3-check");
    checkboxes.value=obj["todo"];
    checkboxes.checked=JSON.parse(obj["checked"]);
    
    label.htmlFor = obj["todo"];
    
    myFieldset.appendChild(checkboxes);
    myFieldset.appendChild(label);
    label.appendChild(document.createTextNode(" "));
    label.appendChild(document.createTextNode(obj["todo"]));
    myFieldset.appendChild(linebreak);
        
        document.getElementById('myTask').value = "";   //Clear the input box
    }   

function boxChecked(elt){
    // Called when a checkbox is clicked
    // if the checkbox is checked, a class is added to its label
    // that turns the text gray. If checkbox is unchecked, the class is removed
    // the value in the object is changed and the array saved to local storage      
        
        var target = elt;
        const value = elt.value;
        var arr = JSON.parse(localStorage.getItem("transformed"));
        var obj = arr.find(obj => obj["todo"] === value);
        var indx = arr.indexOf(obj);
        var labels = document.getElementsByTagName('LABEL');
        
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor == value ) {
                
                if(target.checked){
                    labels[i].classList.add("gray");
                    obj["checked"] = "true";
                    arr.splice(indx, 1, obj);
                    localStorage.setItem("transformed", JSON.stringify(arr));   
                } else { labels[i].classList.remove("gray");
                obj["checked"] = "false"
                arr.splice(indx, 1, obj);
                localStorage.setItem("transformed", JSON.stringify(arr));  
                }  
            }    
        } 
    }

function makeBold(elt){
    //Similar to boxChecked but the label is checked
    //rather than the checkbox    
       
        var target = elt;
        const value = elt.htmlFor;
                
        var arr = JSON.parse(localStorage.getItem("transformed"));
        var obj = arr.find(obj => obj["todo"] === value);
        var indx = arr.indexOf(obj);
        
        var labels = document.getElementsByTagName('LABEL');
        
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor == value ) {
                if(target.classList.contains("bold")){
                    labels[i].classList.remove("bold");
                    obj["bold"] = "false"
                    arr.splice(indx, 1, obj); 
                    localStorage.setItem("transformed", JSON.stringify(arr));   
                } else { 
                    labels[i].classList.add("bold");
                    obj["bold"] = "true"
                    arr.splice(indx, 1, obj); 
                    localStorage.setItem("transformed", JSON.stringify(arr));  
                }  
            }    
        } 
    }

function getInput() {
    // Get the input element by its ID
    //and pass it to createArray 
        
    var inputField = document.getElementById("myTask"); 
    var value = inputField.value; 
        
    createArray(value);
    
    }
                    
function createArray(val) {

    //Get the array from local storage and add to it.
    //get value from getInput()
    //If the value isn't an empty string, create object and
    //push into Array and save to storage
    //If the value is an empty string, alert user  
    
    var transformed = JSON.parse(localStorage.getItem("transformed"));
            
        var nd = new Date().toLocaleDateString('en-us', { weekday:"long"});
        var tm = new Date().toLocaleTimeString(); // 11:18:48 AM;
        var dt = new Date().toLocaleDateString(); 
    
        if (val !== "") {
            var obj = {
                "todo": val,
                "checked": "false",
                "bold": "false",
                "day" : nd,
                "time" : tm,
                "date" : dt
            };
    
            transformed.push(obj);  
            localStorage.setItem("transformed", JSON.stringify(transformed));  
            createCheckbox(obj);
        } else {
            alert("Enter a Task");
        }
    }    
        
function clearList() {
    //runs through the list backwards because splice throws numbers off.
    //If the checkbox is checked, deletes that item
    //from the array then reloads the page so the updated list appears.
    
        var transformed = JSON.parse(localStorage.getItem("transformed"));
        var check = document.querySelectorAll("input[type='checkbox']");
        for (var i=check.length-1; i >=0; i--){
            if(check[i].checked){
                
                transformed.splice(i, 1);
            }
        } 
        
        localStorage.setItem("transformed", JSON.stringify(transformed));
        location.reload(true);
    }

    