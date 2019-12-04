const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const { getUserId, getOpenId } = require('../../utils/utils')
const auth = {
  async login(parent, args, ctx, info) {
    console.log(args)
    if (args.sms == "123456") {
      const users = await ctx.prisma.users({ where: { phoneNumber: args.phoneNumber } })
      if (users.length == 0) {
        //cannot find the user we will new one
        const createUser = await ctx.prisma.createUser({
          phoneNumber: args.phoneNumber,
          nickName: "用户" + args.phoneNumber,
          introduction: "期待你写点什么哦"
        })
        if (createUser) {
          const users = await ctx.prisma.users({ where: { phoneNumber: args.phoneNumber } })
          if (users) {
            return {
              isSuccess: true,
              errMessage: null,
              token: jwt.sign({ userId: users[0].id }, 'jwtsecret123')
            }
          }
        }
      } else {
        return {
          isSuccess: true,
          errMessage: null,
          token: jwt.sign({ userId: users[0].id }, 'jwtsecret123')
        }
      }
    } else {
      console.log("invalid sms")
      return {
        isSuccess: false,
        errMessage: "Invalid sms"
      }
    }
  }
}

module.exports = { auth }
