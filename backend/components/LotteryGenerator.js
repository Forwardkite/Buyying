const randomatic = require('randomatic');

//_________Generate a random alphanumeric token of length 6________//

function LotteryGenerator() {
    const lottery = randomatic('A0', 6);
    console.log('Random token:', lottery);
    return lottery
}

module.exports = LotteryGenerator

// const randomatic = require('randomatic');

// // Generate a random alphanumeric token of length 6
// function LotteryGenerator() {
//     return randomatic('A0', 6);
// }

// module.exports = LotteryGenerator;
