import axios from "axios";
import qs from 'qs';
//import Cookies from "js-cookie";

//axios.defaults.withCredentials = true;
/*function registration() {
    var ip;
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var lname = document.getElementById("lname").value;
    var password = document.getElementById("password").value;
    alert(password);
    getip(ip);
    alert("ddd",ip);
    console.log("wartości:", email, password);

    axios({
        method: "post",
        url: "http://localhost:3000/api/users",
        data: qs.stringify({
            name: name,
            lname: lname,
            email: email,
            password: password,
            ip: ip
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    })
        .then(res => {
            console.log(res);
            window.location.replace("/login.html")
        })
        .catch(err => console.log(err));
}
var buttonR = document.getElementById("registration");
buttonR.onclick = function () {
    console.log('cos dziala');
    registration();
};*/

window.addEventListener("load", function () {
    function registration() {
        const ip = '0.0.0.0'
        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;
        var lname = document.getElementById("lname").value;
        var password = document.getElementById("password").value;
        alert("ok");
        console.log("wartości:", email, password);
        axios({
            method: "post",
            url: "http://localhost:3000/api/users",
            data: qs.stringify({
                name: name,
                lname: lname,
                email: email,
                password: password,
                ip: ip
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        })
            .then(res => {
                setTimeout(function () {
                    if (res.data.success == 0) { alert("Konto o takim e-mailu już istnieje!"); }
                    else {alert("Udana rejstracja! Możesz się zalogować!"); window.location.replace("/login.html");} }, 1000);
            })
            .catch(err => console.log(err));
    }

    let form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        registration();
    });
});