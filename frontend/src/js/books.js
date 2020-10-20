import axios from "axios";
//import qs from 'qs';
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

var array;

(function () {
    axios.post('http://localhost:3000/booklist')
    .then(res=>{
        array = res.data;
        var list = document.getElementById('list');
        array.forEach(function (array) {
            /*var element = document.createElement("div")
            element.innerText = array.BTitle;
            list.appendChild(element);*/
            createElement(array, list);
        })
    })
    .catch(err => {
        alert("Nie masz dostępu do biblioteki bez zalogowania!")
        if(err == "TypeError: r.forEach is not a function")
            Cookies.remove("login");
        window.location.replace("/login.html");
         })

})();

function createElement(element, parent) {
    var wrapper = document.createElement("div");
    wrapper.className = "book";
    var link = document.createElement("a");
    link.setAttribute("href", `/book.html?id=${element.IdBook}`);
    link.innerHTML = `<img src="img/covers/${element.IdBook}.jpg"></img>`
    wrapper.appendChild(link);
    parent.appendChild(wrapper);
}