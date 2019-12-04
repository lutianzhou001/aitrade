const jwt = require('jsonwebtoken')


function getUserId(ctx) {
    const Authorization = ctx.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, 'jwtsecret123')
        return userId
    }
}

module.exports = {
    getUserId
}



