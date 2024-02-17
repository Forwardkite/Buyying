const randomatic = require('randomatic');

function LotteryGenerator() {
    const lottery = randomatic('A0', 6);
    console.log('Random token:', lottery);
    return lottery
}

module.exports = LotteryGenerator
