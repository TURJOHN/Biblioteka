function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

 /*   window.onload() = function checkCookiesExist() {
        var myCookie = getCookie("login");

        if (myCookie == null) {
            console.log(document.cookie);
        }
        else {
            alert("jesteś zalogowany")
        }
    }*/

document.addEventListener('DOMContentLoaded', function () {
    var myCookie = getCookie("login");

    if (myCookie == null) {
        console.log(document.cookie);
    }
    else {
        document.getElementById('znika').style.display = "none";
        document.getElementById("pojawia").style.display = "inline";
        document.getElementById('wyloguj').style.display = "inline";
    };
}, false);