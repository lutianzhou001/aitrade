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
        const myCoins = await ctx.prisma.Mycoins({
            last: 1
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
        const Btcplaceorders = await ctx.prisma.btcPlaceOrders({
            last: 1
        })
        var res = {}
        if (Btcplaceorders) {
            res['long'] = Btcplaceorders[0].long
            res['longDeal'] = Btcplaceorders[0].longDeal
            res['longDealAmount'] = Btcplaceorders[0].longDealAmount
            res['short'] = Btcplaceorders[0].short
            res['shortDeal'] = Btcplaceorders[0].shortDeal
            res['shortDealAmount'] = Btcplaceorders[0].shortDealAmount
        } 
        return res
    },

    async getDistribution (parent, args, ctx, info) {
        const Distributions = await ctx.prisma.distributions()
        var res = []
        if (Distributions) {
            for ( i=0; i<Distributions.length; i++){
                var obj = {}
                obj['arrange'] = Distributions[i].arrange
                obj['count'] = Distributions[i].count
                res.push(obj)
            }
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
