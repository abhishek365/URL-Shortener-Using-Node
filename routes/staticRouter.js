const express = require("express");
const Url = require("../models/url");
const shortid = require("shortid");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo(['admin']), async (req, res) => {
  const allUrls = await Url.find({});
  return res.render("home", {
    urls: allUrls
  });
});

router.get("/", restrictTo(['custom', 'admin']), async (req, res) => {
  const allUrls = await Url.find({
    createBy: req.user._id
  });
  return res.render("home", {
    urls: allUrls
  });
});

router.get("/signup", async (req, res) => {
  if (req.user) {
    return res.redirect('/')
  }
  return res.render("signup")
});

router.get("/login", async (req, res) => {
  if (req.user) {
    return res.redirect('/')
  }
  return res.render("login")
});

module.exports = router;
