import axios from "axios";
import qs from 'qs';
import raterJs from 'rater-js';

axios.defaults.withCredentials = true;

var array, arrayC, arrayR;

var myRating = raterJs({
    element: document.querySelector("#rater"),
    max: 10,
    size: 32,
    rateCallback: function rateCallback(rating, done) {
        this.setRating(rating);
        done();
    }
});

(function () {
    let id = query();
    axios.post(`http://localhost:3000/booklist/${id}`)
            .then(res => {
                array = res.data[0];
                if(array == undefined){
                    alert("ERROR! Nie ma takiej książki, zostaniesz przeniesiony na stronę główną!");
                    window.location.replace("index.html");
                }
                console.log(id, array);
                var name = document.getElementById('bookSegment');
                createElement(array, name);
                myRating.element;
                let buttonAdd = document.getElementById("add");
                buttonAdd.onclick = function() {
                  console.log("wysłane!");
                  addBook();
                };
            })
            .catch(err => {
                console.log(err);
            });
    axios.post(`http://localhost:3000/booklist/${id}/comments`)
        .then(res => {
            arrayC = res.data;
            console.log(arrayC);
            var name = document.getElementById('comments');
            arrayC.forEach(function (arrayC) {
                createComments(arrayC, name);
            })
        })
        .catch(err => {
            console.log(err);
        });
    axios.post(`http://localhost:3000/booklist/${id}/reviews`)
        .then(res => {
            arrayR = res.data;
            console.log(arrayR);
            var name = document.getElementById('reviews');
            arrayR.forEach(function (arrayR) {
                createReviews(arrayR, name);
            })
        })
        .catch(err => {
            console.log(err);
        });
})();

function addBook() {
  let id = query();
  var review = document.getElementById("review").value;
  axios({
    method: "post",
    url: `http://localhost:3000/booklist/${id}/add`
  })
    .then(res => {
      alert("Książka dodana do osobistej biblioteki")
    })
    .catch(err => console.log(err));
}

function query(){
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    console.log(data.id);
    return data.id;
};
function createElement(element, parent) {
    var ref = document.querySelector('from__button');
    var text = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("src", `/img/covers/${element.IdBook}.jpg`);
    text.innerHTML = `<b>Tytuł:</b> ${element.BTitle} <br>
    <b>Autor:</b> <abbr title="${element.ADescr}">${element.Name} ${element.LName}</abbr> <br>
    <b>Gatunek:</b> <abbr title="${element.CDescr}">${element.CTitle}</abbr><br>
    <a href="/read.html?id=${element.IdBook}"><input class="form__button bb green" type="button" value="Czytaj" id="read"></a><br>
    <input class="form__button bb yellow" type="button" value="Dodaj do biblioteki" id="add">`;
    parent.appendChild(img);
    parent.appendChild(text);
};
function createComments(array, parent){
    var content = document.createElement("div");
    content.setAttribute("class", "underline");
    content.innerHTML = `<b>${array.Name}:</b> <br>
    ${array.Content}`;
    parent.appendChild(content)
};
function createReviews(array, parent) {
    var rating;
    var content = document.createElement("div");
    if (array.RRate == null) rating = "brak";
    else rating = array.RRate;
    content.setAttribute("class","underline");
    content.innerHTML = `<b>${array.Name}:</b>Ocena:${rating}<br>
    ${array.RContent}`;
    parent.appendChild(content);
};
window.addEventListener("load", function () {
    function sendComment() {
        let id = query();
        var comment = document.getElementById("comment").value;
        console.log(comment);
        if(empty(comment)==1)
        {axios({
            method: "post",
            url: `http://localhost:3000/booklist/${id}/comment`,
            data: qs.stringify({
                content: comment,
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        })
            .then(res => {
                console.log(res);
                location.reload();
            })
            .catch(err => console.log(err));}
        else alert("Nie możesz wysyłać pustych recenzji i komentarzy!");
    }

    /*var buttonC = document.getElementById("commentSend");
    buttonC.onclick = function () {
        console.log('wysłane!');
        sendComment();
    };*/

    function sendReview() {
        let id = query();
        var rate = myRating.getRating();
        var review = document.getElementById("review").value;
        if (empty(review)==1)
        {axios({
            method: "post",
            url: `http://localhost:3000/booklist/${id}/review`,
            data: qs.stringify({
                rcontent: review,
                rate: rate
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        })
            .then(res => {
                console.log(res);
                location.reload();
            })
            .catch(err => console.log(err));}
        else alert("Nie możesz wysyłać pustych recenzji i komentarzy!");
    }
    /*var buttonR = document.getElementById("reviewSend");
    buttonR.onclick = function () {
        console.log('wysłane!');
        sendReview();
    };*/
    var review = document.getElementById("review");
    review.onpaste = function (e) {
        var max = review.getAttribute("maxlength");
        e.clipboardData.getData('text/plain').slice(0, max);
    };
    function empty(x) {
        if (x.trim() == "") {
            return 0;
        }
        else return 1;
    }
    let Cform = document.getElementById("commentForm");
    let Rform = document.getElementById("reviewForm");

    Cform.addEventListener("submit", function (event) {
        event.preventDefault();
        sendComment();
    });
    Rform.addEventListener("submit", function (event) {
        event.preventDefault();
        sendReview();
    });
});
