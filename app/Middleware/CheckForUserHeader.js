
module.exports = function checkForUserHeader(user, request, response, cb) {

    if(request.headers().authorization == user.id) {
        cb()
    } else {
        response.status(403).send("Are you lost little buddy? This are not your stuff...")
    }
};