const messages = require("../messages/messages");
const bcrypt = require("bcryptjs");
const db = require("../util/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.API_KEY
  }
}));

exports.getCheck = (req, res, next) => {
  if (req.session.err) {
    let err = req.session.err;
    let array = err.map(errs => {
      return errs.msg;
    });
    res.json(array);
  } else {
    // implemented internationalisation
    res.setLocale(req.cookies.i18n);
    res.json({ message: res.__("welcomeMessage") });
    //res.json({ message: messages.welcomeMessage }); // sending json without internationalisation
  }
  req.session.err = null;
};

exports.postCheck = async (req, res, next) => {
  // req.check("email", messages.invalidEmail).isEmail();
  // req.check("password", messages.passNotMatch).equals(req.body.confirmPassword);
  // req.check("password", messages.passLength).isLength({ min: 8 });
  // req.check("confirmPassword", messages.passLength).isLength({ min: 8 });

  req.check("email", res.__("invalidEmail")).isEmail();
  req.check("password", res.__("passNotMatch")).equals(req.body.confirmPassword);
  req.check("password", res.__("passLength")).isLength({ min: 8 });
  req.check("confirmPassword", res.__("passLength")).isLength({ min: 8 });

  let err = req.validationErrors();
  if (err) {
    req.session.err = err;
    res.redirect("/validate");
  } else {
    let sql = "select * from user where ?";
    let query = { email: req.body.email };
    let user = await db.query(sql, query, (err, resl) => {
      if (resl.length !== 0) {
        //res.json({ message: messages.emailExists });
        //const error = new Error(messages.emailExists);
        const error = new Error(res.__("emailExists"));
        next(error);
      } else {
        const uploadedImage = req.file;
        if (!uploadedImage) {
          const error = new Error(res.__("notImage"));
          error.status = 422;
          next(error);
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              let user = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                imageUrl: uploadedImage.path
              };
              let sql = "Insert into user set ?";
              let query = db.query(sql, user, (err, result) => {
                if (err) throw err;
                req.session.err = null;
                //res.json({ message: messages.formSubmitted });
                transporter.sendMail({

                  // Syntax for sending mail to more than one user
                  // to: ['recipient1@example.org', 'recipient2@example.org'],

                  to: req.body.email,
                  from: 'admin@node-boilerplate.com',
                  fromname: 'Node_Boilerplate',
                  subject: 'Welcome to Node_Boilerplate',
                  html: '<h1> SIGN UP Successful </h1><br><h3> Enjoy using Node Boilerplate </h3>'
                  
                  // Syntax for attaching a attachment to our mail...
                  /*attachments: [
                    {
                      filename: 'hello.txt',
                      path: __dirname + '/hello.txt'
                    }
                  ]*/
                });
                res.json({ message: res.__("formSubmitted") });
              });
            });
          });
        }
      }
    });
  }
};

exports.postLogin = async (req, res, next) => {
  // req.check("email", messages.invalidEmail).isEmail();
  // req.check("password", messages.passLength).isLength({ min: 8 });

  req.check("email", res.__("invalidEmail")).isEmail();
  req.check("password", res.__("passLength")).isLength({ min: 8 });
  let err = req.validationErrors();

  if (err) {
    let array = err.map(errs => {
      return errs.msg;
    });
    //res.status(400).json(err);
    const error = new Error(err[0].msg);
    next(error);
  } else {
    let sql = "select password from user where ?";
    let query = { email: req.body.email };
    let user = await db.query(sql, query, (err, resl) => {
      if (resl.length === 0) {
        // res.json({ message: messages.emailDoesNotExists });
        //const error = new Error(messages.emailDoesNotExists);
        const error = new Error(res.__("emailDoesNotExists"));
        next(error);
      } else {
        bcrypt.compare(req.body.password, resl[0].password, (err, match) => {
          if (!match) {
            // res.json({ message: messages.loginError });
            //const error = new Error(messages.loginError);
            const error = new Error(res.__("loginError"));
            next(error);
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
