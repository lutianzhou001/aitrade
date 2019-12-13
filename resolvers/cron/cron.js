
// 新增
// 获取BTC ETH的实时价格
//https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker
// 获取爆仓的数据
const rp = require('request-promise');
const apiUri = 'https://www.okex.com';
const sr = require('sync-request')

//类似go一样获取context之类的数据
//https://www.npmjs.com/package/node-context


async function prices() {
    let options = {
        method: "GET",
        uri: apiUri + '/api/spot/v3/instruments/BTC-USDT/ticker' 
    }
    let rqbody = await rp(options)
    rqbody.last =     
}

console.log("aaa")
prices()

module.exports = { prices }






