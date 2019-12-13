const {getUserId} = require('../../utills/utils');

const users = {
    async me(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            const me = await ctx.prisma.user({
                id: userId
            });
            if (me) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    user: me
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                user: null
            }
        }
    },

    async getUser(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const user = await ctx.prisma.user({
                id: args.UID
            });
            let follow = await ctx.prisma.follows({
                where: {
                    follower: userId,
                    leader: args.UID
                }
            });
            user.followed = follow.length > 0;
            let subscribe = await ctx.prisma.subscribes({
                where: {
                    follower: userId,
                    leader: args.UID
                }
            });
            user.subscribed = subscribe.length > 0;
            if (user) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    user: user
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                user: null
            }
        }
    },

    async getUsers(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const users = await ctx.prisma.users({
                where: {
                    id_not: userId
                },
                orderBy: "createdAt_DESC",
                skip: args.skip,
                first: args.first
            });
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    let subscribe = await ctx.prisma.subscribes({
                        where: {
                            follower: userId,
                            leader: users[i].id
                        }
                    });
                    users[i].subscribed = subscribe.length > 0;
                }
                return {
                    isSuccess: true,
                    errMessage: null,
                    users: users
                }
            }
        } catch (err) {
            return {
                isSuccess: true,
                errMessage: null,
                users: null
            }
        }
    },

    async getFollowers(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const followers = await ctx.prisma.follows({
                where: {
                    leader: userId
                },
                skip: args.skip,
                first: args.first
            });
            const idArr = new Array(followers.length);
            for (let i = 0; i < idArr.length; i++) {
                idArr[i] = followers[i].follower
            }
            const followUsers = await ctx.prisma.users({
                where: {
                    id_in: idArr
                }
            });

            if (followUsers) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    users: followUsers
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                users: null
            }
        }
    },

    async getAttentions(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const attentions = await ctx.prisma.follows({
                where: {
                    follower: userId
                },
                skip: args.skip,
                first: args.first
            });
            const idArr = new Array(attentions.length);
            for (let i = 0; i < idArr.length; i++) {
                idArr[i] = attentions[i].leader
            }
            const attentionUsers = await ctx.prisma.users({
                where: {
                    id_in: idArr
                }
            });

            if (attentionUsers) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    users: attentionUsers
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                users: null
            }
        }
    },

    async getSubscribes(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const subscribes = await ctx.prisma.subscribes({
                where: {
                    follower: userId
                },
                skip: args.skip,
                first: args.first
            });
            const idArr = new Array(subscribes.length);
            for (let i = 0; i < idArr.length; i++) {
                idArr[i] = subscribes[i].leader
            }
            const subscribeUsers = await ctx.prisma.users({
                where: {
                    id_in: idArr
                }
            });

            if (subscribeUsers) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    users: subscribeUsers
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                users: null
            }
        }
    },


    async getMoments(parent, args, ctx, info) {
        try {
            const momentsWhereInput = {};
            if (args.UID) {
                momentsWhereInput.user = {id: args.UID}
            }
            const moments = await ctx.prisma.moments({
                where: momentsWhereInput,
                skip: args.skip,
                first: args.first
            });
            if (moments) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    moments: moments
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                moment: null
            }
        }
    },

    async getCount(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            let attentionCount = ctx.prisma.followsConnection({
                where: {
                    follower: userId
                }
            }).aggregate().count();
            let followerCount = ctx.prisma.followsConnection({
                where: {
                    leader: userId
                }
            }).aggregate().count();
            let subscribeCount = ctx.prisma.subscribesConnection({
                where: {
                    follower: userId
                }
            }).aggregate().count();
            return {
                isSuccess: true,
                errMessage: null,
                subscribeCount: subscribeCount,
                followerCount: followerCount,
                attentionCount: attentionCount
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage
            }
        }
    },

    async getSetting(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            let setting = await ctx.prisma.user({id:userId}).setting();
            if (setting) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    assetsSetting: setting.assetsSetting,
                    positionSetting: setting.positionSetting,
                    actionSetting: setting.actionSetting
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage
            }
        }
    },

    async getWallet(parent, args, ctx, info) {
        try {
            const str = getUserId(ctx);
            if (!str) {
                throw new Error("验证令牌已过期")
            }
            let balance = 0;
            for (let i = 0; i < str.length; i++) {
                balance = balance + str.charCodeAt(i) + Math.pow(str.charCodeAt(i)%4, 6)
            }
            let balanceStr = balance.toString();
            let result = balanceStr.split("").reverse().join("");
            return {
                isSuccess: true,
                errMessage: null,
                balance:result,
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                balance:null,
            }
        }
    }

};
module.exports = {users};