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
                let body2 = await rp( apiUri+'/api/account/v3/wallet', {url:apiUri+'/api/account/v3/wallet', method: 'GET', headers: requestHeader});
                let CNYRate = await ctx.prisma.rate({
                    key:"USDT-CNY"
                });
                let respJson = JSON.parse(body2);
                respJson.forEach(function (i, v) {
                    let instrument = v.currency+'-USDT';
                    let rate = '';
                    rate = ctx.prisma.rate({
                        key: instrument
                    });
                    if (!rate) {
                        let body3 = rp( apiUri+'/api/index/v3/'+ instrument +'/constituents');
                        let body3Json = JSON.parse(body3);
                        rate = body3Json.data.constituents[0].usd_price;
                        ctx.prisma.createrate({
                            key: instrument,
                            value: rate
                        });
                    }
                    respJson[i].price = v.available*rate*CNYRate
                });

                return {
                    isSuccess: true,
                    errMessage: null,
                    assetses: respJson
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
