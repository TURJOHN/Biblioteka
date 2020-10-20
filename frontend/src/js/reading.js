import axios from "axios";
axios.defaults.withCredentials = true;
var link;
(function () {
    let id = query();
    axios.post(`http://localhost:3000/booklist/${id}/read`)
        .then(res => {
            link = res.data;
            if (link == undefined) {
                alert("ERROR! Nie ma takiej książki, zostaniesz przeniesiony na stronę główną!");
                window.location.replace("index.html");
            }
            console.log(id, link);
            var name = document.getElementById('readBook');
            createRead(link, name);
        })
        .catch(err => {
            console.log(err);
        });
})();

function query() {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    return data.id;
};
function createRead(link, parent) {
    var content = document.getElementById("readBook");
    content.innerHTML = `
    <iframe class="reading" src="${link}"></iframe>
    `;
    parent.appendChild(content);
};
//<object classdata="${link}" type="application/pdf"></object>