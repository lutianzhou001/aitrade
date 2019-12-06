const { getWallet } = require('../../utills/utils');
const { getUserId } = require('../../utills/utils');

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
                let res = getWallet(user);
                console.log(res);
                if (res.error) {
                    return {
                        isSuccess: false,
                        errMessage: res.error,
                        assetses: null
                    }
                } else {
                    return {
                        isSuccess: true,
                        errMessage: null,
                        assetses: res.data
                    }
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
