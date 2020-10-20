const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser
} = require("./user_service");

const {
  hashSync,
  genSaltSync,
  compareSync
} = require("bcryptjs");

module.exports = {

  //REJESTRACJA UŻYTKOWNIKA
  //
  //
  createUser: (req, res) => {
    const body = req.body;

    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        return res.json({
          success: 0,
          data: "Konto o takim e-mailu już istnieje!"
        });
      }

      //przechwytywanie IP i czasu
      const ipaddress = req.ip;
      body.ip = ipaddress;
      body.time = new Date();

      //generowanie hashu
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);

      //zapisywanie danych w bazie
      create(body, (err, results) => {
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
    });
  },

  //LOGOWANIE UŻYTKOWNIKA
  //
  //
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Błędny email lub hasło."
        });
      }

      const result = compareSync(body.password, results.passwd);
      console.log(result);
      if (result) {
        results.passwd = undefined;

        //tworzy cookie
        req.session.IdUser = results.IdUser;
        res.redirect('/../../menu');
        console.log(req.session.IdUser);
        return console.log("success: 1, message: Zalogowano");
      } else {
        return res.json({
          success: 0,
          data: "Błędny email lub hasło."
        });
      }
    });
  },

  //WYSZUKANIE UŻYTKOWNIKA
  //
  //
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Nie znaleziono użytkownika."
        });
      }
      results.passwd = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  //WYPISZ WSZYSTKICH UŻYTKOWNIKÓW
  //
  //
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  //AKTUALIZACJA UŻYTKOWNIKA
  //
  //
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Zaaktualizowano dane."
      });
    });
  },

  //USUNIĘCIE UŻYTKOWNIKA
  //
  //
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Nie znaleziono użytkowinika."
        });
      }
      return res.json({
        success: 1,
        message: "Dane użytkownika usunięte pomyślnie."
      });
    });
  }
};