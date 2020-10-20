import axios from "axios";
import qs from 'qs';
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
/*
export function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("wartości:", email, password);

     axios({
       method: "post",
       url: "http://localhost:3000/api/users/login",
       data: qs.stringify({
         email: email,
         password: password
       }),
       headers: {
         "content-type": "application/x-www-form-urlencoded;charset=utf-8"
       }
     })
       .then(res => {
         console.log(res);
         Cookies.set('login','true');
         window.location.replace("/index.html");
       })
       .catch(err =>{
        console.log(err);
      });
}

var buttonL = document.getElementById("login");
buttonL.onclick = function() {
  login();
};*/

window.addEventListener("load", function () {
  function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    axios({
      method: "post",
      url: "http://localhost:3000/api/users/login",
      data: qs.stringify({
        email: email,
        password: password
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(res => {
        if(res.data.success == 0 ) alert("Nie poprawny email lub hasło!");
        else{
        alert("Zosałeś zalogowany! Zostaniesz przeniesiony na stronę główną.")
        Cookies.set('login', 'true');
        window.location.replace("index.html");}
      })
      .catch(err => {
      });
  }

  let form = document.getElementById("myForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    login();
  });
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}