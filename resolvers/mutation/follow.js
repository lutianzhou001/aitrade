const { getUserId } = require('../../utills/utils')

const follow = {
    async attentionTo(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const attentionTo = await ctx.prisma.createFollow({
                leader: args.UID,
                follower: userId
            });
            if (attentionTo) {
                return {
                    isSuccess: true,
                    errMessage: null
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
module.exports = { follow };