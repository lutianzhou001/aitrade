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
    },

    async changeSubscribeCost(parent, args, ctx, info) {
        try {
            //第一步要解token
            const userId = getUserId(ctx);
            const users = await ctx.prisma.users({ where: { id: userId } });
            if (!users) {
                throw new Error("cannot find this user")
            } else {
                const changenickName = await ctx.prisma.updateUser({
                    data: {
                        subscribeCost: args.cost
                    },
                    where: {
                        id: userId
                    }
                });
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

    async changeSetting(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            let updateData = {};
            if (args.assetsSetting) {
                updateData.assetsSetting = args.assetsSetting
            }
            if (args.positionSetting) {
                updateData.positionSetting = args.positionSetting
            }
            if (args.actionSetting) {
                updateData.actionSetting = args.actionSetting
            }
            let setting = await ctx.prisma.updateUser({
                where:{
                    id:userId
                },
                data:{
                    setting:{
                        update:updateData
                    }
                }});
            if (setting) {
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

module.exports = { profile };
