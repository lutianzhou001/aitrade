const { getUserId } = require('../../utills/utils');
const apiUri = 'https://www.okex.com';
const rp = require('request-promise');
const crypto = require('crypto');

const bigdata = {

    async getBattle (parent,args,ctx,info) {
        const battles = await ctx.prisma.battles({
            last: 1
        })
        var res = {}
        console.log(battles)
        if (battles){
            res['longOKex'] = battles[0].longOKex
            res['shortOKex'] = battles[0].shortOKex
            res['longHuobi'] = battles[0].longHuobi
            res['shortHuobi'] = battles[0].shortHuobi
            res['longBitMex'] = battles[0].longBitMex
            res['shortBitMex'] = battles[0].shortBitMex
        }
        return res
    },
    
    // ok
    async getMycoin (parent, args, ctx, info) {
        const myCoins = await ctx.prisma.mycoins({
	    last: 2
	})
        var res = []
        if (myCoins) {
            for (i=0; i<myCoins.length; i++) {
                var obj = {}
                obj['coin_name'] = myCoins[i].coin_name
                obj['coin_price'] = myCoins[i].coin_price
                res.push(obj)
            }
        }
        return res
    },

    async getOnchainexchange (parent, args, ctx, info) {
        const onChainexchanges = await ctx.prisma.onchainExchanges({
            last: 1
        })
        var res = {}
        if (onChainexchanges) {
           res['btc'] = onChainexchanges[0].btc
           res['eth'] = onChainexchanges[0].eth
           res['usdt'] = onChainexchanges[0].usdt
        }
        return res
    },

    async getBtcplaceorder (parent, args, ctx, info) {
        const btcplaceorders = await ctx.prisma.btcPlaceOrders({
            last: 1
        })
        var res = {}
        if (btcplaceorders) {
            res['long'] = btcplaceorders[0].long
            res['longDeal'] = btcplaceorders[0].longDeal
            res['longDealAmount'] = btcplaceorders[0].longDealAmount
            res['short'] = btcplaceorders[0].short
            res['shortDeal'] = btcplaceorders[0].shortDeal
            res['shortDealAmount'] = btcplaceorders[0].shortDealAmount
        } 
        return res
    },

    async getDistribution (parent, args, ctx, info) {
        const distributions = await ctx.prisma.distributions({
	    last: 12
	})
        var res = {}
        var arrange = []
        var ups = 0 
        var downs = 0
        console.log(distributions)
        if (distributions) {
            for ( i=0; i< distributions.length; i++){
                var obj = {}
                obj['arrange'] = distributions[i].arrange
                obj['count'] = distributions[i].count
                if (distributions[i].arrange < 0){
                    ups = ups + obj['count']
                } else {
                    downs = downs + obj['count']
                }
                arrange.push(obj)
            }
            res['arrangeData'] = arrange
            res['ups'] = ups
            res['downs'] = downs
        }
        console.log(res)
        return res
    },

    async getUsdtMessage (parent, args, ctx, info) {
        const usdtMessage = await ctx.prisma.usdtMessages({
		last: 1
	})
        var res = {}
	if (usdtMessage) {
            res['price'] = usdtMessage[0].price
            res['exchangeRate'] = usdtMessage[0].exchangeRate
            res['premium'] = (res['exchangeRate'] / res['price'] * 100).toFixed(2)
        }
        return res
    },

    async getCloseoutSummary (parent, args, ctx, info) {
        const closeoutSummaries = await ctx.prisma.closeout({

        })
        console.log(closeoutSummaries[0])
    }
}

module.exports = { bigdata }
