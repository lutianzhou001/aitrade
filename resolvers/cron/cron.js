
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

async function closeout(){
  let options = {
      method: "GET",
      uri: apiUri + '/api/swap/v3/instruments/BTC-USD-SWAP/liquidation?status=1&limit=50'
  }
  let rqbody = JSON.parse(await rp(options))
  for (i=0; i< rqbody.length; i++){
  await prisma.prisma.createCloseout({
      exchange: "OKex",
      instrument_id: rqbody[i].instrument_id,
      size: parseInt(rqbody[i].size),
      created_at: rqbody[i].created_at,
      loss: parseFloat(rqbody[i].loss),
      price: parseFloat(rqbody[i].price),
      type: parseInt(rqbody[i].type)
    })
  }
}

async function distribution(){
  let downs11 = 0
  let downs9 = 0
  let downs7 = 0
  let downs5 = 0
  let downs3 = 0
  let downs1 = 0
  let ups1 = 0
  let ups3 = 0
  let ups5 = 0
  let ups7 = 0
  let ups9 = 0
  let ups11 = 0
  let options = {
      method : "GET",
      uri : "https://dncapi.bqiapp.com/api/coin/web-coinrank?page=1&type=-1&pagesize=200&webp=1"
  }
  let rqbody = JSON.parse(await rp(options))
  for ( i=0; i<rqbody.data.length; i++){
    if (rqbody.data[i].change_percent <= - 10){
         downs11 = downs11 + 1
    } else if (rqbody.data[i].change_percent > - 10 && rqbody.data[i].change_percent <= -8){
         downs9 = downs9 + 1
    } else if (rqbody.data[i].change_percent > -8 && rqbody.data[i].change_percent <= -6){
         downs7 = downs7 + 1
    } else if (rqbody.data[i].change_percent > - 6 && rqbody.data[i].change_percent <= -4){
         downs5 = downs5 + 1
    } else if (rqbody.data[i].change_percent > - 4 && rqbody.data[i].change_percent <= -2){
         downs3 = downs3 + 1
    } else if (rqbody.data[i].change_percent > - 2 && rqbody.data[i].change_percent <= 0){
         downs1 = downs1 + 1
    } else if (rqbody.data[i].change_percent > 0 && rqbody.data[i].change_percent <= 2){
         ups1 = ups1 + 1
    } else if (rqbody.data[i].change_percent > 2 && rqbody.data[i].change_percent <= 4){
         ups3 = ups3 + 1
    } else if (rqbody.data[i].change_percent > 4 && rqbody.data[i].change_percent <= 6){
         ups5 = ups5 + 1
    } else if (rqbody.data[i].change_percent > 6 && rqbody.data[i].change_percent <= 8){
         ups7 = ups7 + 1
    } else if (rqbody.data[i].change_percent > 8 && rqbody.data[i].change_percent <= 10){
         ups9 = ups9 + 1
    } else if (rqbody.data[i].change_percent > 10){
         ups11 = ups11 + 1
    }
  }
    let insertCreatedowns11 = await prisma.prisma.createDistribution({
		arrange: -11,
		count: downs11
    })
    let insertCreatedowns9 = await prisma.prisma.createDistribution({
		arrange: -9,
		count: downs9
    })
    let insertCreatedowns7 = await prisma.prisma.createDistribution({
		arrange: -7,
		count: downs7
    })
    let insertCreatedowns5 = await prisma.prisma.createDistribution({
		arrange: -5,
		count: downs5
    })
    let insertCreatedowns3 = await prisma.prisma.createDistribution({
		arrange: -3,
		count: downs3
    })
    let insertCreatedowns1 = await prisma.prisma.createDistribution({
		arrange: -1,
		count: downs1
    })
    let insertCreateups1 = await prisma.prisma.createDistribution({
		arrange: 1,
		count: ups1
    })
    let insertCreateups3 = await prisma.prisma.createDistribution({
		arrange: 3,
		count: ups3
    })
    let insertCreateups5 = await prisma.prisma.createDistribution({
		arrange: 5,
		count: ups5
    })
    let insertCreateups7 = await prisma.prisma.createDistribution({
		arrange: 7,
		count: ups7
    })
    let insertCreateups9 = await prisma.prisma.createDistribution({
		arrange: 9,
		count: ups9
    })
    let insertCreateups11 = await prisma.prisma.createDistribution({
		arrange: 11,
		count: ups11
    })
}
prices()
usdtMessage()
closeout()
distribution()

module.exports = { prices }






