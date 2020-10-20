const router = require("express").Router();

const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user_controller");

const redirectToLogin = (req, res, next) => {
  if(!req.session.IdUser) {
      res.redirect('../../');
  } else {
      next();
  }
};

const redirectToHome = (req, res, next) => {
  if(req.session.IdUser) {
      res.redirect('../../menu');
  } else {
      next();
  }
};

router.get("/",redirectToLogin, getUsers);
router.post("/", redirectToHome, createUser);
//router.get("/:id", redirectToLogin, getUserByUserId);
router.post("/login", redirectToHome, login);
//router.patch("/", checkToken, updateUsers);
//router.delete("/", checkToken, deleteUser);
router.get("/logout", (req, res) => {
  console.log("Usuwanie ciasteczka");
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/login");
    }
    res.clearCookie('libr');
    res.redirect('../../');
  });
});

module.exports = router;