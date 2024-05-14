const shortid = require("shortid");
const Url = require("../models/url");

const generateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body || !body.url) {
    return res.status(401).json({ status: false, error: "URL is required" });
  }
  const shortId = shortid();
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createBy: req.user._id,
  });

  return res.render("home", { id: shortId });
};

const getRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
            userIP: req.ip,
          },
        },
      },
      {
        new: true, // Return the updated document
      }
    );

    // Check if entry exists
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Redirect to the redirectUrl
    res.redirect(entry.redirectUrl);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne(
    { shortId },
    { _id: 0, "visitHistory._id": 0 }
  );
  return res.json({
    status: "succes",
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  generateShortUrl,
  getRedirectUrl,
  getAnalytics,
};
