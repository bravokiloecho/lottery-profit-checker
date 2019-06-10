const GetResults = require('./GetResults')

async function CheckProfit() {
  const results = await GetResults().catch((err) => {
    // If error...
    console.log(err)
  })
  
  console.log(results);
}

CheckProfit();