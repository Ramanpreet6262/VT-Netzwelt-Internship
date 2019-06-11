// Constants for storing different messages
const u_name_empty = "Please enter username";
const pass_empty = "Please enter password";
const cf_pass_empty = "Please enter password again";
const email_empty = "Please enter email address";
const email_invalid = "Please enter a valid e-mail address.";
const pass_length = "Please enter at least 8 characters in password";
const pass_not_match = "Password did not match: Please try again...";
const captcha_empty = "Please Enter CAPTCHA Code";
const captcha_not_match = "The CAPTCHA Code Does Not Match";

// Variables for generating Captcha code
var a = Math.ceil(Math.random() * 9) + '';
var b = Math.ceil(Math.random() * 9) + '';
var c = Math.ceil(Math.random() * 9) + '';
var d = Math.ceil(Math.random() * 9) + '';
var e = Math.ceil(Math.random() * 9) + '';

//Captcha code generated
var code = a + b + c + d + e;
document.getElementById("txtCaptcha").value = code;
document.getElementById("CaptchaDiv").innerHTML = code;

var why = "";

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

    if(flag > 0) {
        return false;
    }
    else if(flag == 0) {
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
function errorMessage(id , message) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).innerHTML = message;
    setTimeout(function() {
        document.getElementById(id).style.display = "none";
    },5000);
}

function storage(name, pass, email, gender, country) {
    document.getElementById("form").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    //Storing data
    var data = {name : name, password : pass, email : email, gender : gender, country : country};
    myJSON = JSON.stringify(data);
    localStorage.setItem(name, myJSON);
    
    // // Retrieving data
    // text = localStorage.getItem(name);
    // obj = JSON.parse(text);
    // document.getElementById("demo").innerHTML = obj.name + " " + obj.email + " " + obj.gender;
}

function resetForm(){
    document.getElementById("form1").reset();
}

function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("form").style.display = "block";
    resetForm();
}
