//Global Variable
var ListOfTasks = Array();

//JSON Function

function SaveListToJSON(list) {
    localStorage.dict = JSON.stringify(list);
}

function ImportBackToList(myJSON) {
    return JSON.parse(myJSON);
}

//Default Array for Tasks

function setDefaultList(num) {
    var temp_list = [];
    for (var i = 0; i < num; i++) {
        temp_list.push(Array(("Test" + i), Array(i, i, i,"12-April-2019", "false")));
    }
    return temp_list;
}
//Due Date Functions
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
function dateFunction() {
    var today = new Date();
    var date = prompt("Please enter due date.", today.getDate() + "-" + monthNames[today.getMonth()] + "-" + today.getFullYear());
    return date
}   

//Add new Tasks to the List

function addTask() {
    var task = prompt("What is the task?", "Type Here");
    if (task == null || task == "") {
        console.log("Don't try and break it");
    } else {
        var time = prompt("What is the time to complete the task in hours?", "Type Here");
        if (time == null || time == "") {
            console.log("Don't try and break it");
        } else {
            var minutes = prompt("What is the time to complete the task in minutes?", "Type Here");
            if (minutes == null || minutes == "") {
                console.log("Don't try and break it");
            } else {
                var priority = prompt("What is the priority?", "Type Here");
                if (priority == null || priority == "") {
                    console.log("Don't try and break it");
                } else {
                    
                    ListOfTasks.push(Array(task, Array(priority, time, minutes, dateFunction(),"false")));
                    SaveListToJSON(ListOfTasks);
                    tablizer(ListOfTasks);
                }
            }
        }
    }
}


// JavaScript source code
function test() {
    console.log("test worked")

}

function listMaker() {
    if (typeof (Storage) !== "undefined") {
        
        var new_string_list = "";
        var print_string = ('<table style="width: 100%"><tr><th>Number</th><th>Task</th><th>Priority</th><th>Hours</th><th>Minutes</th></tr>');
        var counter = 1;
        for (var i = 0; i < ListOfTasks.length; i++) {
            //console.log(dict);
            print_string += "<tr>";
            new_string_list += ListOfTasks[i][0] + " " + ListOfTasks[i][1] + "<br>";
            console.log("made it here");
            //if (dict[key]='undefined')
            
            
            print_string += "<td>" + counter + "</td><td>" + ListOfTasks[i][0] + "</td><td>" + ListOfTasks[i][1][0] + "</td><td>" + ListOfTasks[i][1][1] + "</td><td>" + ListOfTasks[i][1][2] + "</td>";
            counter++;
            print_string += "</tr>";
        }
        print_string += "</table >";
        localStorage.dict = new_string_list;

        document.getElementById("list").innerHTML = print_string;
        
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function remover() {
    var txt;
    var item = prompt("Please enter the list number you wish to delete:", "#");
    if (item == null || item == "") {
        txt = "User cancelled the prompt.";
    } else {
        var counter = 1;
        for (var i = 0; i < ListOfTasks.length;i++) {
            //console.log(counter);
            console.log(ListOfTasks[i]);
            console.log(counter == parseInt(item, 10));
            if (counter == parseInt(item, 10)) {
                console.log("removing the item");
                delete ListOfTasks[i];
            }
            counter += 1;
        }
    }
    listMaker();
}

function loadList() {
    var temp_list2 = Array();
    var temp_list = localStorage.dict.split('<br>');
    console.log("This is the loadlist output for breaking on br");
    console.log(temp_list);
    console.log("This is the end of the loadlist output for breaking on br");
    for (var i = 0; i < temp_list.length-1; i++) {
        temp_list2.push( temp_list[i].split('! '));
    }
    console.log(temp_list2);
    ListOfTasks = temp_list2;
    //make_dict(printList(temp_list));
    
}

function printList(t_list) {
    var new_list = [];
    for (var i = 0; i < t_list.length-1; i++) {
        //console.log(t_list[i]);
        var temp_item = t_list[i].split('! ');
        console.log(temp_item);
        new_list.push(temp_item);
    }
    console.log(new_list);
    return new_list;
}



function fix_string_list(strings) {
    if (typeof (strings) == 'string') {
        return strings.split(',');
    }
    else {
        return strings;
    }
}

function priority() {
    var order_list = [];
    for (var i = 0; i < ListOfTasks.length; i++) {
        order_list.push(Array(ListOfTasks[i][0], Array(parseInt(ListOfTasks[i][1][0], 10), parseInt(ListOfTasks[i][1][1], 10), parseInt(ListOfTasks[i][1][2],10))));
            }
    order_list = order_list.sort(Comparator);
    console.log("This is where to look");
    console.log(ListOfTasks);
    console.log(order_list);
    tablizer(order_list);
    AdditAllUp(order_list);
}

function Comparator(a, b) {
    if (a[1][0] < b[1][0]) return -1;
    if (a[1][0] > b[1][0]) return 1;
    return 0;
}

function AdditAllUp(list) {
    var totalminutes = 0;
    for (var i = 0; i < list.length; i++) {
        totalminutes += list[i][1][2];
        totalminutes += list[i][1][1] * 60;
        console.log(totalminutes);

    }
}

function tablizer(list) {
    if (typeof (Storage) !== "undefined") {
        var print_string = ('<table style="width: 100%"><tr><th>Task</th><th>Priority</th><th>Hours</th><th>Minutes</th></tr>');
        for (var i = 0; i < list.length; i++) {
            print_string += "<tr>";
            print_string += "<td>" + list[i][0] + "</td><td>" + list[i][1][0] + "</td><td>" + list[i][1][1] + "</td><td>" + list[i][1][2] + "</td>";
            
            print_string += "</tr>";
        }
        print_string += "</table >";
        document.getElementById("list").innerHTML = print_string;
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function clearLocalStorage() {
    localStorage.dict = {};
}