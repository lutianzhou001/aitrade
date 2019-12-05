const { getUserId } = require('../../utills/utils');

const users = {
    async me(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            console.log("handle request me");
            console.log(userId);
            const me = await ctx.prisma.user({
                id: userId
            });
            if (me) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    user:me
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                user:null
            }
        }
    },

    async getUser(parent, args, ctx, info) {
        try {
            const user = await ctx.prisma.user({
                id: args.UID
            });
            if (user) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    user:user
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                user:null
            }
        }
    },

    async getUsers(parent, args, ctx, info) {
        try {
            const users = ctx.prisma.users({
                orderBy: "createdAt_DESC",
                skip: args.skip,
                first: args.first
            });
            if (users) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    users:users
                }
            }
        } catch (err) {
            return {
                isSuccess: true,
                errMessage: null,
                users:null
            }
        }
    },

    async getFollowers(parent, args, ctx, info) {
        try {
            const userId = getUserId(ctx);
            if (!userId) {
                throw new Error("验证令牌已过期")
            }
            const followers = await ctx.prisma.follows( {
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
            const followUsers = await ctx.prisma.users( {
                where: {
                    id_in: idArr
                }
            });

            if (followUsers) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    users:followUsers
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
            const attentions = await ctx.prisma.follows( {
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
            const attentionUsers = await ctx.prisma.users( {
                where: {
                    id_in: idArr
                }
            });

            if (attentionUsers) {
                return {
                    isSuccess: true,
                    errMessage: null,
                    users:attentionUsers
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
                    isSuccess:true,
                    errMessage:null,
                    moments:moments
                }
            }
        } catch (err) {
            return {
                isSuccess: false,
                errMessage: err.errMessage,
                moment: null
            }
        }
    }

};
module.exports = { users };