require('dotenv').config()

const ReadData = require('./tasks/ReadData')
const GetResults = require('./tasks/GetResults')
const GetPrizes = require('./tasks/GetPrizes')
const TestTickets = require('./tasks/TestTickets')
const SaveResults = require('./tasks/SaveResults')
const FormatData = require('./tasks/FormatData')
const BuildTweet = require('./tasks/BuildTweet')
const PostTweets = require('./tasks/PostTweets')
const StartCron = require('./tasks/StartCron')

const dataFile = './db/data.json'

async function CheckProfit() {
	// Get previous state
	const previousSummary = await ReadData(dataFile)
	// Get the results from the draw
	const results = await GetResults().catch((err) => {
		// If error...
		console.error(err)
	})
	// Get the prize money values
	const { drawNumber } = results
	const prizes = await GetPrizes(drawNumber).catch((err) => {
		// If error...
		console.error(err)
	})
	// Test the tickets
	const outcome = TestTickets(results, prizes, previousSummary)
	// Save new results and get summary
	const summary = await SaveResults(dataFile, previousSummary, outcome)
	// Format data
	const formattedData = FormatData(results, outcome, summary)
	// Build tweets
	const tweets = BuildTweet(formattedData)
	// Post tweet
	await PostTweets(tweets)
}

// CheckProfit()
StartCron(CheckProfit)
