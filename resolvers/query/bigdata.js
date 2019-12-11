const { getUserId } = require('../../utills/utils');
const apiUri = 'https://www.okex.com';
const rp = require('request-promise');
const crypto = require('crypto');
const curl = new (require( 'curl-request' ))();

const bigdata = {
    async getCloseout (parent, args, ctx, info) {
        console.log("begin request")
        curl.setHeaders(['Content-Type : application/x-www-form-urlencoded'].get('www.okex.com/api/swap/v3/instruments/BTC-USD-SWAP/liquidation?status=1&limit=5000').then(({statusCode, body, headers}) => {
            console.log(statusCode, body, headers)
        }).catch((e) => {
            console.log(e);
        }))
    }
}

module.exports = { bigdata }