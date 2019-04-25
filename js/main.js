var myForm = document.getElementById('myForm');
var date = document.getElementById("date");


// Show todays date
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

// on Submit Form
myForm.addEventListener('submit', function (e) {

    var todoName = document.getElementById("todoname").value;

    // Form validation
    if (!todoName) {
        alert('Please Enter The Form Data!!!');
        return false;
    }

    // set TODO LIST to localStorage  
    if (localStorage.getItem('TODO') === null) {
        var LIST = [];
        LIST.push(todoName);
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }
    else {
        var LIST = JSON.parse(localStorage.getItem('TODO'));
        LIST.push(todoName);
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }

    // clear or empty form inputs after submit
    document.getElementById('myForm').reset();

    fetchToDo();
    e.preventDefault();
});

// delete ToDo function
function deleteToDo(todoName) {
    var LIST = JSON.parse(localStorage.getItem('TODO'));
    for (i = 0; i < LIST.length; i++) {
        if (LIST[i] == todoName) {
            LIST.splice(i, 1);
        }
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
    fetchToDo();
}



// add ToDo function
function fetchToDo() {
    var LIST = JSON.parse(localStorage.getItem('TODO'));
    var list = document.getElementById('list');
    list.innerHTML = '';
    for (i = 0; i < LIST.length; i++) {
        list.innerHTML += 
        '<li class="item">'+
            '<p class="text">' + LIST[i] + '</p>'+
            '<i onclick="deleteToDo(\'' + LIST[i] + '\')" class="fa fa-trash-o de"></i>'+
        '</li>';
    }
}

// deleteAllToDo function
function deleteAllToDo() {
    var LIST = JSON.parse(localStorage.getItem('TODO'));
    LIST = [];
    localStorage.setItem('TODO', JSON.stringify(LIST));
    fetchToDo();
}
