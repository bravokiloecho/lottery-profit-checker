const GetResults = require('./GetResults')
const GetPrizes = require('./GetPrizes')
const TestTickets = require('./TestTickets')

async function CheckProfit() {
	// Get the results from the draw
	const results = await GetResults().catch((err) => {
		// If error...
		console.log(err)
	})

	console.log('draw results', results)

	// Get the prize money values
	const { drawNumber } = results
	const prizes = await GetPrizes(drawNumber).catch((err) => {
		// If error...
		console.log(err)
	})

	console.log('prize breakdown', prizes)

	// Test the tickets
	const profit = TestTickets(results, prizes)

	console.log('profit/loss', profit)
}

CheckProfit()
