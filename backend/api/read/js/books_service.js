const pool = require("../../../config/database");

module.exports = {

    getBookByBookId: (id, callBack) => {
        pool.query(
            "select IdBook, BTitle, BPublish, Name, LName, ADescr, CTitle, CDescr from `ksiazki` join `autorzy` on ksiazki.IdAuthor = autorzy.IdAuthor join `kategorie` on ksiazki.IdCat = kategorie.IdCat where IdBook = ?",
            //"select * from `ksiazki` join `autorzy` on ksiazki.IdAuthor = autorzy.IdAuthor where IdBook = ?",
            //`select * from ksiazki where IdBook = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getBookPDF: (id, callBack) => {
        pool.query(
            "select pdfName from `ksiazki` where IdBook = ?",
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getBooks: callBack => {
        pool.query(
            `select * from ksiazki`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getMyBooks: (req, callBack) => {
        //console.log(req.session);
        const idUser = req.session.IdUser;
        pool.query(
            //"select * from `biblioteka uzytkownika` where IdUser = ?",
            "select ksiazki.IdBook, BTitle, BPublish, Name, LName, ADescr, CTitle, CDescr, ReadCheck, WishCheck from `biblioteka uzytkownika` join `ksiazki` on `biblioteka uzytkownika`.IdBook = ksiazki.IdBook join `autorzy` on ksiazki.IdAuthor = autorzy.IdAuthor join `kategorie` on ksiazki.IdCat = kategorie.IdCat where IdUser = ?",
            [idUser],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    add: (data, callBack) => {
        pool.query(
            "insert into `biblioteka uzytkownika`(IdUser, IdBook) values(?,?)",
            [
                data.user,
                data.book,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createComment: (data, callBack) => {
        pool.query(
            "insert into `komentarze` (IdUser, IdBook, Content) values(?,?,?)",
            [
                data.user,
                data.id,
                data.content,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createReview: (data, callBack) => {
        pool.query(
            "insert into `recenzje` (IdUser, IdBook, RContent, RRate) values(?,?,?,?)",
            [
                data.user,
                data.id,
                data.rcontent,
                data.rate
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    showReviews: (id, callBack) => {
        pool.query(
            "select uzytkownicy.IdUser, Name, LName, Email, BTitle, RContent, RRate from `recenzje` join `uzytkownicy` on recenzje.IdUser = uzytkownicy.IdUser join `ksiazki` on ksiazki.IdBook = recenzje.IdBook where recenzje.IdBook = ?",
            [id],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    showComments: (id, callBack) => {
        pool.query(
            "select uzytkownicy.IdUser, Name, LName, Email, BTitle, Content from `komentarze` join `uzytkownicy` on komentarze.IdUser = uzytkownicy.IdUser join `ksiazki` on ksiazki.IdBook = komentarze.IdBook where komentarze.IdBook = ?",
            [id],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};