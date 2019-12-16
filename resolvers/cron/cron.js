
// 新增
// 获取BTC ETH的实时价格
//https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker
// 获取爆仓的数据
const rp = require('request-promise');
const apiUri = 'https://www.okex.com';
const sr = require('sync-request')
const prisma = require('../../aitrade-datamodel/aitrade/src/generated/prisma-client')
const unirest = require("unirest");

//类似go一样获取context之类的数据
//https://www.npmjs.com/package/node-context


async function prices() {
    let optionsBTC = {
        method: "GET",
        uri: apiUri + '/api/spot/v3/instruments/BTC-USDT/ticker' 
    }
    let rqbodyBTC = await rp(optionsBTC)
    let createMycoinBTC = await prisma.prisma.createMycoin({
	coin_name: "BTC",
	coin_price: parseFloat(JSON.parse(rqbodyBTC).last)
    })   
    
    let optionsETH = {
        method: "GET",
        uri: apiUri + '/api/spot/v3/instruments/ETH-USDT/ticker' 
    }
    let rqbodyETH = await rp(optionsETH)
    let createMycoinETH = await prisma.prisma.createMycoin({
	coin_name: "ETH",
	coin_price: parseFloat(JSON.parse(rqbodyETH).last)
    })   
}

async function usdtMessage(){
   let req = unirest("GET", "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-cross-currencies");
   req.query({
	"id": "cny%2Cusd"
   });
   req.headers({
	"x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
	"x-rapidapi-key": "ae2ad23146msh06a431323e86027p11a924jsn731ce3762748"
   });
   req.end(async function (res) {
       if (res.error) throw new Error(res.error);
       let rate  = res.body.result['usdcny:cur']['last']
       let options = {
           method: "GET",
           uri: apiUri + '/api/swap/v3/rate'
       }
       let rqbody = await rp(options)
       let createUsdtMessage = await prisma.prisma.createUsdtMessage({
       price: parseFloat(JSON.parse(rqbody).rate),
       exchangeRate: parseFloat(rate)
   })
   });
}



prices()
usdtMessage()

module.exports = { prices }






