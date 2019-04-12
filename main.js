//Global Variable
var ListOfTasks = Array();

//JSON Function

function SaveListToJSON(list) {
    localStorage.dict = JSON.stringify(list);
}

function ImportBackToList(myJSON) {
    return JSON.parse(myJSON) ;
}

//Default Array for Tasks

function basicLoad() {
    ListOfTasks = ImportBackToList(localStorage.dict);
}

function setDefaultList(num) {
    var temp_list = [];
    for (var i = 0; i < num; i++) {
        temp_list.push(Array(("Test" + i), Array(i, i, i,"13-April-2019", "false")));
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
        if (time == null || time == "" || isNaN(time)) {
            console.log("Don't try and break it");
        } else {
            var minutes = prompt("What is the time to complete the task in minutes?", "Type Here");
            if (minutes == null || minutes == "" || isNaN(minutes)) {
                console.log("Don't try and break it");
            } else {
                var priority = prompt("What is the priority?", "Type Here");
                if (priority == null || priority == "" || isNaN(priority)) {
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

// This sets the priority
function priority() {
    var order_list = [];
    for (var i = 0; i < ListOfTasks.length; i++) {
        order_list.push(Array(ListOfTasks[i][0], Array(parseInt(ListOfTasks[i][1][0], 10), parseInt(ListOfTasks[i][1][1], 10), parseInt(ListOfTasks[i][1][2], 10), ListOfTasks[i][1][3], ListOfTasks[i][1][4])));
    }
    order_list = order_list.sort(Comparator);
    //console.log("This is where to look");
    //console.log(ListOfTasks);
    //console.log(order_list);
    var timedList = AdditAllUp(order_list);
    tablizer(timedList);
}


function Comparator(a, b) {
    if (a[1][0] < b[1][0]) return -1;
    if (a[1][0] > b[1][0]) return 1;
    return 0;
}

function AdditAllUp(list) {
    var totalminutes = 0;
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        totalminutes += list[i][1][2];
        totalminutes += list[i][1][1] * 60;
        console.log(totalminutes);
        if (totalminutes < 480) {
            new_list.push(list[i])
            var string = "Total Time To Complete above tasks: " + Math.floor(totalminutes / 60)+ " hrs "+ (totalminutes % 60)+" mins";
            InsertMathInfo(string);
        }
        
    }
    
    return new_list;
}
//This prints out the table
//Order is Task, Priority, Hours, Minutes, Due Date, completed
//
function tablizer(list, p = true, h = true, m = true, dd = true, c = false, counter = false) {
    
    if (typeof (Storage) !== "undefined") {
        var print_string = ('<table style="width: 100%"><tr>')
        if (counter == true){
            var count = 1;
            print_string += '<th>List Number</th>';
        }
        print_string +='<th>Task</th>';
        if (p == true) {
            print_string += '<th>Priority</th>';
        }
        if (h == true) {
            print_string += '<th>Hours</th>';
        }
        if (m == true) {
            print_string += '<th>Minutes</th>';
        }
        if (dd == true) {
            print_string += '<th>Due Date</th>';
        }
        if (c == true) {
            print_string += '<th>Complete</th>';
        }
        //var print_string = ('<table style="width: 100%"><tr><th>Task</th><th>Priority</th><th>Hours</th><th>Minutes</th></tr>');
        for (var i = 0; i < list.length; i++) {
            print_string += "<tr>";
            if (counter == true) {
                print_string += "<td>" + count + "</td>";
                count++;
            }
            print_string += "<td>" + list[i][0] + "</td>"
            
            if (p == true) {
                print_string += "<td>" + list[i][1][0] + "</td>";
            }
            if (h == true) {
                print_string += "<td>" + list[i][1][1] + "</td>";
            }
            if (m == true) {
                print_string += "<td>" + list[i][1][2] + "</td>";
            }
            if (dd == true) {
                print_string += "<td>" + list[i][1][3] + "</td>";
            }
            if (c == true) {
                print_string += "<td>" + list[i][1][4] + "</td>";
            }
            //print_string += "<td>" + list[i][0] + "</td><td>" + list[i][1][0] + "</td><td>" + list[i][1][1] + "</td><td>" + list[i][1][2] + "</td>";

            print_string += "</tr>";
        }
        print_string += "</table >";
        document.getElementById("list").innerHTML = print_string;
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}
//Prints the Full List
function listMaker() {
    tablizer(ListOfTasks, true, true, true, true, true, true);
    InsertMathInfo("");
}
// Removes an item from the array
function remover() {
    listMaker();
    var txt;
    var item = prompt("Please enter the list number you wish to delete:", "#");
    if (item == null || item == "") {
        txt = "User cancelled the prompt.";
    } else {
        if (isNaN(item) || item < 1 || item > ListOfTasks.length) {
            console.log("not a valid number");
        }
        else {
            ListOfTasks.splice((parseInt(item) - 1), 1)
            SaveListToJSON(ListOfTasks);
        }
    }
    listMaker();
}

//Edit Item
function editItem() {
    listMaker();
    var item = prompt("Please enter the list number you wish to edit:", "#");
    
    if (item == null || item == "") {
        txt = "User cancelled the prompt.";
    } else {
        if (isNaN(item) || item < 1 || item > ListOfTasks.length) {
            console.log("not a valid number");
        }
        else {
            item--;
            var otask = ListOfTasks[item][0];
            var opriority = ListOfTasks[item][1][0];
            var ohours = ListOfTasks[item][1][1];
            var ominutes = ListOfTasks[item][1][2];
            var oduedate = ListOfTasks[item][1][3];
            var ocomplete = ListOfTasks[item][1][4];
            var task = prompt("What is the task?", otask);
            if (task == null || task == "") {
                console.log("Don't try and break it");
            } else {
                var time = prompt("What is the time to complete the task in hours?",ohours);
                if (time == null || time == "" || isNaN(time)) {
                    console.log("Don't try and break it");
                } else {
                    var minutes = prompt("What is the time to complete the task in minutes?", ominutes);
                    if (minutes == null || minutes == "" || isNaN(minutes)) {
                        console.log("Don't try and break it");
                    } else {
                        var priority = prompt("What is the priority?", opriority);
                        if (priority == null || priority == "" || isNaN(priority)) {
                            console.log("Don't try and break it");
                        } else {
                            ListOfTasks.splice((parseInt(item)), 1)
                            ListOfTasks.push(Array(task, Array(priority, time, minutes, dateFunction(), "false")));
                            SaveListToJSON(ListOfTasks);
                            tablizer(ListOfTasks);
                        }
                    }
                }
            }
        }
        }
    }

function InsertMathInfo( text) {
    var print_string="<br><p>"+text+ "</p>"
    document.getElementById("additional").innerHTML = print_string;

}
//
//
//
//
// JavaScript source code
function test() {
    console.log("test worked")

}








function fix_string_list(strings) {
    if (typeof (strings) == 'string') {
        return strings.split(',');
    }
    else {
        return strings;
    }
}






function clearLocalStorage() {
    localStorage.dict = {};
}