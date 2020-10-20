const pool = require("../../config/database");

module.exports = {

  //DODAJ DANE UŻYTKOWNIKA DO BAZY
  //
  //
  create: (data, callBack) => {
    pool.query(
      `insert into uzytkownicy(Name, LName, Email, passwd, Time, IP) 
                values(?,?,?,?,?,?)`,
      [
        data.name,
        data.lname,
        data.email,
        data.password,
        data.time,
        data.ip
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //POBIERZ DANE UŻYTKOWNIKA DO LOGOWANIA Z BAZY
  //
  //
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      'SELECT * FROM uzytkownicy WHERE `Email` = ?', [email], (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  //POBIERZ DANE UŻYTKOWNIKA Z BAZY
  //
  //
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select IdUser,Name,LName,Email,Time,IP from uzytkownicy where IdUser = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  //POBIERZ WSZYSTKICH UŻYTKOWNIKÓW
  //
  //
  getUsers: callBack => {
    pool.query(
      `select IdUser,Name,LName,EMail,Time,IP from uzytkownicy`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //AKTUALIZUJ DANE UŻYTKOWNIKA
  //
  //
  updateUser: (data, callBack) => {
    pool.query(
      `update uzytkownicy set Name=?, LName=?, Email=?, passwd=?, Time=?, IP=? where IdUser = ?`,
      [
        data.name,
        data.lname,
        data.email,
        data.password,
        data.time,
        data.ip,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  //USUŃ DANE UŻYTKOWNIKA Z BAZY
  //
  //
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from uzytkownicy where IdUser = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};