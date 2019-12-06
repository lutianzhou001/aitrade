const jwt = require('jsonwebtoken');
const apiUri = 'https://www.okex.com';
const request = require('request');
const crypto = require('crypto');


function getUserId(ctx) {
    const Authorization = ctx.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, 'jwtsecret123')
        return userId
    }
}

function getWallet(user) {
    console.log('step into getWallet');
    console.log(user);
    let timestamp = Date.now() / 1000;
    let what = timestamp + 'GET' + '/api/account/v3/wallet';
    let hmac = crypto.createHmac('sha256', user.apiSecret);
    let signature = hmac.update(what).digest('base64');
    let requestHeader = {
        'OK-ACCESS-KEY': user.apiKey,
        'OK-ACCESS-SIGN': signature,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': user.passPhrase
    };
    console.log(requestHeader);
    request(apiUri+'/api/account/v3/wallet', {url:apiUri+'/api/account/v3/wallet', method: 'GET', headers: requestHeader}, function (error, response, body) {
        console.log('okex response:');
        console.log(error);
        console.log(response);
        console.log(body);
        if (error) {
            return {
                error: error,
                data: null
            }
        }
        if (response.statusCode == 200) {
            return {
                error: null,
                data: body
            }
        }
    })
}

module.exports = {
    getUserId,
    getWallet
};



