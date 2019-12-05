const { PublicClient } = require('@okfe/okex-node');
const { V3WebsocketClient } = require('@okfe/okex-node');
const { AuthenticatedClient } = require('@okfe/okex-node');
const pClient = new PublicClient();

const wss = new V3WebsocketClient();

const okex = {
    async getOpenInterest(parent, args, ctx, info) {
        try {
            const user = await ctx.prisma.user({
                id: args.UID
            });
            if ( (!user.apiKey) || (!user.apiSecret) || (!user.passPhrase) ) {

            } else {
                const authClient = new AuthenticatedClient(user.apiKey, user.apiSecret, user.passPhrase);

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
