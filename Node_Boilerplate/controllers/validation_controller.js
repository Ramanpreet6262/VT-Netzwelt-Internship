let messages = require("../messages/messages");
let bcrypt = require("bcryptjs");
let db = require("../util/database");
let jwt = require("jsonwebtoken");

exports.getCheck = (req, res, next) => {
  if (req.session.err) {
    let err = req.session.err;
    let array = err.map(errs => {
      return errs.msg;
    });
    res.json(array);
  } else {
    res.json({ message: messages.welcomeMessage });
  }
  req.session.err = null;
};

exports.postCheck = async (req, res, next) => {
  req.check("email", messages.invalidEmail).isEmail();
  req.check("password", messages.passNotMatch).equals(req.body.confirmPassword);
  req.check("password", messages.passLength).isLength({ min: 8 });
  req.check("confirmPassword", messages.passLength).isLength({ min: 8 });

  let err = req.validationErrors();
  if (err) {
    req.session.err = err;
    res.redirect("/validate");
  } else {
    let sql = "select * from user where ?";
    let query = { email: req.body.email };
    let user = await db.query(sql, query, (err, resl) => {
      if (resl.length !== 0) {
        res.json("Email Already exist");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            let user = {
              name: req.body.name,
              email: req.body.email,
              password: hash
            };
            let sql = "Insert into user set ?";
            let query = db.query(sql, user, (err, result) => {
              if (err) throw err;
              req.session.err = null;
              res.json({ message: messages.formSubmitted });
            });
          });
        });
      }
    });
  }
};

exports.postLogin = async (req, res, next) => {
  req.check("email", messages.invalidEmail).isEmail();
  req.check("password", messages.passLength).isLength({ min: 8 });
  let err = req.validationErrors();

  if (err) {
    let array = err.map(errs => {
      return errs.msg;
    });
    res.status(400).json(err);
  } else {
    let sql = "select password from user where ?";
    let query = { email: req.body.email };
    let user = await db.query(sql, query, (err, resl) => {
      if (resl.length === 0) {
        res.json("Email Does not exists");
      } else {
        bcrypt.compare(req.body.password, resl[0].password, (err, match) => {
          if (!match) {
            res.json("Email or password do not match");
          } else {
            const TOKEN_SECRET =
              process.env.TOKEN_SECRET || "hdioehfduewuifbjrfugr";
            const token = jwt.sign({ email: req.body.email }, TOKEN_SECRET);
            res.header("auth_token", token).json(token);
          }
        });
      }
    });
  }
};

exports.getData = async (req, res, next) => {
    let sql = "select email from user";
    let user = await db.query(sql, (err, resl) => {
        res.json(resl);
    });
};