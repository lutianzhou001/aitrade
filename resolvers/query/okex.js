const { getUserId } = require('../../utills/utils');
const apiUri = 'https://www.okex.com';
const rp = require('request-promise');
const crypto = require('crypto');

const okex = {
    async getWalletInfo(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            const user = await ctx.prisma.user({
                id: userId
            });
            if ( (!user.apiKey) || (!user.apiSecret) || (!user.passPhrase) ) {
                return {
                    isSuccess: false,
                    errMessage: '用户OKEX信息不完整',
                    assetses: null
                }
            } else {
                console.log('ready to request okex');
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
                const body2 = await rp( apiUri+'/api/account/v3/wallet', {url:apiUri+'/api/account/v3/wallet', method: 'GET', headers: requestHeader})
                console.log("body2")
                console.log(body2)
                return {
                    isSuccess: true,
                    errMessage: null,
                    assetses: JSON.parse(body2)
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage
            }
        }
    }
};

module.exports = { okex };
