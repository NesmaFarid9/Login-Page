var nameInput = document.getElementById("nameInput");
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var successMsg = document.getElementById("successMsg");
var errorMsg = document.getElementById("errorMsg");
var errorEmailMsg = document.getElementById("errorEmailMsg");
var loginErrorMsg = document.getElementById("loginErrorMsg");
var loginBtn = document.getElementById("loginBtn");
var nameDisplayed = document.getElementById("nameDisplayed");
var logOutBtn = document.getElementById("logOutBtn");
var errorNameMsg = document.getElementById("errorNameMsg");
var errorEmailReg = document.getElementById("errorEmailReg");
var errorPassMsg = document.getElementById("errorPassMsg");



var personsList = JSON.parse(localStorage.getItem("personsList")) || [];


function addUser(user){
    personsList.push(user);
    localStorage.setItem("personsList", JSON.stringify(personsList));
};
function checkEmail(){ 
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var nameRegex = /^[a-zA-Z\s]+$/;;
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    
    if(emailInput.value.trim() === '' || nameInput.value.trim() === '' || passwordInput.value.trim() === ''){
        successMsg.classList.add('d-none');
        errorMsg.classList.remove('d-none');
        errorEmailMsg.classList.add('d-none');
        errorNameMsg.classList.add('d-none');
        errorEmailReg.classList.add('d-none');
        errorPassMsg.classList.add('d-none');      
        return false;
    }
    else if(!nameRegex.test(nameInput.value)){
        successMsg.classList.add('d-none');
        errorMsg.classList.add('d-none');
        errorEmailMsg.classList.add('d-none');
        errorNameMsg.classList.remove('d-none');
        errorEmailReg.classList.add('d-none');
        errorPassMsg.classList.add('d-none');      
        return false;
    }
    else if(!emailRegex.test(emailInput.value)){
        successMsg.classList.add('d-none');
        errorMsg.classList.add('d-none');
        errorEmailMsg.classList.add('d-none');
        errorNameMsg.classList.add('d-none');
        errorEmailReg.classList.remove('d-none');
        errorPassMsg.classList.add('d-none');
        return false;
    }
    else if(!passwordRegex.test(passwordInput.value.trim())){
        successMsg.classList.add('d-none');
        errorMsg.classList.add('d-none');
        errorEmailMsg.classList.add('d-none');
        errorNameMsg.classList.add('d-none');
        errorEmailReg.classList.add('d-none');
        errorPassMsg.classList.remove('d-none');
        return false;
    }
    for(var i = 0; i < personsList.length; i++){
        if(personsList[i].email === emailInput.value){
            errorEmailMsg.classList.remove('d-none');
            successMsg.classList.add('d-none');
            errorMsg.classList.add('d-none');
            errorNameMsg.classList.add('d-none');
            errorEmailReg.classList.add('d-none');
            errorPassMsg.classList.add('d-none');
            return false;
        }
    }  
     var newUser = {
        name: nameInput.value, 
        email: emailInput.value,
        password: passwordInput.value
    };
    addUser(newUser);
    
    successMsg.classList.remove('d-none');
    errorMsg.classList.add('d-none');
    errorEmailMsg.classList.add('d-none'); 
    errorNameMsg.classList.add('d-none');
    errorEmailReg.classList.add('d-none');
    errorPassMsg.classList.add('d-none');
};
// start login page
function validSignIn(){
    if(emailInput.value == '' || passwordInput.value == ''){
        loginErrorMsg.classList.add("d-none");
        errorMsg.classList.remove("d-none");
        return;
    }
    for(var i = 0; i < personsList.length; i++){
        if(personsList[i].email === emailInput.value && personsList[i].password === passwordInput.value){
            loginErrorMsg.classList.add("d-none");
            errorMsg.classList.add("d-none");  
            localStorage.setItem("loginUser", JSON.stringify(personsList[i]));       
            window.location.href = './HTML/home.html';    
            return;
        }
    }
    loginErrorMsg.classList.remove("d-none");
    errorMsg.classList.add("d-none");
};
window.addEventListener("DOMContentLoaded", function () {
    var user = JSON.parse(localStorage.getItem("loginUser"));
    if (user) {
        nameDisplayed.innerHTML = `Welcome <span>${user.name}</span>`;
    } 
});
// end login page
// start logout btn
function logOut(){
    window.location.href = '../index.html';
}
// end logout btn

