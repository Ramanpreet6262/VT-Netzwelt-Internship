

function userInfo (name, pass, cfpass, email, gender, country) {
    
    this.name = name;
    this.pass = pass;
    this.cfpass = cfpass;
    this.email = email;
    this.gender = gender;
    this.country = country;
}



function validate(thisform) {
    var name = thisform.username.value;
    var pass = thisform.password.value;
    var cfpass = thisform.cfpassword.value;
    var email = thisform.email.value;
    var gender = thisform.gender.value;
    var country = thisform.country.value;

    var banda = new userInfo(name, pass, cfpass, email, gender, country);

}