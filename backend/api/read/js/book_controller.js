const {
    getBookByBookId,
    getBookPDF,
    getBooks,
    getMyBooks,
    add,
    createComment,
    createReview,
    showReviews,
    showComments
} = require("./books_service");

module.exports = {

    getBookByBookId: (req, res) => {
        //console.log(req.params);
        const id = req.params.id;
        getBookByBookId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Nie znaleziono książki."
                });
            }
            //console.log(results);
            return res.json(results);
        });
    },

    getBookPDF: (req, res) => {
        const id = req.params.id;
        getBookPDF(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Nie znaleziono książki."
                });
            }
            //console.log(results.pdfName);
            return res.json(results.pdfName);
        });
    },

    getBooks: (req, res) => {
        console.log(req.params);
        getBooks((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            //console.log(results);
            return res.json(results);
        });
    },

    getMyBooks: (req, res) => {
        getMyBooks(req, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            //console.log(results);
            return res.json({
                userName: req.session.Name,
                userLName: req.session.LName,
                booksInfo: results
            });
        });
    },

    addBook: (req, res) => {
        const body = {
            'user': '',
            'book': ''
        };
        const id = req.params.id;
        const user = req.session.IdUser;
        body.user = user;
        body.book = id;
        add(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Błąd połączenia z bazą danych."
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    commentWrite: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const user = req.session.IdUser;
        body.user = user;
        body.id = id;
        createComment(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Błąd połączenia z bazą danych."
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    reviewWrite: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const user = req.session.IdUser;
        body.user = user;
        body.id = id;
        createReview(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Błąd połączenia z bazą danych."
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getComments: (req, res) => {
        const id = req.params.id;
        showComments(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(results);
        });
    },

    getReviews: (req, res) => {
        const id = req.params.id;
        showReviews(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(results);
        });
    },
};