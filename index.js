const GetResults = require('./GetResults')
const GetPrizes = require('./GetPrizes')
const TestTickets = require('./TestTickets')

async function CheckProfit() {
	// Get the results from the draw
	const results = await GetResults().catch((err) => {
		// If error...
		console.log(err)
	})

	console.log(results)

	// Get the prize money values
	const { drawNumber } = results
	const prizes = await GetPrizes(drawNumber).catch((err) => {
		// If error...
		console.log(err)
	})

	console.log('prizes', prizes)

	// Test the tickets
	const profit = TestTickets(results, prizes)

	console.log('profit', profit)
}

CheckProfit()
