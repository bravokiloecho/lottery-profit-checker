require('dotenv').config()

const ReadData = require('./ReadData')
const GetResults = require('./GetResults')
const GetPrizes = require('./GetPrizes')
const TestTickets = require('./TestTickets')
const SaveResults = require('./SaveResults')
const FormatData = require('./FormatData')
const BuildTweet = require('./BuildTweet')
const PostTweets = require('./PostTweets')
const StartCron = require('./StartCron')

const dataFile = './db/data.json'

async function CheckProfit() {
	// Get previous state
	const previousSummary = await ReadData(dataFile)
	// Get the results from the draw
	const results = await GetResults().catch((err) => {
		// If error...
		console.error(err)
	})
	console.log('results', results);
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
	console.log('formattedData', formattedData)
	// BUILD TWEETS
	const tweets = BuildTweet(formattedData)
	// POST TWEET
	await PostTweets(tweets)
}

// CheckProfit()
StartCron(CheckProfit)
