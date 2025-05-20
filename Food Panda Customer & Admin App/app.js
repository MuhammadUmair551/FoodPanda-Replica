function signUp() {
    var getFullName = document.getElementById("fullName");
    var getEmail = document.getElementById("email");
    var getPassword = document.getElementById("password");

    if (getFullName.value == "" || getEmail.value == "" || getPassword.value == "") {
        alert("Please fill in all fields")
    } else {
        var allSignupUsers = JSON.parse(localStorage.getItem("signupUsers")) || [];

        var signupUsers = {
            fullName: getFullName.value,
            email: getEmail.value,
            password: getPassword.value
        }
        allSignupUsers.push(signupUsers);

        localStorage.setItem("signupUsers", JSON.stringify(allSignupUsers));

        getFullName.value = "";
        getEmail.value = "";
        getPassword.value = "";
    }

}

function login() {
    var getLEmail = document.getElementById("loginEmail");
    var getLPassword = document.getElementById("loginPassword");

    allSignupUsers = JSON.parse(localStorage.getItem("signupUsers")) || [];

    var filterUser = allSignupUsers.filter(function (user) {
        return user.email == getLEmail.value && user.password == getLPassword.value;
    })

    if (filterUser.length == 0) {
        alert("Invalid email or password");
    } else {
        localStorage.setItem("loggedInUser", filterUser[0].fullName);
        alert("Login successful");
        window.location.href = "./dashboard.html";
    }
}


