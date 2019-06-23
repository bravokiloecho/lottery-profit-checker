/*
*
Get the prize money values for the draw
*
*/

const curl = require('curlrequest')
const cheerio = require('cheerio')

// Gets the markup for the results page
function downloadResultsPage(drawNumber) {
	const url = `https://www.national-lottery.co.uk/results/lotto/draw-history/prize-breakdown/${drawNumber}`
	const options = {
		url,
	}

	return new Promise((resolve, reject) => {
		curl.request(options, (err, html) => {
			if (err) {
				reject(err)
				return
			}
			resolve(html)
		})
	})
}

function convertPrizeToFloat(string) {
	string = string.split('£')[1]
	string = string.replace(/,/g, '')
	string = parseFloat(string)
	return string
}

function getTotalJackpot($) {
	const jackpot = $('#game_header_intro').text()
	const jackpotFloat = convertPrizeToFloat(jackpot)
	return jackpotFloat
}

function getSharedJackpot($) {
	const prize = $('#prize_per_player_0')
		.children()
		.first()
		.text()
	const prizeFloat = convertPrizeToFloat(prize)

	const totalWinners = parseInt($('#winners_count_0').text(), 10)

	return {
		sharedJackpot: prizeFloat,
		totalWinners,
	}
}

// EXPORT
const GetPrizes = async (drawNumber) => {
	const resultsHtml = await downloadResultsPage(drawNumber)
	const $ = cheerio.load(resultsHtml)

	const jackpot = getTotalJackpot($)
	const { sharedJackpot, totalWinners } = getSharedJackpot($)
	// Calc adjust jackpot...
	// If there is a shared jackpot, recalc with extra winner
	// Else return the original jackpot
	const adjustedJackpot = sharedJackpot ? (jackpot / (totalWinners + 1)) : jackpot

	return {
		6: adjustedJackpot,
		'5+Bonus': 1000000,
		5: 1750,
		4: 140,
		3: 30,
		2: 'freeTicket',
		1: 0,
		0: 0,
	}
}

module.exports = GetPrizes
