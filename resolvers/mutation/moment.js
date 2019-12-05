const { getUserId } = require('../../utills/utils')

const moment = {
    async createMoment(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const moment = await ctx.prisma.createMoment({
                user: {
                    connect: {
                        id: userId
                    }
                },
                title: args.title,
                content: args.content
            });
            if (moment) {
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
module.exports = { moment };