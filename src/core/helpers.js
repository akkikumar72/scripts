const ABI = require('../../config/abi.json');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));

const Helpers = {
    symbolCache: {},
    token0Cache: {},
    token1Cache: {},

    getSymbolCached: async (address) => {
        if (Helpers.symbolCache[address]) return Helpers.symbolCache[address];
        const contract = new web3.eth.Contract(ABI.TOKEN, address);
        return Helpers.symbolCache[address] = await contract.methods.symbol().call();
    },

    getToken0Cached: async (address) => {
        if (Helpers.token0Cache[address]) return Helpers.token0Cache[address];
        const contract = new web3.eth.Contract(ABI.PAIR, address);
        return Helpers.token0Cache[address] = await contract.methods.token0().call();
    },

    getToken1Cached: async (address) => {
        if (Helpers.token1Cache[address]) return Helpers.token1Cache[address];
        const contract = new web3.eth.Contract(ABI.PAIR, address);
        return Helpers.token1Cache[address] = await contract.methods.token1().call();
    },

    toChecksumAddress: (address) => web3.utils.toChecksumAddress(address.toLowerCase()),
};

module.exports = Helpers;
