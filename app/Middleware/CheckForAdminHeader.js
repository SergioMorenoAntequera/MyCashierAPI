
module.exports = function checkForAdminHeader(request, response, cb) {
    if(request.header("ADMIN_PASS") == process.env.ADMIN_PASS) {
        cb()
    } else {
        response.status(403).send("You are not welcomed here...")
    }
};