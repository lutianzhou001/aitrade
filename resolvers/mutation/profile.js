const { getUserId } = require('../../utills/utils');

const profile = {
    async changenickName(parent, args, ctx, info) {
        try {
            //第一步要解token
            const userId = getUserId(ctx);
            const users = await ctx.prisma.users({ where: { id: userId } });
            if (!users) {
                throw new Error("cannot find this user")
            } else {
                const changenickName = await ctx.prisma.updateUser({
                    data: {
                        nickName: args.nickName
                    },
                    where: {
                        id: userId
                    }
                })
                if (changenickName) {
                    return {
                        isSuccess: true,
                        errMessage: null
                    }
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage
            }
        }

    },

    async changeIntroduction(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            const users = await ctx.prisma.users({ where: { id: userId } })
            if (!users) {
                throw new Error("cannot find this user")
            } else {
                const changeIntroduction = await ctx.prisma.updateUser({
                    data: {
                        introduction: args.introduction
                    },
                    where: {
                        id: userId
                    }
                })
                if (changeIntroduction) {
                    return {
                        isSuccess: true,
                        errMessage: null
                    }
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.message
            }
        }
    },

    async changeOKEXInfo(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            const users = await ctx.prisma.users({ where: { id: userId } })
            if (!users) {
                throw new Error("cannot find this user")
            } else {
                let updateData = {};
                if (args.apiKey) {
                    updateData.apiKey = args.apiKey
                }
                if (args.apiSecret) {
                    updateData.apiSecret = args.apiSecret
                }
                if (args.passPhrase) {
                    updateData.passPhrase = args.passPhrase
                }
                const changeIntroduction = await ctx.prisma.updateUser({
                    data: updateData,
                    where: {
                        id: userId
                    }
                });
                if (changeIntroduction) {
                    return {
                        isSuccess: true,
                        errMessage: null
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

module.exports = { profile };
