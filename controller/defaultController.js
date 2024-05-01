module.exports = {
    index: ((req, res) => {
        res.render("default/index");
    }),
    login : ((req, res) => {
       res.render("default/login");
    }),
    loginPost : ((req, res) => {
        res.send("login success");
    }),
    registerGet : ((req, res) => {
        res.render("default/register");
    }),
    registerPost : ((req, res) => {
        res.send("register success");
    }),
}