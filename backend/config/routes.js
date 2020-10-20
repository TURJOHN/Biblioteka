const router = require('express').Router();

const {
    getBooks,
    getBookByBookId,
    getBookPDF,
    addBook,
    getMyBooks,
    commentWrite,
    reviewWrite,
    getComments,
    getReviews
} = require("../api/read/js/book_controller.js");

const redirectToLogin = (req, res, next) => {
    if (!req.session.IdUser) {
        res.redirect('/');
    } else {
        next();
    }
};

const redirectToHome = (req, res, next) => {
    if (req.session.IdUser) {
        res.redirect('/menu');
    } else {
        next();
    }
};

//sprawdzanie czy zalogowany cze nie i przekierowanie do wylogowania
router.get('/', redirectToHome, (req, res) => {
    res.render('index');
});
router.get('/menu', redirectToLogin, (req, res) => {
    res.render('menu');
});
router.post('/logout', redirectToLogin, (req, res) => {
    res.redirect('/api/users/logout');
});

//zwraca ksiązki z biblioteczki użytkownika
router.post('/mybooks', redirectToLogin, getMyBooks);

//zwraca wszystkie ksiązki w bazie
router.post('/booklist', redirectToLogin, getBooks);

//zwraca dane o pojedynczej ksiazce po jej id
router.post("/booklist/:id", redirectToLogin, getBookByBookId);

//dodaje ksiązke do biblioteczki użytkownika po id książki
router.post('/booklist/:id/add', redirectToLogin, addBook);

//zwraca nazwe pdfa z książką
router.post('/booklist/:id/read', redirectToLogin, getBookPDF);

//wyslanie komentarza do bazy danych (kay komentarza = 'content')
router.post('/booklist/:id/comment', redirectToLogin, commentWrite);

//wyslanie komentarza do bazy danych (kay komentarza = 'content')
router.post('/booklist/:id/review', redirectToLogin, reviewWrite);

//zwraca komentarze/recenzje zwiazane z książką po id
router.post('/booklist/:id/comments', redirectToLogin, getComments);
router.post('/booklist/:id/reviews', redirectToLogin, getReviews);

module.exports = router;