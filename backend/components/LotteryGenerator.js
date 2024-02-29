const randomatic = require('randomatic');

function LotteryGenerator() {
    const lottery = randomatic('A', 5);
    console.log('Random token:', lottery);
    return lottery
}

module.exports = LotteryGenerator
