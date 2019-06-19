// To generate captcha and assign it to respective fields
var code = generateCaptcha();
document.getElementById("txtCaptcha").value = code;
document.getElementById("CaptchaDiv").innerHTML = code;

// To generate captcha code
function generateCaptcha() {
    var num1 = generateRandomNumber();
    var num2 = generateRandomNumber();
    var num3 = generateRandomNumber();
    var num4 = generateRandomNumber();
    var num5 = generateRandomNumber();
    var captcha_code = num1 + num2 + num3 + num4 + num5;
    return captcha_code;
}

// To generate random numbers for captcha code
function generateRandomNumber() {
    var num = Math.ceil(Math.random() * 9) + "";
    return num;
}

// To check that required fields should not be left empty
function emptyFields(fieldName, message, inputFieldName) {
    var messageId = inputFieldName + "lbl";
    var idOfField = inputFieldName + "Field";
    if(fieldName == ""){
        errorMessage(messageId, message);
        document.getElementById(idOfField).focus();
        flag++; 
    }
}

// To check that length of password should be greater than 8
function passLength(fieldName, message, inputFieldName) {
    var messageId = inputFieldName + "lbl";
    var idOfField = inputFieldName + "Field";
    if(fieldName.length < 8){
        errorMessage(messageId, message);
        document.getElementById(idOfField).focus();
        flag++;
    }
}

// To check that mail should be valid
function validateMail(fieldName, message, inputFieldName) {
    var messageId = inputFieldName + "lbl";
    var idOfField = inputFieldName + "Field";
    var n = fieldName.search("(?=.*@)(?=.*com)");
    if (n == -1) {
        errorMessage(messageId, message);
        document.getElementById(idOfField).focus();
        flag++;
    }
}

// To validate form
function validate(thisform) {
    var name = thisform.username.value;
    var pass = thisform.password.value;
    var cfpass = thisform.cfpassword.value;
    var email = thisform.email.value;
    var gender = thisform.gender.value;
    var country = thisform.country.value;

    // Validation for required fields should not be left empty
    emptyFields(name, u_name_empty, "username");
    emptyFields(pass, pass_empty, "password");
    emptyFields(cfpass, cf_pass_empty, "cfpassword");
    emptyFields(email, email_empty, "email");

    //Validation for username should be always unique
    if (!(localStorage.getItem("keys") === null)) {
        var keys1 = localStorage.getItem("keys");
        var arrKeys1 = JSON.parse(keys1);
        for (var i = 0; i < arrKeys1.length; i++) {
            if (name == arrKeys1[i]) {
                errorMessage("usernamelbl", u_name_duplicate);
                document.thisform.username.focus();
                flag++;
            }
        }
    }

    //Validation for valid email
    validateMail(email, email_invalid, "email");

    //Validation for length of password to be greater than 8
    passLength(pass, pass_length, "password");
    passLength(cfpass, pass_length, "cfpassword");

    //Validation to check if both passwords are same or not
    if (pass != cfpass) {
        errorMessage("cfpasswordlbl", pass_not_match);
        document.thisform.cfpassword.focus();
        flag++;
    }

    // Captcha Script
    why = "";
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

    // flag > 0 implies form has not passed all validations
    if (flag > 0) {
        return false;
    } else if (flag == 0) {
        storage(name, pass, email, gender, country);
        return true;
    }
}

// Validate captcha input against the generated number
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

// Hide signup form and display dashboard content after showing loader...
// Also storing data from on local storage
function storage(name, pass, email, gender, country) {
    document.getElementById("form").style.display = "none";
    loader();

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

// Creating table dynamically to show content on dashboard
// Getting user info from local storage to fill table
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

// Creating rows in table
function createRow(obj, name) {
    createContent(obj.name);
    createContent(obj.email);
    createContent(obj.gender);
    createContent(obj.country);
    createActions(obj, name);
}

// Setting content in rows 
function createContent(text) {
    var td = document.createElement("td");
    var content = document.createTextNode(text);
    td.appendChild(content);
    tr.appendChild(td);
}

// Creating rows for icons as well as checking for current signedin user to disable its delete icon
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

// Creating edit and delete icons and setting their various attributes 
function createIcons(clas, idd, func, oname) {
    icon = document.createElement("i");
    icon.setAttribute("class", clas);
    icon.setAttribute("id", idd);
    icon.setAttribute("onclick", func);
    icon.setAttribute("name", oname);
    ic.appendChild(icon);
}

// To reset form
function resetForm() {
    document.getElementById("form1").reset();
}

// Logout button handling and reloading page
function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("form").style.display = "block";
    resetForm();
    window.location.reload();
}

// Edit functionality handling by hiding dashboard and showing edit page 
function edit(oname) {
    // To hide Dashboard dynamically
    document.getElementById("dashboard").style.display = "none";

    // To change heading of form
    document.getElementById("signup").innerHTML = "Edit User Info";
    // To change username field attributes
    document.getElementById("usernameField").removeAttribute("required");
    document.getElementById("usernameField").disabled = true;
    document.getElementById("usernameField").setAttribute("value", "");
    // To change password field attributes
    document.getElementById("passwordField").removeAttribute("required");
    document.getElementById("passwordField").disabled = true;
    document.getElementById("passwordField").setAttribute("placeholder", "**********");
    // To hide confirm password field
    document.getElementById("cfpass").style.display = "none";
    // To change email field attributes
    document.getElementById("emailField").setAttribute("value", "");
    // To hide captcha code
    document.getElementById("captcha").style.display = "none";
    // To change button attributes
    document.getElementById("submit").setAttribute("value", "Save Info");
    document.getElementById("submit").setAttribute("onclick", "return(save(thisform))");

    // To show form dynamically
    document.getElementById("form").style.display = "block";

    var userData = localStorage.getItem(oname);
    var userobj = JSON.parse(userData);
    fillData(userobj);
}

// Getting data to be filled in rows of edit info form 
function fillData(userobj) {
    fillFields("username", userobj.name);
    fillFields("email", userobj.email);
    fillFields("country", userobj.country);
    document.getElementById(userobj.gender).checked = true;
}

// Filling respective user data in edit info form
function fillFields(fieldName, fieldValue) {
    var field = document.getElementsByName(fieldName)[0];
    field.value = fieldValue;
}

// To display delete modal window
function deleteModal(oname) {
    var button = document.getElementById("deleteText");
    button.setAttribute("name", oname);
    document.getElementById("myModal").style.display = "block";
}

//To close delete modal when cancel or cross button is clicked
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// To close delete modal when someone clicks outside of modal window
window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
}

// To delete particular user's local storage data
function deleteData(oname) {
    localStorage.removeItem(oname);
    deleteStorage(oname);
    document.getElementById("myModal").style.display = "none";
}

// Delete key from keys array, deleting dashboard content and rerendering it 
function deleteStorage(oname) {
    var keys1 = localStorage.getItem("keys");
    var arrKeys1 = JSON.parse(keys1);
    var index = arrKeys1.indexOf(oname);
    arrKeys1.splice(index, 1);
    var myJSON2 = JSON.stringify(arrKeys1);
    localStorage.setItem("keys", myJSON2);

    deleteDashboardContent();

    var loggedInUser = arrKeys1[arrKeys1.length - 1];
    retrieveData(arrKeys1, loggedInUser);
    dashboardTable.appendChild(struc);
}

// To validate edit info form 
function save(thisform) {
    var originalName = thisform.username.value;
    var updateEmail = thisform.email.value;
    var updateGender = thisform.gender.value;
    var updateCountry = thisform.country.value;
    var check = 0;

    //Validation for valid email
    var n = fieldName.search("(?=.*@)(?=.*com)");
    if (n == -1) {
        errorMessage("emaillbl", email_invalid);
        document.thisform.email.focus();
        check++;
    }

    if (check > 0) {
        return false;
    } else if (check == 0) {
        editInfo(originalName, updateEmail, updateGender, updateCountry);

        // To restore heading of signup form
        document.getElementById("signup").innerHTML = "Signup!!";
        // To restore username field attributes
        document.getElementById("usernameField").disabled = false;
        document.getElementById("usernameField").required;
        document.getElementById("usernameField").setAttribute("value", "");
        // To restore password field attributes
        document.getElementById("passwordField").disabled = false;
        document.getElementById("passwordField").required;
        document.getElementById("passwordField").setAttribute("placeholder", "Password");
        // To restore confirm password field
        document.getElementById("cfpass").style.display = "block";
        // To restore email field attributes
        document.getElementById("emailField").setAttribute("value", "");
        // To restore captcha code
        document.getElementById("captcha").style.display = "block";
        // To restore button attributes
        document.getElementById("submit").setAttribute("value", "Submit");
        document.getElementById("submit").setAttribute("onclick", "return(validate(thisform))");
        // To restore value of dropdown field
        document.getElementsByName("country")[0].value = "";
        // To restore value of radio buttons
        document.getElementById("male").checked = true;

        return true;
    }
}

// To edit user details on local storage, deleteing dashboard content and rerendering it 
function editInfo(originalName, updateEmail, updateGender, updateCountry) {
    var userData = localStorage.getItem(originalName);
    var userobj = JSON.parse(userData);

    userobj.email = updateEmail;
    userobj.gender = updateGender;
    userobj.country = updateCountry;

    var myJSON3 = JSON.stringify(userobj);
    localStorage.setItem(originalName, myJSON3);

    deleteDashboardContent();

    var keys1 = localStorage.getItem("keys");
    var arrKeys1 = JSON.parse(keys1);

    var loggedInUser = arrKeys1[arrKeys1.length - 1];
    retrieveData(arrKeys1, loggedInUser);
    dashboardTable.appendChild(struc);

    document.getElementById("form").style.display = "none";
    loader();
}

// For functioning of loader
function loader() {
    document.getElementById("heading").style.display = "none";
    document.getElementById("loader").style.display = "block";
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("heading").style.display = "block";
        document.getElementById("dashboard").style.display = "block";
    }, 1500);
}

// To delete dashboard content, actually deleting <tbody> tag and its contents from table
function deleteDashboardContent() {
    var parent = document.getElementById("dashboardTable");
    var child = document.getElementById("tbody");
    parent.removeChild(child);
}