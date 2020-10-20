import axios from "axios";
import qs from 'qs';
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

var buttonLo = document.getElementById('wyloguj')
buttonLo.onclick = function(){
    logout();
}

function logout() {
    axios({
        method: "get",
        url: "http://localhost:3000/api/users/logout"
    })
        .then(res => {
            console.log(res);
            Cookies.remove('login');
            alert("Udane wylogowanie!");
            window.location.replace("/index.html");
        })
        .catch(err => {
            Cookies.remove('login');
            alert("Błąd wylogowywania!")
            console.log(err);
        });
}
