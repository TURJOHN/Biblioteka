import axios from "axios";
//import qs from 'qs';

axios.defaults.withCredentials = true;

var array;
var check = [];

(function() {
  axios
    .post("http://localhost:3000/mybooks")
    .then(res => {console.log(res);
        array = res.data.booksInfo;
        var list = document.getElementById("library");
        array.forEach(function(array) {
        createElement(array, list);
      });
    })
    .catch(err => {
        /*alert("Sesja wygasła!");
        if (err == "TypeError: r.forEach is not a function")
            Cookies.remove("login");
        window.location.replace("/login.html");*/
        console.log(err);
    });
})();

function createElement(element, parent) {
  var wrapper = document.createElement("div");
  wrapper.className = "book";
  var link = document.createElement("a");
  link.setAttribute("href", `/book.html?id=${element.IdBook}`);
  link.innerHTML = `<img src="img/covers/${element.IdBook}.jpg"></img>`;
  wrapper.appendChild(link);
  parent.appendChild(wrapper);
}
