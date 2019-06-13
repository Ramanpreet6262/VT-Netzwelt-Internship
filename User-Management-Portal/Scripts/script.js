// Constants for storing different messages
const u_name_empty = "Please enter username";
const u_name_duplicate = "This username already exists. Please try again!";
const pass_empty = "Please enter password";
const cf_pass_empty = "Please enter password again";
const email_empty = "Please enter email address";
const email_invalid = "Please enter a valid e-mail address.";
const pass_length = "Please enter at least 8 characters in password";
const pass_not_match = "Password did not match: Please try again...";
const captcha_empty = "Please Enter CAPTCHA Code";
const captcha_not_match = "The CAPTCHA Code Does Not Match";

// Variables for generating Captcha code
var num1 = Math.ceil(Math.random() * 9) + '';
var num2 = Math.ceil(Math.random() * 9) + '';
var num3 = Math.ceil(Math.random() * 9) + '';
var num4 = Math.ceil(Math.random() * 9) + '';
var num5 = Math.ceil(Math.random() * 9) + '';

//Captcha code generated
var code = num1 + num2 + num3 + num4 + num5;
document.getElementById("txtCaptcha").value = code;
document.getElementById("CaptchaDiv").innerHTML = code;

var why = "";

var storageKeys = [];

var dashboardTable = {};
var obj = {};
var arrKeys = [];
var keys = "";
var myJSON = "";
var myJSON1 = "";
var text = "";
var struc = "";
var tr = "";
var ic = "";
var icon = "";

// To validate form
function validate(thisform) {
    var name = thisform.username.value;
    var pass = thisform.password.value;
    var cfpass = thisform.cfpassword.value;
    var email = thisform.email.value;
    var gender = thisform.gender.value;
    var country = thisform.country.value;
    var flag = 0;

    // Validation for required fields should not be left empty
    if (name == "" || name == null) {
        errorMessage("uname", u_name_empty);
        document.thisform.username.focus();
        flag++;
    }

    if (pass == "" || pass == null) {
        errorMessage("passw", pass_empty);
        document.thisform.password.focus();
        flag++;
    }

    if (cfpass == "" || cfpass == null) {
        errorMessage("cfpassw", cf_pass_empty);
        document.thisform.cfpassword.focus();
        flag++;
    }

    if (email == "" || email == null) {
        errorMessage("mail", email_empty);
        document.thisform.email.focus();
        flag++;
    }

    //Validation for username should be always unique
    if (!(localStorage.getItem("keys") === null)) {
        var keys1 = localStorage.getItem("keys");
        var arrKeys1 = JSON.parse(keys1);
        for (var i = 0; i < arrKeys1.length; i++) {
            if (name == arrKeys1[i]) {
                errorMessage("uname", u_name_duplicate);
                document.thisform.username.focus();
                flag++;
            }
        }
    }

    //Validation for valid email
    if (email.indexOf("@", 0) < 0) {
        errorMessage("mail", email_invalid);
        document.thisform.email.focus();
        flag++;
    }

    if (email.indexOf(".", 0) < 0) {
        errorMessage("mail", email_invalid);
        document.thisform.email.focus();
        flag++;
    }

    //Validation for length of password to be greater than 8
    if (pass.length < 8) {
        errorMessage("passw", pass_length);
        document.thisform.password.focus();
        flag++;
    }

    if (cfpass.length < 8) {
        errorMessage("cfpassw", pass_length);
        document.thisform.cfpassword.focus();
        flag++;
    }

    //Validation to check if both passwords are same or not
    if (pass != cfpass) {
        errorMessage("cfpassw", pass_not_match);
        document.thisform.cfpassword.focus();
        flag++;
    }

    // Captcha Script
    if (thisform.CaptchaInput.value == "") {
        why += captcha_empty;
    }
    if (thisform.CaptchaInput.value != "") {
        if (ValidCaptcha(thisform.CaptchaInput.value) == false) {
            why += captcha_not_match;
        }
    }
    if (why != "") {
        errorMessage("cap", why);
        flag++;
    }

    if (flag > 0) {
        return false;
    } else if (flag == 0) {
        storage(name, pass, email, gender, country);
        return true;
    }
}

// Validate input against the generated number
function ValidCaptcha() {
    var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
    var str2 = removeSpaces(document.getElementById('CaptchaInput').value);
    if (str1 == str2) {
        return true;
    } else {
        return false;
    }
}

// Remove the spaces from the entered and generated code
function removeSpaces(string) {
    return string.split(' ').join('');
}

// Display error messages in the form for invalid input
function errorMessage(id, message) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).innerHTML = message;
    setTimeout(function () {
        document.getElementById(id).style.display = "none";
    }, 5000);
}

function storage(name, pass, email, gender, country) {
    document.getElementById("form").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    //Storing data
    var data = {
        name: name,
        password: pass,
        email: email,
        gender: gender,
        country: country
    };
    myJSON = JSON.stringify(data);
    localStorage.setItem(name, myJSON);

    //Getting keys to retrieve data
    if (localStorage.getItem("keys") === null) {
        storageKeys.push(name);
        myJSON1 = JSON.stringify(storageKeys);
        localStorage.setItem("keys", myJSON1);
        keys = localStorage.getItem("keys");
        arrKeys = JSON.parse(keys);
    } else {
        keys = localStorage.getItem("keys");
        arrKeys = JSON.parse(keys);
        arrKeys.push(name);
        myJSON1 = JSON.stringify(arrKeys);
        localStorage.setItem("keys", myJSON1);
    }

    retrieveData(arrKeys, name);
    dashboardTable.appendChild(struc);

}

function retrieveData(arrKeys, name) {
    dashboardTable = document.getElementById("dashboardTable");
    struc = document.createElement("tbody");
    struc.setAttribute("id", "tbody");
    // Retrieving data
    for (var i = 0; i < arrKeys.length; i++) {
        text = localStorage.getItem(arrKeys[i]);
        obj = JSON.parse(text);

        //Showing data on Dashboard page
        tr = document.createElement("tr");
        createRow(obj, name);
        struc.appendChild(tr);
    }
}

function createRow(obj, name) {
    createContent(obj.name);
    createContent(obj.email);
    createContent(obj.gender);
    createContent(obj.country);
    createActions(obj, name);
}

function createContent(text) {
    var td = document.createElement("td");
    var content = document.createTextNode(text);
    td.appendChild(content);
    tr.appendChild(td);
}

function createActions(obj, name) {
    if (obj.name == name) {
        ic = document.createElement("td");
        createIcons("fa fa-pencil", "pencil", "edit('" + obj.name + "')", obj.name);
        createIcons("fa fa-trash", "trashdisabled");
        tr.appendChild(ic);
    } else {
        ic = document.createElement("td");
        createIcons("fa fa-pencil", "pencil", "edit('" + obj.name + "')", obj.name);
        createIcons("fa fa-trash", "trash", "deleteModal('" + obj.name + "')", obj.name);
        tr.appendChild(ic);
    }
}

function createIcons(clas, idd, func, oname) {
    icon = document.createElement("i");
    icon.setAttribute("class", clas);
    icon.setAttribute("id", idd);
    icon.setAttribute("onclick", func);
    icon.setAttribute("name", oname);
    ic.appendChild(icon);
}

function resetForm() {
    document.getElementById("form1").reset();
}

function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("form").style.display = "block";
    resetForm();
    window.location.reload();
}

function edit(oname) {
    alert(oname);
}

function deleteModal(oname) {
    var button = document.getElementById("deleteText");
    button.setAttribute("name", oname);
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
}

function deleteData(oname) {
    localStorage.removeItem(oname);
    deleteStorage(oname);
    document.getElementById("myModal").style.display = "none";
}

function deleteStorage(oname) {
    var keys1 = localStorage.getItem("keys");
    var arrKeys1 = JSON.parse(keys1);
    var index = arrKeys1.indexOf(oname);
    arrKeys1.splice(index, 1);
    var myJSON2 = JSON.stringify(arrKeys1);
    localStorage.setItem("keys", myJSON2);

    var parent = document.getElementById("dashboardTable");
    var child = document.getElementById("tbody");
    parent.removeChild(child);

    var loggedInUser = arrKeys1[arrKeys1.length - 1];
    retrieveData(arrKeys1, loggedInUser);
    dashboardTable.appendChild(struc);
    console.log("hogia !!!!");
}