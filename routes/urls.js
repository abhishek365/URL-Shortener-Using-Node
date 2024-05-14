const express = require("express");
const {
  generateShortUrl,
  getRedirectUrl,
  getAnalytics,
} = require("../controllers/urls");
const Url = require("../models/url");

const router = express.Router();

router.post("/", generateShortUrl);
router.get("/:shortId", getRedirectUrl);
router.get("/analytics/:shortId", getAnalytics);

// router.get("/test", async (req, res) => {
//   const urls = await Url.find({});
//   return res.render("home", {
//     urls: urls,
//   });
// });

module.exports = router;
