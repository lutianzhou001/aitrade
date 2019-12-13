const { getUserId } = require('../../utills/utils');
const apiUri = 'https://www.okex.com';
const rp = require('request-promise');
const crypto = require('crypto');

const okex = {
    async getPositionInfo(parent, args, ctx, info) {
        try {
            const userId = args.UID;
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
      /*          respJson.forEach(function (v, i) {
                    let instrument = v.currency+'-USDT';
                    let rate;
                    rate = ctx.prisma.rate({
                        key: instrument
                    });
                    if (!rate) {
                        console.log('ready to get rate')
                        let body3 = rp( apiUri+'/api/index/v3/'+ instrument +'/constituents');
                        let body3Json = JSON.parse(body3);
                        rate = body3Json.data.constituents[0].usd_price;
                        ctx.prisma.createrate({
                            key: instrument,
                            value: rate
                        });
                    }
                    respJson[i].price = rate.value*CNYRate
                    respJson[i].totalprice = v.available*rate.value*CNYRate
                });*/

                return {
                    isSuccess: true,
                    errMessage: null,
                    assetses: respJson
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                assetses:null
            }
        }
    },

    async getLedger(parent, args, ctx, info) {
        try {
            const userId = args.UID;
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
                let what = timestamp + 'GET' + '/api/spot/v3/orders?instrument_id=BTC-USDT&state=2&limit=10';
                if (args.after) {
                    what = what + '&after=' + args.after
                }
                let hmac = crypto.createHmac('sha256', user.apiSecret);
                let signature = hmac.update(what).digest('base64');
                let requestHeader = {
                    'OK-ACCESS-KEY': user.apiKey,
                    'OK-ACCESS-SIGN': signature,
                    'OK-ACCESS-TIMESTAMP': timestamp,
                    'OK-ACCESS-PASSPHRASE': user.passPhrase
                };
                let requestUrl = apiUri+'/api/spot/v3/orders?instrument_id=BTC-USDT&state=2&limit=10';
                if (args.after) {
                    requestUrl = requestUrl + '&after=' + args.after
                }
                console.log(requestUrl)
                console.log(requestHeader)
                let body2 = await rp( requestUrl, {url:requestUrl, method: 'GET', headers: requestHeader});
                let respJson = JSON.parse(body2);
                console.log(respJson);
                return {
                    isSuccess: true,
                    errMessage: null,
                    ledgers: respJson
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                ledgers:null
            }
        }
    },

    async getProperty(parent, args, ctx, info) {
        try {
            return {
                isSuccess:true,
                errMessage:null,
                totalProperty:'10000',
                earnRate:60.00,
                totalEarning:-600,
                winRate:5.00,
                duration:'19',
                weeklyEarning:9000,
                weeklyWinRate:6.00,
                frequency:'6'
            }
        } catch (err) {
            return {
                isSuccess:false,
                errMessage:err.errMessage
            }
        }
    },

    async getContractInfo(parent, args, ctx, info) {
        try {
            const userId = args.UID;
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
                let what = timestamp + 'GET' + '/api/swap/v3/position';
                let hmac = crypto.createHmac('sha256', user.apiSecret);
                let signature = hmac.update(what).digest('base64');
                let requestHeader = {
                    'OK-ACCESS-KEY': user.apiKey,
                    'OK-ACCESS-SIGN': signature,
                    'OK-ACCESS-TIMESTAMP': timestamp,
                    'OK-ACCESS-PASSPHRASE': user.passPhrase
                };
                console.log(requestHeader);
                let requestUrl = apiUri+'/api/swap/v3/position';
                console.log(requestUrl);
                let body2 = await rp( requestUrl, {url:requestUrl, method: 'GET', headers: requestHeader});
                console.log('request finished');
                console.log(body2);
                let respJson = JSON.parse(body2);
                console.log(respJson);
                return {
                    isSuccess: true,
                    errMessage: null,
                    contractInfo: respJson
                }
            }
        } catch (err) {
            return {
                isSuccess:false,
                errMessage:err.errMessage
            }
        }
    }

};

module.exports = { okex };
