const GetResults = require('./GetResults')
const GetPrizes = require('./GetPrizes')

async function CheckProfit() {
  const results = await GetResults().catch((err) => {
    // If error...
    console.log(err)
  })

  console.log(results);

  const { drawNumber } = results
  const prizes = await GetPrizes(drawNumber).catch((err) => {
    // If error...
    console.log(err)
  })

  console.log(prizes);
}

CheckProfit();