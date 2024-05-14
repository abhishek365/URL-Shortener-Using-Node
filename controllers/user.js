const User = require("../models/user");
const Session = require("../service/session");

const session = new Session();

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  return res.render("home");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });

  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
  const token = session.setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
};

module.exports = {
  signup,
  login,
};
