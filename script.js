var form = document.querySelector("form");
var login = document.querySelector("#login");
var password = document.querySelector("#password");
var user = {};
var submit = document.querySelector("#submit");
var counter = 0;
var warning;
var loginRegExp = /^\w{2,15}$/i;
var passRegExp = /^(?=.*[#])(?=.*[$])[a-z0-9#$]{6,15}$/i;
var canUserPass = true;

function createWarning() {
    warning = document.createElement("div");
    warning.classList.add("is-error");
    warning.innerHTML = "Error, please enter correct login and password";
}

function displayWarning() {
    if (counter === 0) {
        createWarning();
        form.appendChild(warning);
        counter++;
    } else {
        return;
    }
}

function validation() {
    if (login.value.search(loginRegExp) || password.value.search(passRegExp)) {
        displayWarning();
        canUserPass = false;
    } else {
        canUserPass = true;
    }
}

function writeUserData() {
    if (typeof Storage !== "undefined") {
        user.login = login.value;
        user.password = password.value;
        localStorage.setItem("user", JSON.stringify(user));
        form.innerHTML = "Wow, perfect! Now you can check your storage";
    } else {
        document.cookie = "user=" + JSON.stringify(user);
        form.innerHTML = "Wow, perfect! Now you can check your cookie";
    }
}
function setUser() {
    if (canUserPass) {
        writeUserData();
    }
}

function submitForm(event) {
    event.preventDefault();
    validation();
    setUser();
}

submit.addEventListener("click", submitForm);
