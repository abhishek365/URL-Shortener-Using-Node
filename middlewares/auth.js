const Session = require("../service/session");

const session = new Session();

const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }
    const user = session.getUser(tokenCookie);

    console.log(user);
    req.user = user?._doc;
    return next();
}

const restrictTo = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login');
        }

        if (!roles.includes(req.user.role)) {
            return res.end("Not Authorised!")
        }
        return next();
    }
}

module.exports = { checkForAuthentication, restrictTo };
