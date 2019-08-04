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

const dataFile = `${__dirname}/db/data.json`

const CheckProfit = async () => {
	// Get previous state
	const previousSummary = await ReadData(dataFile)
	console.log('previousSummary', previousSummary)
	// Get the results from the draw
	const results = await GetResults().catch((err) => {
		// If error...
		console.error(err)
	})
	console.log('results', results)
	// Get the prize money values
	const { drawNumber } = results
	const prizes = await GetPrizes(drawNumber).catch((err) => {
		// If error...
		console.error(err)
	})
	// Test the tickets
	const outcome = TestTickets(results, prizes, previousSummary)
	console.log('outcome', outcome)
	// Save new results and get summary
	const summary = SaveResults(dataFile, previousSummary, outcome)
	console.log('summary', summary)
	// Format data
	const formattedData = FormatData(results, outcome, summary)
	console.log('formattedData', formattedData)
	// Build tweets
	const tweets = BuildTweet(formattedData)
	console.log('tweets', tweets)
	// Post tweet
	await PostTweets(tweets)
	console.log('Tweest potsed')
}

CheckProfit()
StartCron(CheckProfit)
