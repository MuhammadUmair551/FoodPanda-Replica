function signUp() {
    var getFullName = document.getElementById("fullName").value.trim();
    var getEmail = document.getElementById("email").value.trim();
    var getPassword = document.getElementById("password").value.trim();
    var role = document.getElementById("adminRadio").checked ? "Admin" : "User";

    if (getFullName === "" || getEmail === "" || getPassword === "") {
        alert("Please fill in all fields");
        return;
    }

    var allSignupUsers = JSON.parse(localStorage.getItem("signupUsers")) || [];

    var signupUser = {
        fullName: getFullName,
        email: getEmail,
        password: getPassword,
        role: role
    };

    allSignupUsers.push(signupUser);
    localStorage.setItem("signupUsers", JSON.stringify(allSignupUsers));

    alert("Account created successfully!");
    window.location.href = "./login.html";
}


function login() {
    var getLEmail = document.getElementById("loginEmail").value.trim();
    var getLPassword = document.getElementById("loginPassword").value.trim();
    var role = document.getElementById("adminRadio").checked ? "Admin" : "User";

    var allSignupUsers = JSON.parse(localStorage.getItem("signupUsers")) || [];

    var filterUser = allSignupUsers.find(function (user) {
        return user.email === getLEmail && user.password === getLPassword && user.role === role;
    });

    if (!filterUser) {
        alert("Invalid credentials or role");
        return;
    }

    localStorage.setItem("loggedInUser", filterUser.fullName);
    localStorage.setItem("userRole", filterUser.role); 

    alert("Login successful!");

    if (filterUser.role === "Admin") {
        window.location.href = "./dashboard.html";
    } else {
        window.location.href = "./user.html"; // 
    }
}


