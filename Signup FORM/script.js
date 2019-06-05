// Constants for storing different messages
const u_name_empty = "Please enter username";
const pass_empty = "Please enter password";
const cf_pass_empty = "Please enter password again";
const email_empty = "Please enter email address";
const checkbox_empty = "Please select at least one skill";
const email_invalid = "Please enter a valid e-mail address.";
const pass_length = "Please enter at least 8 characters in password";
const pass_not_match = "Password did not match: Please try again...";
const captcha_empty = "Please Enter CAPTCHA Code";
const captcha_not_match = "The CAPTCHA Code Does Not Match";

function validate(thisform) {
    var name = thisform.username.value;
    var pass = thisform.password.value;
    var cfpass = thisform.cfpassword.value;
    var email = thisform.email.value;

    // Validation for required fields should not be left empty
    if (name == "" || name == null) {
        window.alert(u_name_empty);
        document.thisform.username.focus();
        return false;
    }

    if (pass == "" || pass == null) {
        window.alert(pass_empty);
        document.thisform.password.focus();
        return false;
    }

    if (cfpass == "" || cfpass == null) {
        window.alert(cf_pass_empty);
        document.thisform.cfpassword.focus();
        return false;
    }

    if (email == "" || email == null) {
        window.alert(email_empty);
        document.thisform.email.focus();
        return false;
    }

    if (!thisform.s1.checked && !thisform.s2.checked && !thisform.s3.checked && !thisform.s4.checked && !thisform.s5.checked) {
        window.alert(checkbox_empty);
        return false;
    }

    //Validation for valid email
    if (email.indexOf("@", 0) < 0) {
        window.alert(email_invalid);
        document.thisform.email.focus();
        return false;
    }

    if (email.indexOf(".", 0) < 0) {
        window.alert(email_invalid);
        document.thisform.email.focus();
        return false;
    }

    //Validation for length of password to be greater than 8
    if (pass.length < 8) {
        window.alert(pass_length);
        document.thisform.password.focus();
        return false;
    }

    if (cfpass.length < 8) {
        window.alert(pass_length);
        document.thisform.cfpassword.focus();
        return false;
    }

    //Validation to check if both passwords are same or not
    if (pass != cfpass) {
        window.alert(pass_not_match);
        document.thisform.cfpassword.focus();
        return false;
    }

    // Captcha Script
    var why = "";

    if (thisform.CaptchaInput.value == "") {
        why += captcha_empty;
    }
    if (thisform.CaptchaInput.value != "") {
        if (ValidCaptcha(thisform.CaptchaInput.value) == false) {
            why += captcha_not_match;
        }
    }
    if (why != "") {
        alert(why);
        return false;
    }
}

var a = Math.ceil(Math.random() * 9) + '';
var b = Math.ceil(Math.random() * 9) + '';
var c = Math.ceil(Math.random() * 9) + '';
var d = Math.ceil(Math.random() * 9) + '';
var e = Math.ceil(Math.random() * 9) + '';

var code = a + b + c + d + e;
document.getElementById("txtCaptcha").value = code;
document.getElementById("CaptchaDiv").innerHTML = code;

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