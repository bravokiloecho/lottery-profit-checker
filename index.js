const ReadData = require('./ReadData')
const GetResults = require('./GetResults')
const GetPrizes = require('./GetPrizes')
const TestTickets = require('./TestTickets')
const SaveResults = require('./SaveResults')
const FormatData = require('./FormatData')

const dataFile = './db/data.json'

async function CheckProfit() {
	// Get previous state
	const previousSummary = await ReadData(dataFile)
	// console.log('previousSummary', previousSummary)

	// Get the results from the draw
	const results = await GetResults().catch((err) => {
		// If error...
		console.log(err)
	})


	// Get the prize money values
	const { drawNumber } = results
	const prizes = await GetPrizes(drawNumber).catch((err) => {
		// If error...
		console.log(err)
	})

	// Test the tickets
	const outcome = TestTickets(results, prizes, previousSummary)
	console.log('profit/loss', outcome)

	// Save new results and get summary
	const summary = await SaveResults(dataFile, previousSummary, outcome)
	console.log('summary', summary)

	// Format data
	const formattedData = FormatData(outcome, summary)
	console.log('formattedData', formattedData)
}

CheckProfit()
