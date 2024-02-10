var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tickets', function(req, res, next) {
  const slots = ['01', '02', '03', '04','05'];

  res.render('tickets', { slots });
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

// Handle the POST request for /tokens
// Handle the POST request for /tokens
// Handle the POST request for /tokens
// Handle the POST request for /tokens
router.post('/tokens', (req, res) => {
  const selectedNumbers = req.body.selectedNumbers.split('');

  // Shuffle each digit individually
  const shuffledDigits = selectedNumbers.sort(() => Math.random() - 0.5);

  // Concatenate shuffled digits to form the random number
  const randomToken = shuffledDigits.join('');

  // Remove commas from the token
  const randomTokenWithoutCommas = randomToken.replace(/,/g, '');

  // Render the tokens page with the random number
  res.render('tockens', { randomTokenWithoutCommas });
});





module.exports = router;
