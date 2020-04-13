// Get all form fields

const uname = document.getElementById("uname");
const email = document.getElementById("email");
const lname = document.getElementById("lname");
const fname = document.getElementById("fname");


// Nathan
window.addEventListener("load", function () {

    uname.setAttribute("value",this.localStorage.getItem("uname"));
    email.setAttribute("value",this.localStorage.getItem("email"));
    lname.setAttribute("value",this.localStorage.getItem("lname"));
    fname.setAttribute("value",this.localStorage.getItem("fname"));

    document.getElementById("save-btn").onclick = function (event) {
        console.log("save");
        console.log(uname.value)
        if (!uname.value == null) {
            localStorage.setItem("uname", uname.value);
        }
        if (!email.value == null) {
            localStorage.setItem("uname", email.value);
        }
        if (!lname.value == null) {
            localStorage.setItem("uname", lname.value);
        }
        if (!fname.value == null) {
            localStorage.setItem("uname", fname.value);
        }
    };
});

